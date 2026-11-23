# L'anonymisation

[`anonymiser.js`](anonymiser.js) est le code du nœud **Anonymiser le CV** du workflow 01, en version autonome pour le lire ou le tester. Il tourne dans n8n, sans service externe : les données personnelles ne quittent pas votre serveur.

Avant l'analyse, il remplace :

| Donnée | Balise |
|---|---|
| Nom et prénom (expéditeur de l'email et première ligne du CV) | `[CANDIDAT]` |
| Email, liens (LinkedIn, site) | `[EMAIL]`, `[LIEN]` |
| Téléphone | `[TÉLÉPHONE]` |
| Adresse, code postal, ville de la ligne de contact | `[ADRESSE]`, `[VILLE]` |
| Âge, date de naissance | `[ÂGE]`, `[INFO RETIRÉE]` |
| Nationalité, situation familiale, enfants, photo, titre de séjour, religion, handicap | `[INFO RETIRÉE]` |

Les durées d'expérience (« 4 ans d'ADV ») sont conservées.

**Limite connue** : un nom propre cité ailleurs que dans l'en-tête du CV (« recommandé par Jean Dupont ») peut passer. Le prompt demande de toute façon à l'IA de ne jamais tenir compte de critères personnels.

Exemple d'utilisation en Node.js :

```js
const { anonymiser } = require('./anonymiser');
console.log(anonymiser('Camille Martin\ncamille.martin@gmail.com | 06 12 34 56 78 | Lyon', ['Camille Martin']).texte);
// [CANDIDAT]
// [EMAIL] | [TÉLÉPHONE] | [VILLE]
```
