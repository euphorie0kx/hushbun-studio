# hushbun. Studio 0.6.9 — installation en ligne

**Attention :** cette version ajoute des comptes **Studio indépendants** de la messagerie hushbun. Les deux authentifications ne sont pas encore unifiées.

## Installation

1. Dans le dépôt GitHub `euphorie0kx/hushbun-studio`, remplacer les fichiers existants avec **tous** les fichiers de cette archive, sans ajouter un sous-dossier.
2. Dans Render, créer un PostgreSQL distinct nommé `hushbun-studio-db` (région Frankfurt, idéalement la même que Studio).
3. Dans Render > service `hushbun-studio` > Environment, ajouter `DATABASE_URL` à partir de l'URL **interne** de la base Studio (ne jamais exposer cette URL dans GitHub ou des captures).
4. Définir `NODE_ENV=production` dans Render pour activer les cookies sécurisés.
5. Le service existant `hushbun-studio` utilise déjà `npm install --ignore-scripts` et `npm start`, et peut redéployer sur chaque commit GitHub.
6. Vérifier les logs Render : `DB ready` doit apparaître. Tester l'inscription, puis se déconnecter et se reconnecter.
7. Dans `/studio`, cliquer sur « Importer un thème » et sélectionner le fichier `hushbun-theme-malsain-2026-11-16.json`. Les médias sont transférés vers la base de données. Pour les fichiers volumineux, garder l'onglet ouvert jusqu'à la confirmation.
8. Vérifier la page publique `/malsain` depuis un autre navigateur privé et vérifier que l'éditeur n'est pas accessible en tant que visiteur.

## Important avant ouverture à tous

- La création de comptes doit encore être complétée par confirmation d'email, récupération de mot de passe, politique de conservation/modération des médias, quotas serveur et protections antibot plus fortes.
- Les médias sont enregistrés dans PostgreSQL : prévoir un stockage objet dédié pour une diffusion publique à grande échelle.
- Ne pas utiliser une base PostgreSQL Render éphémère/expirant comme stockage pérenne.
- Ce projet ne modifie pas `hushbun-private-beta`.
