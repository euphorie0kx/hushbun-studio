# Export et import de thèmes — V0.6.8.1

Dans le mode « Modifier mon profil », utilise **↓ Exporter mon thème** pour télécharger un fichier `.json` qui contient les réglages et les médias effectivement utilisés (avatar, fonds, images/GIF de widgets, curseur, musiques et pochettes de playlist).

Pour restaurer le thème dans une autre installation compatible, utilise **↑ Importer un thème**. Cela remplace le profil actif après confirmation et ajoute ses médias à la bibliothèque locale. Les anciens médias ne sont pas supprimés. Exporte le profil actuel avant import.

**Important :** l’export doit être lancé sur le navigateur et l’origine (`http://localhost:4173`, par exemple) qui contiennent ton thème. Il n’est pas possible de récupérer depuis le serveur des médias stockés dans un autre navigateur. Le futur système de comptes publics devra appliquer ce même format d’import une fois l’authentification et la sauvegarde distante en place.

Le `.json` peut être volumineux si tu utilises des fichiers audio/vidéo. Il peut contenir des informations personnelles : ne le publie pas sur GitHub.
