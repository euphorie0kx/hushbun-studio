# hushbun. Studio 0.6.9

Studio de profils personnalisés avec éditeur live, widgets, animations, liaisons, playlists, export/import de thèmes, comptes Studio indépendants et profils publics.

## Local

```bash
npm install
npm start
```

Par défaut, `localhost:4173` garde le comportement local et la sauvegarde du thème historique pour ne pas perdre les profils en cours de création.

## Public

Le mode public est activé sur un domaine différent de `localhost` / `127.0.0.1`. Il nécessite une base PostgreSQL accessible via `DATABASE_URL` et `NODE_ENV=production`. La base est initialisée par le serveur à son démarrage.

Voir `DEPLOYMENT.md` pour la procédure. Comptes Studio encore indépendants des comptes de messagerie.
