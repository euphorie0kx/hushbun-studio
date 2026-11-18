import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,join,extname} from 'node:path';
import {randomBytes,createHash,scrypt as scryptCallback,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import pg from 'pg';
const {Pool}=pg;
const viewSecret=process.env.VIEW_HASH_SECRET||process.env.DATABASE_URL||randomBytes(32).toString('hex');
const scrypt=promisify(scryptCallback);
const root=dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const databaseUrl=process.env.DATABASE_URL;
const pool=databaseUrl?new Pool({connectionString:databaseUrl,ssl:process.env.PGSSL==='require'?{rejectUnauthorized:false}:undefined,max:5}):null;
let databaseReady=false;
if(pool){try{await pool.query(`CREATE TABLE IF NOT EXISTS studio_users (id BIGSERIAL PRIMARY KEY, username VARCHAR(24) UNIQUE NOT NULL, email VARCHAR(254) UNIQUE NOT NULL, passhash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS studio_sessions (token_hash TEXT PRIMARY KEY,user_id BIGINT NOT NULL REFERENCES studio_users(id) ON DELETE CASCADE,expires_at TIMESTAMPTZ NOT NULL);
CREATE TABLE IF NOT EXISTS studio_profiles (user_id BIGINT PRIMARY KEY REFERENCES studio_users(id) ON DELETE CASCADE,data JSONB NOT NULL DEFAULT '{}'::jsonb,updated_at TIMESTAMPTZ DEFAULT NOW(),view_count BIGINT NOT NULL DEFAULT 0);
ALTER TABLE studio_profiles ADD COLUMN IF NOT EXISTS view_count BIGINT NOT NULL DEFAULT 0;
CREATE TABLE IF NOT EXISTS studio_profile_daily_views (user_id BIGINT NOT NULL REFERENCES studio_users(id) ON DELETE CASCADE, day DATE NOT NULL, visitor_hash TEXT NOT NULL, PRIMARY KEY(user_id,day,visitor_hash));
CREATE TABLE IF NOT EXISTS studio_media (user_id BIGINT NOT NULL REFERENCES studio_users(id) ON DELETE CASCADE, media_id VARCHAR(160) NOT NULL, name TEXT NOT NULL, mime TEXT NOT NULL, bytes BYTEA NOT NULL, PRIMARY KEY(user_id,media_id));`);databaseReady=true;}catch(err){console.error('Database initialization failed:',err.message)}}
const json=(res,status,data,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(data))};
const bad=(res,status,message)=>json(res,status,{error:message});
const sha=s=>createHash('sha256').update(s).digest('hex');
function viewFingerprint(req){
 // Une empreinte pseudonyme par navigateur/IP et par jour, sans conserver d'IP en base.
 const forwarded=String(req.headers['x-forwarded-for']||'').split(',')[0].trim();
 const ip=forwarded||req.socket.remoteAddress||'unknown';
 const ua=String(req.headers['user-agent']||'').slice(0,400);
 return sha(viewSecret+'|'+ip+'|'+ua);
}
const isBot=req=>/bot|crawler|spider|preview|facebookexternalhit|discordbot|slackbot|whatsapp|telegrambot|embedly|curl\/|wget\//i.test(req.headers['user-agent']||'');
const validUser=s=>/^[a-z0-9_-]{3,24}$/.test(s);
const reserved=new Set(['api','studio','customize','login','register','assets','admin','settings','me','favicon','index','app','style','euphorie']);
const limits=new Map();function limit(ip){const t=Date.now(),v=limits.get(ip)||{time:t,count:0};if(t-v.time>15*60_000){v.time=t;v.count=0}v.count++;limits.set(ip,v);return v.count<=25}
async function readBody(req,max=2*1024*1024){let n=0,parts=[];for await(const part of req){n+=part.length;if(n>max)throw Object.assign(new Error('Fichier trop volumineux'),{status:413});parts.push(part)}try{return JSON.parse(Buffer.concat(parts).toString('utf8'))}catch{throw Object.assign(new Error('JSON invalide'),{status:400})}}
async function makeHash(password){const salt=randomBytes(16).toString('hex');const key=await scrypt(password,salt,64);return salt+':'+key.toString('hex')}
async function checkHash(password,value){const [salt,hex]=String(value).split(':');if(!salt||!hex)return false;const key=await scrypt(password,salt,64);return timingSafeEqual(key,Buffer.from(hex,'hex'))}
async function session(req){const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('hb_studio_session='))?.split('=')[1];if(!token||!/^[a-f0-9]{64}$/.test(token))return null;const r=await pool.query('SELECT u.id,u.username,u.email FROM studio_sessions s JOIN studio_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>NOW()',[sha(token)]);return r.rows[0]||null}
function cookie(token,clear=false){return `hb_studio_session=${clear?'':token}; Path=/; HttpOnly; SameSite=Lax; ${process.env.NODE_ENV==='production'?'Secure; ':''}Max-Age=${clear?0:60*60*24*14}`}
const originAllowed=req=>!req.headers.origin || new URL(req.headers.origin).host===req.headers.host;
async function handler(req,res){
 const path=new URL(req.url,'http://localhost').pathname;
 if(!path.startsWith('/api/')){
  const asset=['/app.js','/style.css'].includes(path)?path.slice(1):'index.html';
  try{const data=await readFile(join(root,asset));res.writeHead(200,{'Content-Type':types[extname(asset)]||'text/plain','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}return;
 }
 if(!pool||!databaseReady)return bad(res,503,'Le stockage en ligne de Studio n’est pas encore configuré.');
 if(!originAllowed(req))return bad(res,403,'Origine non autorisée');
 if(req.method==='POST'&&['/api/register','/api/login'].includes(path)){
  if(!limit(req.socket.remoteAddress||'unknown'))return bad(res,429,'Trop de tentatives, réessaie plus tard.');
  const body=await readBody(req,20000),username=String(body.username||'').trim().toLowerCase(),email=String(body.email||'').trim().toLowerCase(),password=String(body.password||'');
  if(path==='/api/register'){
   if(!validUser(username)||reserved.has(username))return bad(res,400,'Pseudo indisponible (3 à 24 caractères, lettres, chiffres, _ ou -).');
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||password.length<10||password.length>128)return bad(res,400,'Adresse email invalide ou mot de passe de moins de 10 caractères.');
   try{const hash=await makeHash(password);const u=await pool.query('INSERT INTO studio_users(username,email,passhash) VALUES($1,$2,$3) RETURNING id,username,email',[username,email,hash]);await pool.query('INSERT INTO studio_profiles(user_id,data) VALUES($1,$2)',[u.rows[0].id,JSON.stringify({username,displayName:username,bio:'',widgets:[],connections:[],groups:[],playlist:[],mediaRefs:{},entryEnabled:false})]);const token=randomBytes(32).toString('hex');await pool.query('INSERT INTO studio_sessions(token_hash,user_id,expires_at) VALUES($1,$2,NOW()+INTERVAL \'14 days\')',[sha(token),u.rows[0].id]);return json(res,201,{user:{username,email}}, {'Set-Cookie':cookie(token)})}catch(e){if(e.code==='23505')return bad(res,409,'Pseudo ou email déjà utilisé.');throw e}
  }
  if(!email||!password)return bad(res,400,'Email et mot de passe nécessaires.');
  const u=await pool.query('SELECT * FROM studio_users WHERE email=$1',[email]);if(!u.rows[0]||!(await checkHash(password,u.rows[0].passhash)))return bad(res,401,'Identifiants incorrects.');const token=randomBytes(32).toString('hex');await pool.query('INSERT INTO studio_sessions(token_hash,user_id,expires_at) VALUES($1,$2,NOW()+INTERVAL \'14 days\')',[sha(token),u.rows[0].id]);return json(res,200,{user:{username:u.rows[0].username,email}}, {'Set-Cookie':cookie(token)});
 }
 if(req.method==='POST'&&path==='/api/logout'){const u=await session(req);if(u){const token=(req.headers.cookie||'').match(/(?:^|;\s*)hb_studio_session=([a-f0-9]{64})/)?.[1];if(token)await pool.query('DELETE FROM studio_sessions WHERE token_hash=$1',[sha(token)])}return json(res,200,{ok:true},{'Set-Cookie':cookie('',true)})}
 const u=await session(req);
 if(req.method==='GET'&&path==='/api/me')return json(res,200,{user:u?{username:u.username,email:u.email}:null});
 if(req.method==='GET'&&path==='/api/my-profile'){if(!u)return bad(res,401,'Connexion requise');const r=await pool.query('SELECT data,view_count FROM studio_profiles WHERE user_id=$1',[u.id]);return json(res,200,{profile:r.rows[0]?.data||{},views:Number(r.rows[0]?.view_count)||0})}
 if(req.method==='PUT'&&path==='/api/my-profile'){
  if(!u)return bad(res,401,'Connexion requise');const body=await readBody(req);if(!body.profile||typeof body.profile!=='object'||Array.isArray(body.profile))return bad(res,400,'Profil invalide');const p=body.profile;p.username=u.username;const raw=JSON.stringify(p);if(raw.length>1_000_000)return bad(res,413,'Profil trop volumineux');await pool.query('INSERT INTO studio_profiles(user_id,data) VALUES($1,$2) ON CONFLICT(user_id) DO UPDATE SET data=EXCLUDED.data,updated_at=NOW()',[u.id,raw]);return json(res,200,{ok:true})
 }
 if(req.method==='PUT'&&path==='/api/media'){
  if(!u)return bad(res,401,'Connexion requise');const b=await readBody(req,19*1024*1024);const id=String(b.id||'');if(!/^(library:|widget:)[a-zA-Z0-9_:\-]{1,140}$/.test(id)||typeof b.data!=='string'||!/^data:[\w.+-]+\/[\w.+-]+;base64,/.test(b.data))return bad(res,400,'Média invalide');const mime=b.data.match(/^data:([^;]+);base64,/)[1];if(!/^(image|audio|video)\//.test(mime))return bad(res,400,'Type non autorisé');const bytes=Buffer.from(b.data.split(',')[1],'base64');if(bytes.length>13*1024*1024)return bad(res,413,'Maximum 13 Mo par média');await pool.query('INSERT INTO studio_media(user_id,media_id,name,mime,bytes) VALUES($1,$2,$3,$4,$5) ON CONFLICT(user_id,media_id) DO UPDATE SET name=EXCLUDED.name,mime=EXCLUDED.mime,bytes=EXCLUDED.bytes',[u.id,id,String(b.name||'media').slice(0,200),mime,bytes]);return json(res,200,{ok:true})
 }
 if(req.method==='DELETE'&&path.startsWith('/api/media/')){if(!u)return bad(res,401,'Connexion requise');await pool.query('DELETE FROM studio_media WHERE user_id=$1 AND media_id=$2',[u.id,decodeURIComponent(path.slice('/api/media/'.length))]);return json(res,200,{ok:true})}
 if(req.method==='GET'&&path==='/api/my-media'){if(!u)return bad(res,401,'Connexion requise');const r=await pool.query('SELECT media_id FROM studio_media WHERE user_id=$1',[u.id]);return json(res,200,{ids:r.rows.map(x=>x.media_id)})}
 const media=path.match(/^\/api\/media\/([a-z0-9_-]{3,24})\/(.+)$/i);
 if(req.method==='GET'&&media){const name=media[1].toLowerCase(),id=decodeURIComponent(media[2]);const r=await pool.query('SELECT m.mime,m.bytes FROM studio_media m JOIN studio_users u ON u.id=m.user_id WHERE u.username=$1 AND m.media_id=$2',[name,id]);if(!r.rows[0])return bad(res,404,'Introuvable');res.writeHead(200,{'Content-Type':r.rows[0].mime,'Cache-Control':'public, max-age=120','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox"});return res.end(r.rows[0].bytes)}
 const pub=path.match(/^\/api\/profile\/([a-z0-9_-]{3,24})$/i);
 if(req.method==='GET'&&pub){
  const r=await pool.query('SELECT p.user_id,p.data,p.view_count FROM studio_profiles p JOIN studio_users u ON u.id=p.user_id WHERE u.username=$1',[pub[1].toLowerCase()]);
  if(!r.rows[0])return bad(res,404,'Profil introuvable');
  const found=r.rows[0];let views=Number(found.view_count)||0;
  // Un propriétaire connecté ne compte jamais comme visiteur. Un visiteur unique
  // compte une fois par jour civil UTC, même en rechargeant la page.
  const visitor=await session(req);
  if(!isBot(req)&&(!visitor||String(visitor.id)!==String(found.user_id))){
   const fingerprint=viewFingerprint(req);
   const client=await pool.connect();
   try{await client.query('BEGIN');
    const added=await client.query("INSERT INTO studio_profile_daily_views(user_id,day,visitor_hash) VALUES($1,(NOW() AT TIME ZONE 'UTC')::date,$2) ON CONFLICT DO NOTHING RETURNING user_id",[found.user_id,fingerprint]);
    if(added.rowCount){const updated=await client.query('UPDATE studio_profiles SET view_count=view_count+1 WHERE user_id=$1 RETURNING view_count',[found.user_id]);views=Number(updated.rows[0].view_count)}
    else {const cur=await client.query('SELECT view_count FROM studio_profiles WHERE user_id=$1',[found.user_id]);views=Number(cur.rows[0]?.view_count)||0}
    await client.query('COMMIT');
   }catch(err){await client.query('ROLLBACK');throw err}finally{client.release()}
  }
  return json(res,200,{profile:found.data,views});
 }
 return bad(res,404,'Route introuvable');
}
http.createServer((req,res)=>{handler(req,res).catch(e=>{console.error('Request failed:',e);if(!res.headersSent)bad(res,e.status||500,e.status?e.message:'Erreur du serveur')})}).listen(port,'0.0.0.0',()=>console.log(`Studio listening on ${port} (${databaseReady?'DB ready':'DB missing'})`));
