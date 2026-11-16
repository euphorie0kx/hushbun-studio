# Import du thème malsain sur le site public

Cette version contient les boutons « Importer un thème » et « Exporter mon thème » directement dans la barre supérieure de l'éditeur public. Ils ne sont visibles que dans l'éditeur du compte connecté, pas sur les profils des visiteurs.

1. Installer cette version en remplaçant les fichiers du dépôt GitHub `euphorie0kx/hushbun-studio` (branche `main`).
2. Sur Render, vérifier que le service `hushbun-studio` utilise bien cette branche et possède la variable secrète `DATABASE_URL` pointant vers **la base Studio**, jamais celle de la messagerie.
3. Aller sur `https://hushbun-studio.onrender.com/`, créer un compte Studio ou se connecter.
4. Dans l'éditeur, utiliser « ↑ Importer un thème » et choisir le fichier `hushbun-theme-malsain-2026-11-16.json` **sur ton ordinateur**. Ne jamais placer ce fichier JSON sur GitHub.
5. Confirmer le remplacement du thème. Une confirmation apparaît après sauvegarde en ligne; ouvrir le profil public et vérifier depuis un second navigateur.

Limite actuelle de la sauvegarde de médias côté serveur : 13 Mo par fichier. Le fichier fourni contient un GIF d'environ 7,4 Mo, sous cette limite. La base Render gratuite est temporaire : conserver le JSON de sauvegarde.
