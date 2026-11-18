# hushbun. Studio V0.6.9.7 — réorganisation de l'éditeur

Version préparée à partir de la V0.6.9.6, sans changement du modèle de données ni suppression de thèmes.

## Changements
- Recherche dans les éléments du panneau gauche.
- Recherche dans les réglages du panneau droit.
- Catégories du panneau gauche repliables (Profil, Apparence & effets, Musique & liens, Bibliothèque & thèmes, Calques & groupes, Widgets, Liaisons).
- Sections de réglages repliables par clic sur leur titre.
- Mode Aperçu : masque la barre de commande, les panneaux et les poignées, avec retour à l'édition.
- Compte/déconnexion repositionnés en haut à gauche lorsque connecté en ligne.
- Menu Projet : exporter, importer, sauvegarder un thème, copier le lien public.

## Déploiement
Importer les fichiers de cette archive dans le dépôt GitHub `euphorie0kx/hushbun-studio`, puis laisser Render déployer le nouveau commit.
Le serveur et les fonctions publiques du profil restent ceux de V0.6.9.6.

## Aperçu réel local
Un fichier séparé `hushbun-studio-v0697-apercu-interactif.html` est fourni : il embarque le vrai code client de cette version, le vrai CSS et une copie du thème `malsain` et de ses médias. Il peut être ouvert sur un ordinateur pour tester visuellement les contrôles sans connecter un compte. L'aperçu n'est pas connecté au serveur et les changements ne se publient pas.

## Vérification
`node --check app.js` réussit. Les tests en navigateur automatisés ont été bloqués par les restrictions d'accès à localhost et file:// de l'environnement. Les fonctions restent donc à valider dans le navigateur de l'utilisateur.
