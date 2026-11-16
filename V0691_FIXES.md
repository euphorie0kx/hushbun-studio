# hushbun. Studio V0.6.9.1 — corrections

- Suppression de la phrase de démonstration et de la musique fictive des réglages par défaut.
- La nouvelle inscription démarre sur un profil vierge.
- Correction de la position par défaut de la biographie pour éviter le chevauchement avec le lecteur. Les profils personnalisés et leurs coordonnées sauvegardées ne sont pas modifiés.
- Le chiffre « 27 » a été supprimé : le compteur public lit maintenant `views` depuis `/api/profile/:username`.
- Un visiteur compte au maximum une fois par jour UTC et par profil, selon une empreinte pseudonyme (IP + navigateur hachés avec sel serveur). Les visites du propriétaire connecté et les robots identifiés ne sont pas comptés.
- Les vues sont conservées en base PostgreSQL (`studio_profiles.view_count`), avec dédoublonnage dans `studio_profile_daily_views`. Pas de faux compteur si le backend n'est pas connecté.

## Déploiement

Cette archive doit **remplacer** les fichiers du dépôt GitHub `hushbun-studio`. Le service Render doit disposer d'une variable `DATABASE_URL` pointant vers la base PostgreSQL **Studio**, et d'un secret stable `VIEW_HASH_SECRET` distinct des autres secrets (ne pas le stocker sur GitHub).

Le déploiement V0.6.9.1 et le comptage réel exigent des tests de bout en bout une fois PostgreSQL relié.
