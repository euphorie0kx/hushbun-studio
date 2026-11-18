# V0.7.0.1 — Badges multiples et tag

- Profil > Carte principale > Badges du profil : ajout, suppression, ordre, texte/emoji, fond uni ou dégradé, couleur du texte, taille, arrondi, animation et image/GIF par badge.
- Le badge historique est converti en premier badge à la première édition, sans perte de ses réglages. La migration a lieu seulement si une liste de badges n’existe pas déjà.
- Le tag affiché sous le nom reste indépendant du pseudo de connexion et du lien public.
- Les images des badges sont incluses dans l’export/import portable.

## Tests à réaliser
1. Vérifier que le badge existant est toujours visible, et sa couleur préservée.
2. Ajouter deux badges, modifier les trois indépendamment, monter/descendre, recharger.
3. Importer une petite image/GIF de badge, exporter/importer le thème et vérifier l’image.
4. Changer le tag visible sans changer l’URL publique.
5. Vérifier le rendu public avec un navigateur non connecté.

La syntaxe du code est vérifiée ; les tests de navigateur sur Render restent à réaliser.
