# Les modèles d'emails

Les 4 emails envoyés par les workflows. Les textes sont modifiables directement dans les nœuds d'email de n8n. Entre doubles accolades : les champs remplis automatiquement.

## 1. Accusé de réception au candidat (workflow 01, envoi immédiat)

C'est l'email qui porte les **mentions RGPD** : le candidat sait qu'un outil d'aide au tri est utilisé, que la décision est humaine, et comment exercer ses droits.

> **Objet :** Votre candidature au poste {{ poste }} a bien été reçue
>
> Bonjour {{ nom }},
>
> Merci pour votre candidature au poste de **{{ poste }}** chez {{ entreprise }}. Nous l'avons bien reçue.
>
> Vous recevrez une réponse dans un délai de 15 jours au plus tard.
>
> *Pour traiter les candidatures, nous utilisons un outil d'aide au tri qui compare votre CV aux critères du poste. Toutes les décisions sont prises par une personne de notre équipe. Pour toute question sur vos données personnelles (accès, rectification, suppression), répondez simplement à cet email.*
>
> Cordialement,
> L'équipe {{ entreprise }}

À adapter : le délai de réponse, que vous devez pouvoir tenir. Si votre entreprise a une politique de confidentialité en ligne, ajoutez son lien et la durée de conservation des candidatures.

## 2. Récapitulatif du soir au recruteur (workflow 02, chaque soir à 18 h)

> **Objet :** {{ nombre }} nouvelles candidatures aujourd'hui, {{ nombre avec un score d'au moins 70 }} à regarder en priorité
>
> Les 5 meilleures candidatures du jour par poste, classées par score, avec le résumé de l'IA et les éventuelles alertes de manipulation.
>
> Rappel : rien n'est envoyé aux candidats tant que vous n'avez pas rempli la colonne **Décision**.

## 3. Invitation à un entretien (workflow 03, Décision = « À rencontrer »)

> **Objet :** Votre candidature au poste {{ poste }} : nous aimerions vous rencontrer
>
> Bonjour {{ nom }},
>
> Votre candidature au poste de **{{ poste }}** a retenu notre attention et nous aimerions vous rencontrer.
>
> Pourriez-vous nous indiquer, en réponse à cet email, deux ou trois créneaux qui vous conviendraient la semaine prochaine ?
>
> Au plaisir d'échanger avec vous,
> L'équipe {{ entreprise }}

Variante : remplacez la demande de créneaux par le lien de votre outil de prise de rendez-vous.

## 4. Réponse négative (workflow 03, Décision = « Non retenu »)

> **Objet :** Votre candidature au poste {{ poste }} chez {{ entreprise }}
>
> Bonjour {{ nom }},
>
> Merci pour l'intérêt que vous portez à notre entreprise et pour le temps consacré à votre candidature au poste de **{{ poste }}**.
>
> Après étude de votre dossier par notre équipe, nous ne donnerons pas suite pour ce poste. Ce choix tient aux besoins précis du poste et ne remet pas en cause la qualité de votre parcours.
>
> Nous vous souhaitons une belle réussite dans vos recherches.
>
> Cordialement,
> L'équipe {{ entreprise }}

Chaque candidat reçoit une réponse : c'est aussi votre image d'employeur. Dans une PME, les candidats sont parfois des clients, des voisins, et surtout des gens qui parlent de vous.
