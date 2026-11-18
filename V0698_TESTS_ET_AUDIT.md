# V0.6.9.8 — Correctifs à vérifier avant publication

- Recherche globale : champ « Rechercher partout » dans le panneau Réglages. Le résultat indique la section exacte et l’élément concerné. Clique sur une réponse pour accéder directement à cette section. Recherche basée sur les véritables formulaires de l’éditeur, y compris les noms des effets.
- Effets texte : dans Carte principale (pseudo et @), Note, Biographie, ou chaque widget texte ; l’introduction de la rubrique Effets explique où les trouver.
- Curseur : correction CSS de la cible `.has-custom-cursor`, installée sur la racine de la scène et non sur `.profile-world`. Masquage sur les éléments interactifs et champs en mode souris, pas sur mobile.

## Doublons et réorganisation

Audit : plusieurs commandes agissent sur les mêmes propriétés depuis différents panneaux : les bulles de bio/note sont aussi réglables dans Médias, les couleurs de la carte dans Profil et Apparence, ; « Musique au clic sur Enter » était en double dans Musique et Accueil : la commande Musique a été remplacée par un renvoi vers Accueil. Ces commandes partagent la même valeur (il ne s'agit pas de deux données distinctes). Pour ne pas casser les thèmes enregistrés, cette version ne supprime pas les réglages structurels avant de migrer proprement leur navigation. La consolidation de ces rubriques reste à faire.

## Tests prioritaires
1. Chercher « glitch », cliquer sur « Effets du texte », confirmer la sélection de l’élément et l’ouverture de la section.
2. Charger un curseur GIF/PNG sur profil public et sur le mode édition ; tester sur un bouton et dans un champ de texte ; sur mobile, le curseur système reste géré par l’appareil.
3. Tester le changement de valeur et la sauvegarde sur une bio, un nom, une playlist et les fonds vidéo.

Les contrôles fonctionnels ne sont pas validés automatiquement en navigateur ; ce paquet est une version de test à vérifier, pas un déploiement Render.
