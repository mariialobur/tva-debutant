# Atelier Mini-grand-livre — v2.3.0

Date de revue: 19.08.2026.

## Objet

Le Niveau 1 conserve ses 18 cas évalués et son examen final structuré. La v2.3.0 ajoute un **atelier autonome de synthèse** qui ne modifie pas le compteur 18/18 et n’entre pas dans l’attestation du niveau.

L’objectif est de passer d’opérations non préclassées à un décompte cohérent: lecture du grand livre, qualification TVA, choix des rubriques, contrôle arithmétique et interprétation du solde.

## Scénario

L’atelier contient 12 lignes: ventes suisses au taux normal, exportation documentée, prestation B2B fournie à l’étranger, location commerciale avec option, avoir, subvention, don, impôt préalable sur charges, investissement, service cloud étranger soumis dans les faits du cas à l’impôt sur les acquisitions, TVA à l’importation documentée par DTe et part privée véhicule déjà chiffrée dans le scénario.

Les hypothèses déterminantes sont volontairement explicites. Les traitements ne doivent pas être généralisés hors de ces faits.

### Garde-fou spécifique — subvention L6

La subvention de CHF 5’000 est expressément qualifiée comme telle par l’autorité publique. Pour éviter le raccourci pédagogique `subvention = ch. 900 seulement`, le scénario précise en plus que les fonds financent exclusivement des charges sans TVA et qu’aucun impôt préalable n’est attribuable à ces fonds. La réduction ch. 420 est donc nulle **dans ce scénario uniquement**. Dans un dossier réel, l’effet d’une subvention sur le droit à l’impôt préalable doit être analysé séparément.

## Contrôle attendu

Le participant effectue 29 contrôles: 12 qualifications et 17 rubriques / totaux. Le seuil pédagogique de réussite est fixé à 85 %. Le meilleur score est conservé localement sous `tva_effective_atelier_ledger_v1`.

Réconciliation du scénario:

- ch. 200: CHF 80’600.00;
- ch. 299 = ch. 379: CHF 53’600.00;
- ch. 383: base CHF 8’000.00 / impôt CHF 648.00;
- ch. 399: CHF 4’989.60;
- ch. 400: CHF 4’293.00;
- ch. 405: CHF 4’050.00;
- ch. 479: CHF 8’343.00;
- ch. 510: CHF 3’353.40.

## Sources principales

- Prototype AFC — décompte méthode effective: https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf
- AFC — impôt sur les acquisitions: https://www.estv.admin.ch/fr/impot-sur-les-acquisitions-tva
- AFC — DTe import/export: https://www.estv.admin.ch/fr/decisions-de-taxation-electroniques-de-la-douane
- AFC — concordance annuelle / corrections et réduction d’IP: https://www.estv.admin.ch/fr/tva-concordance-annuelle
- AFC — déroulement d’un contrôle TVA: https://www.estv.admin.ch/fr/deroulement-dun-controle-tva
- LTVA — Fedlex: https://www.fedlex.admin.ch/eli/cc/2009/615/fr

## QA

`tests/atelier.spec.js` vérifie l’ouverture de l’atelier, les 12 lignes, les 17 champs, une résolution complète à 100 % et l’absence d’impact sur la progression 18/18. Le smoke test exécute également `node --check` sur le module et sur le garde-fou de subvention, puis vérifie les constantes essentielles du scénario.

Le reset global du Niveau 1 efface aussi la progression de cet atelier.
