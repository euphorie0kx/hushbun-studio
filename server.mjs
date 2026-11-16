import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
http.createServer(async (req,res)=>{
  const path = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const asset = ['/app.js','/style.css'].includes(path) ? path.slice(1) : 'index.html';
  try { const data = await readFile(join(root,asset));res.writeHead(200, {'Content-Type':types[extname(asset)]||'text/plain','Cache-Control':'no-store'});res.end(data); }
  catch {res.writeHead(404);res.end('Not found');}
}).listen(port,()=>console.log(`hushbun. Studio : http://localhost:${port}/euphorie`));
