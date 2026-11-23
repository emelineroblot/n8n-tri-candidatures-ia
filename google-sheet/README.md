# Le tableau des candidatures

Créez un Google Sheet avec un onglet nommé **Candidatures** et, en ligne 1, les en-têtes de [`colonnes.csv`](colonnes.csv), dans cet ordre.

| Colonne | Remplie par | Contenu |
|---|---|---|
| Date | Workflow 01 | Date de réception |
| Poste | Workflow 01 | Le poste de la grille |
| Nom | Workflow 01 | Nom de l'expéditeur de l'email (jamais envoyé à l'IA) |
| Email | Workflow 01 | Adresse du candidat, pour les réponses |
| Score | IA | Sur 100 : 70 points pour les critères obligatoires, 30 pour les souhaitables |
| Critères remplis | IA | Les critères de votre grille présents dans le CV |
| Critères manquants | IA | Ceux qui manquent |
| Questions à poser | IA | 2 ou 3 questions pour l'entretien |
| Résumé | IA | Le profil en quelques lignes |
| Alerte manipulation | IA | « OUI » et le détail si le CV contient des instructions cachées |
| **Décision** | **Vous** | À rencontrer, Non retenu ou En attente |
| Réponse envoyée | Workflow 03 | Date d'envoi de la réponse (empêche les doubles envois) |
| ID message | Workflow 01 | Identifiant de l'email Gmail |

**La liste déroulante de la colonne Décision** : sélectionnez la colonne, puis *Données*, *Validation des données*, *Menu déroulant*, avec les trois valeurs `À rencontrer`, `Non retenu` et `En attente`, écrites exactement ainsi.

Triez le tableau par score décroissant pour voir les meilleurs dossiers en premier.
