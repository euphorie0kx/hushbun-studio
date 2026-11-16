# hushbun. Studio V0.6.7 (prototype local)

Cette version reprend V0.6.5 sans supprimer les animations de widgets existantes.

## Changements
- Contrôles d’animation permanente et d’effet au survol pour la carte principale, le nom, le @, le badge, l’avatar, la note, la bio et le lecteur musical.
- Aucune animation n’est activée sur les nouveaux profils par défaut. Les animations déjà enregistrées sur les widgets ne sont pas modifiées.
- Opacité du **fond seulement** du lecteur musical (0–100 %) : le texte, la pochette et les boutons ne deviennent pas transparents.
- Suivi continu des liaisons vers les éléments principaux animés, y compris les points de la note.
- Animation réduite quand le visiteur a activé la préférence système correspondante.

## Lancer
Décompresse l’archive et exécute `npm.cmd start` sous Windows PowerShell, puis ouvre `http://localhost:4173/euphorie`.

## Limitations
Le projet reste local. La sauvegarde du profil est liée au navigateur et à `localhost:4173` ; les fichiers médias sont stockés dans IndexedDB. Évite d’effacer les données du site, car les thèmes font référence à ces fichiers. Les tests interactifs restent à valider sur le PC réel.

## Correctif V0.6.7
- Répare l’affichage des sections « Animations de la note » et « Animations de la biographie » dans leurs panneaux respectifs (concaténation interrompue par un point-virgule).
- Ne modifie pas les animations déjà enregistrées ni les autres fonctions.

## V0.6.8 — Playlists
- Importation de plusieurs audios depuis l'onglet Musique du Studio ; chaque morceau possède un titre, un artiste et une pochette indépendante.
- Ordre ajustable avec les flèches haut/bas ; possibilité de retirer une piste sans effacer son fichier de la bibliothèque.
- La première piste démarre au clic « Enter » (si la musique à l'entrée est activée). Lecture continue : piste suivante puis retour à la première, y compris pour une playlist d'une seule piste.
- Pochette, titre et artiste sont mis à jour dans le lecteur existant à chaque transition ; son volume est conservé.
- L'ancien morceau unique est automatiquement conservé comme première piste lors du premier chargement. Les anciennes clés de stockage et les réglages du profil restent inchangés.
- Les morceaux sont stockés localement dans IndexedDB. Ne pas supprimer les données de ce site dans le navigateur.
- Les tests interactifs audio sur le navigateur Windows de l'utilisateur restent à effectuer.
