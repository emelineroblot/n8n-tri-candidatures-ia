# Pré-tri des candidatures par IA avec n8n

**L'IA trie, vous décidez.** Ce système lit chaque CV reçu par email, le compare à votre fiche de poste, répond à chaque candidat et vous prépare la liste des personnes à rencontrer. Aucun refus ne part sans que vous l'ayez décidé.

C'est le système présenté dans la vidéo YouTube de la chaîne [EMDIGITAL](https://www.youtube.com/@emdigitalfr) : 146 candidatures analysées pour 22 centimes d'IA, et 20 minutes de lecture au lieu de 5 heures.

Ce dépôt contient :

| Dossier | Contenu |
|---|---|
| [`workflows/`](workflows) | Les 3 workflows n8n à importer |
| [`grille/`](grille) | La grille de critères type et le prompt de l'IA |
| [`emails/`](emails) | Les modèles d'emails, dont l'accusé de réception avec les mentions RGPD |
| [`google-sheet/`](google-sheet) | Les colonnes du tableur |
| [`anonymisation/`](anonymisation) | Le code qui retire les données personnelles du CV avant l'IA |

## Comment ça marche

Le premier workflow fait le tri, en 5 étapes :

1. **La réception.** Les candidatures arrivent sur une adresse email dédiée. Un filtre Gmail leur pose l'étiquette `recrutement`.
2. **La lecture et l'anonymisation.** Le PDF est lu dans n8n, sans sortir de chez vous. Si le CV est scanné (une image), il passe par la lecture de texte de Mistral. Ensuite, le nom, l'email, le téléphone, l'adresse, l'âge, la nationalité et la situation familiale sont remplacés par des balises comme `[CANDIDAT]`. **L'IA ne sait jamais qui est le candidat.**
3. **L'analyse.** Mistral (une IA française, hébergée en Europe) compare le CV à votre grille : un score sur 100, les critères remplis et manquants, les points forts, les questions à poser en entretien, un résumé, et une alerte si le CV contient des instructions cachées pour l'IA.
4. **Le tableur.** Chaque candidature devient une ligne d'un Google Sheet. La colonne **Décision** reste vide : c'est à vous de la remplir.
5. **Les emails.** Le candidat reçoit tout de suite un accusé de réception qui l'informe de l'outil d'aide au tri.

Les deux autres workflows :

- **02 · Récapitulatif du soir** : chaque soir à 18 h, un seul email avec les candidatures du jour, classées par score.
- **03 · Envoi de la décision** : quand vous écrivez « À rencontrer » ou « Non retenu » dans la colonne Décision, le candidat reçoit la réponse correspondante. Jamais avant, et jamais deux fois.

## Ce qu'il vous faut

- **n8n**, auto-hébergé ou n8n Cloud, dans une version récente (les workflows ont été construits en novembre 2026).
- **Une clé d'API Mistral**, créée sur [La Plateforme de Mistral](https://console.mistral.ai).
- **Un compte Google** pour Gmail (réception) et Google Sheets (le tableau).
- **Une adresse d'envoi en SMTP** pour les emails aux candidats (celle de votre entreprise).

## Installation

1. **Importez les workflows.** Dans n8n : *Créer un workflow*, puis le menu *…*, puis *Import from File*, pour chacun des 3 fichiers de [`workflows/`](workflows).
2. **Branchez vos accès.** Ouvrez chaque nœud marqué en rouge et créez ou choisissez l'identifiant demandé : Gmail, Mistral Cloud, Google Sheets, Google Sheets Trigger et SMTP. Aucun identifiant n'est fourni dans les fichiers.
3. **Créez le tableau.** Un Google Sheet avec un onglet nommé **Candidatures** et, en ligne 1, les en-têtes de [`google-sheet/colonnes.csv`](google-sheet/colonnes.csv). Ajoutez une liste déroulante sur la colonne **Décision** : À rencontrer, Non retenu, En attente. Choisissez ce Sheet dans les 4 nœuds Google Sheets.
4. **Préparez Gmail.** Créez l'étiquette `recrutement` et un filtre qui l'applique aux emails de candidature (par exemple ceux envoyés à `recrutement@votre-entreprise.fr`).
5. **Personnalisez.**
   - Votre grille dans le nœud **Grille du poste** du workflow 01 (voir [`grille/`](grille)).
   - Le nom de votre entreprise dans **Grille du poste** (01) et **Votre entreprise** (03).
   - Votre adresse d'envoi dans les nœuds d'email, à la place de `recrutement@votre-entreprise.fr`.
   - L'adresse du recruteur dans le workflow 02, à la place de `vous@votre-entreprise.fr`.
6. **Testez avant d'activer.** Envoyez 2 ou 3 CV fictifs depuis des boîtes que vous contrôlez (les réponses partent vers l'expéditeur), lancez les workflows à la main avec *Execute workflow*, vérifiez le tableau et les emails. Activez ensuite les 3 workflows.

## Combien ça coûte

- **L'IA** : environ 0,05 centime par CV en texte et 0,45 centime par CV scanné. Pour les 146 CV de la démo, réanalyses et essais compris, la facture Mistral a été de 22 centimes.
- **n8n** : gratuit en auto-hébergement (comptez un petit serveur, autour de 10 € par mois), ou l'abonnement n8n Cloud.
- **Le temps** : environ 8 secondes d'analyse par CV.

## RGPD et AI Act : ce que le système prévoit

- **La décision reste humaine.** Le RGPD (article 22) interdit qu'une décision importante, comme un refus de candidature, soit prise uniquement par une machine. Ici, aucun email de réponse ne part sans votre décision.
- **Le candidat est informé** dès l'accusé de réception : outil d'aide au tri, décision humaine, contact pour ses données.
- **Les données sont minimisées** : l'IA ne reçoit qu'un CV anonymisé, et Mistral est hébergé en Europe.
- **La grille ne contient aucun critère discriminatoire**, et le prompt interdit à l'IA d'en tenir compte.
- **L'AI Act** classe les outils de recrutement parmi les usages à haut risque. Les obligations détaillées s'appliqueront à partir du 2 décembre 2027, mais ces principes vont déjà dans le bon sens.
- **À faire de votre côté** : fixer une durée de conservation des candidatures, la mentionner, et supprimer les lignes au-delà.

> Je ne suis pas avocate. Si vous recrutez beaucoup, faites valider votre dispositif par un juriste ou votre DPO.

## Limites connues

- Seule la **première pièce jointe** est lue, et seulement si c'est un **PDF**. Un CV en Word est ignoré.
- L'anonymisation repose sur des règles, pas sur une IA : un nom propre cité ailleurs que dans l'en-tête du CV (« recommandé par Jean Dupont ») peut passer.
- La grille est la clé de la qualité du tri. Ce n'est pas l'IA qui fait la qualité du tri, ce sont votre grille et vos consignes.

## Aller plus loin

Pour mes clients, je vais un cran plus loin : une interface à leur nom, plusieurs offres avec chacune sa grille, la réanalyse d'un CV en un clic.

Vous recrutez bientôt et vous voulez savoir si c'est adapté à votre entreprise ? Je propose un **diagnostic gratuit de 30 minutes** : [prendre rendez-vous](https://tidycal.com/emelineroblot/30-minute-meeting?utm_source=github&utm_medium=readme&utm_campaign=ia-recrutement-tri-candidatures).

Emeline Roblot · [EMDIGITAL](https://emdigital.fr/?utm_source=github&utm_medium=readme&utm_campaign=ia-recrutement-tri-candidatures)

## Licence

[MIT](LICENSE) : vous pouvez utiliser, modifier et partager ces workflows librement.
