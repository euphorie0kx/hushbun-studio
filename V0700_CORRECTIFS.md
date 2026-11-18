# V0.7.0.0 — Recherche et curseur

## Recherche globale
- Indexation des champs individuels (clés de réglages, labels, options), dans chaque élément, au lieu des seuls titres de sections.
- Un résultat affiche le nom du champ et son emplacement. Un clic sélectionne l'élément, ouvre la bonne section et met le champ en évidence.
- Déduplication des résultats de recherche selon (élément, clé).
- Recherches accent-insensibles.

## Curseur personnalisé
- Ajout de `has-custom-cursor` au vrai noeud `.profile-world`, plutôt qu'à son conteneur `#liveStage`/`#publicView`.
- CSS `cursor: none` sur tous les descendants dans le cas d'une souris fine, et repli sans image/tactile.
- Position calculée relativement à `.profile-world`.

## Audit de doublons
- Plusieurs clés sont reprises dans les anciens contrôles et dans l'éditeur moderne, ainsi que dans des catégories alternatives (bio, note, couleur du fond, etc.). Les doublons de résultats ont été supprimés dans la recherche, mais la consolidation visuelle complète des panneaux n'est **pas** faite : supprimer sans analyse ces champs risquerait de masquer des capacités existantes.
- Ne modifie pas les valeurs enregistrées du thème.

## Vérifications réalisées
- `node --check app.js` et `node --check server.mjs`: OK.
- Non validé dans navigateur réel : dépendances Node (pg) absentes dans l'environnement de test. Tester après `npm install` puis sur un profil exporté en sauvegarde.
- Aucun déploiement Render réalisé.
