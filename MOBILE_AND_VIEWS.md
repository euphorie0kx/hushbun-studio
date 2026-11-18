# V0.6.9.4 — Profils publics mobiles et vues

Sur les pages publiques uniquement (écran <= 680 px) : avatar/pseudo/badge et compteur de vues en haut, bio au milieu, lecteur musical en bas. Fond et écran Enter conservés. Widgets, note et liaisons masqués, jamais supprimés. Le rendu PC et l’éditeur ne sont pas modifiés.

Les vues sont comptées en base PostgreSQL pour chaque profil par visiteur et jour UTC. Une visite du propriétaire connecté ou d’un robot connu n’est pas comptée. Le comptage est indicatif : des visiteurs partageant IP/navigateur peuvent être regroupés et certains robots non détectés. Les vues existantes sont conservées ; la page de l’éditeur lit désormais le total sans l’incrémenter.

Pour publier : décompresser puis remplacer les fichiers du dépôt GitHub hushbun-studio (branche main). Render déploie automatiquement après commit. Tester ensuite une URL publique sur mobile et dans une fenêtre privée. La messagerie hushbun. n’est pas concernée.
