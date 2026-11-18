# V0.7.0.2 — Fenêtres intégrées

- Confirmation des suppressions de widgets, médias, créations et thèmes.
- Confirmation avant import et restauration de thème.
- Entrée du nom de thème ou composition dans une fenêtre Studio.
- Messages d’état et d’erreur sous forme de notifications discrètes.
- Sur profils publics, confirmation avant ouverture des liens externes ; l’URL complète est visible et l’utilisateur reste libre d’annuler.
- Thématisation des fenêtres publiques par les couleurs du profil visité.
- Aucune dépendance supplémentaire.

## Test à faire

1. Ouvrir l’éditeur, sélectionner un widget et cliquer Supprimer puis Annuler : le widget doit rester.
2. Supprimer le widget en confirmant : il doit disparaître.
3. Ouvrir `https://hushbun-studio.onrender.com/masochisticangel` en navigation privée, cliquer TikTok ou Spotify : fenêtre aux couleurs du profil, URL lisible, Annuler et Ouvrir le lien.
4. Ouvrir Projet et enregistrer un thème : saisir le nom dans la fenêtre intégrée.
5. Vérifier que le clavier (Échap, Entrée, Tab) et le mobile fonctionnent.

Tests automatisés : vérification syntaxique JavaScript et intégrité ZIP. Les clics en vrai navigateur restent à tester.
