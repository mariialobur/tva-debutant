# Exercice de synthèse — décompte complet · v2.3.1

Date de revue: 19.08.2026.

## Périmètre

Le Niveau 1 reste un **trainer de déclaration TVA**. La version 2.3.1 réduit volontairement l’ancien mini-grand-livre: il n’y a plus de qualification ligne par ligne, d’audit de pièces ni de travail de revue fiduciaire.

L’exercice donne directement **10 opérations résumées avec les hypothèses nécessaires**. Le participant doit uniquement les reporter dans le décompte selon la méthode effective et contrôler les totaux.

L’exercice reste hors compteur 18/18 et hors attestation.

## Opérations couvertes

- ventes suisses au taux normal;
- exportation documentée;
- prestation B2B fournie à l’étranger;
- location commerciale avec option;
- diminution de contre-prestation;
- impôt préalable sur charges;
- impôt préalable sur investissement;
- service étranger soumis, dans les faits du cas, à l’impôt sur les acquisitions;
- TVA à l’importation documentée par DTe;
- subvention hors contre-prestation.

Pour la subvention du scénario, les fonds financent uniquement des charges sans TVA. Il n’y a donc pas de réduction supplémentaire d’IP à calculer dans cet exercice. Cette hypothèse n’est pas une règle générale.

## Décompte attendu

L’exercice comporte 18 contrôles de rubriques / totaux:

- ch. 200: CHF 77’000.00;
- ch. 205: CHF 12’000.00;
- ch. 220: CHF 15’000.00;
- ch. 221: CHF 10’000.00;
- ch. 235: CHF 2’000.00;
- ch. 289: CHF 27’000.00;
- ch. 299 = ch. 379: CHF 50’000.00;
- ch. 303: CHF 50’000.00;
- ch. 383: base CHF 8’000.00 / impôt CHF 648.00;
- ch. 399: CHF 4’698.00;
- ch. 400: CHF 4’293.00;
- ch. 405: CHF 4’050.00;
- ch. 479: CHF 8’343.00;
- ch. 500: CHF 0.00;
- ch. 510: CHF 3’645.00;
- ch. 900: CHF 5’000.00.

Seuil pédagogique: 85 %.

## Sources principales

- Prototype AFC — décompte méthode effective: https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf
- AFC — impôt sur les acquisitions: https://www.estv.admin.ch/fr/impot-sur-les-acquisitions-tva
- AFC — DTe import/export: https://www.estv.admin.ch/fr/decisions-de-taxation-electroniques-de-la-douane

## QA

`tests/atelier.spec.js` vérifie que l’exercice reste centré sur la déclaration, contient 10 opérations résumées et 18 champs, peut être résolu à 100 % et ne modifie pas la progression 18/18.

La clé locale historique est conservée pour que le reset global continue de fonctionner, mais un marqueur de scope empêche un ancien score mini-grand-livre d’être repris comme résultat du nouvel exercice.
