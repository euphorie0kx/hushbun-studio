# hushbun. Studio V0.6.9.6 — préparation publication

Contenu : V0.6.9.5 privée + fonds vidéo corrigés + fonctions publiques apportées par V0.6.9.4.

- 14 effets de texte, personnalisables pour nom, @, bio, note, widgets texte.
- Correction affichage fond vidéo : superposition CSS, lecture auto muette/boucle, conservation du flux entre les changements de réglages.
- Avatar GIF animé conservé.
- Playlists : pochettes indépendantes pour chaque piste, titre et artiste par piste.
- Lien public `/pseudo` distinct de `/studio`, copie du lien, sortie du mode édition.
- Suppression du bouton d'édition en bas à droite, compte/déconnexion à gauche dans l'éditeur.
- Affichage mobile simple, compteur de vues.

## Publication
Cette archive ne modifie pas Render à elle seule. Dans le dépôt GitHub **hushbun-studio** (branche main), remplacer à la racine `app.js`, `style.css`, `server.mjs`, `index.html`, `package.json` par les fichiers de cette archive, puis valider le commit. Les autres fichiers MD sont facultatifs. Render en auto-deploy doit alors reconstruire le service `hushbun-studio`. Ne pas modifier le dépôt de messagerie `hushbun`.

## Vérifications manuelles indispensables
- Exporter ton thème actuel en JSON avant toute publication.
- Fichier MP4 H.264 ou WebM < 13 Mo : image animée en fond sur la page publique et dans l'éditeur, sans redémarrer à chaque frappe. Le son du fond doit rester coupé.
- Ouvrir `/masochisticangel` dans une fenêtre privée et depuis le compte d'un ami : le contenu doit rester celui de `masochisticangel`.
- Vérifier chaque effet de texte, le menu de compte et les pochettes de plusieurs pistes.
- Les vidéos MOV/HEVC peuvent ne pas être compatibles selon le navigateur.

Note : tests automatiques de syntaxe possibles ; test de bout en bout avec base PostgreSQL et navigateur réel à effectuer lors du déploiement.
