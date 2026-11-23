# Les workflows

| Fichier | Déclencheur | Rôle |
|---|---|---|
| [`01-tri-candidatures.json`](01-tri-candidatures.json) | Nouvel email Gmail avec l'étiquette `recrutement` et un PDF | Lecture, anonymisation, analyse par Mistral, ligne dans le tableau, accusé de réception |
| [`02-recap-du-soir.json`](02-recap-du-soir.json) | Chaque soir à 18 h | Un email au recruteur avec les candidatures du jour, classées par score |
| [`03-envoi-decision.json`](03-envoi-decision.json) | Modification de la colonne Décision du tableau | Invitation à un entretien ou réponse négative, puis « Réponse envoyée » |

Les trois workflows ne communiquent que par le Google Sheet.

Identifiants à créer dans n8n à l'import :

| Workflow | Gmail OAuth2 | Mistral Cloud | Google Sheets OAuth2 | Google Sheets Trigger OAuth2 | SMTP |
|---|---|---|---|---|---|
| 01 | ✓ | ✓ (OCR et analyse) | ✓ | | ✓ |
| 02 | | | ✓ | | ✓ |
| 03 | | | ✓ | ✓ | ✓ |

Installation complète : voir le [README principal](../README.md#installation).
