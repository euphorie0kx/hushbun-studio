# hushbun. Studio 0.6.8 — Préparation Render

Cette archive est une base de déploiement **du prototype**, pas une plateforme multicomptes prête pour le public. Elle conserve son stockage local (localStorage et IndexedDB) ; les profils ne sont pas partagés entre visiteurs ou appareils. Ne pas la présenter comme une plateforme avec comptes utilisateurs.

## Infrastructure
- Répertoire Git indépendant de la messagerie hushbun. : ne pas pousser sur `euphorie0kx/hushbun`.
- Nouveau service `hushbun-studio` distinct de `hushbun-private-beta`.
- Règle Render incluse dans `render.yaml`, à lancer **uniquement après** mise du code dans un dépôt Git séparé.
- Un sous-domaine `onrender.com` est créé par Render ; le domaine `hushbun.com` nécessitera une configuration DNS et des tests spécifiques.

## Conditions avant ouverture au public
1. Authentification et sessions sécurisées.
2. Stockage serveur des profils et leurs médias, avec autorisations par utilisateur.
3. Pages publiques récupérant les profils côté serveur en fonction du pseudo.
4. Migration/export des données locales de l'utilisateur vers son compte, sans effacement.
5. Limites de stockage et d'import, protections anti-abus, modération et mentions légales.
6. Tests indépendants navigateur/ordinateur/mobile et gestion des bugs.

## Démarrage local
`npm start` puis `http://localhost:4173/euphorie`.
