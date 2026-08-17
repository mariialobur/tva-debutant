# Audit fiscal — supplément du deuxième passage

**Date : 17.08.2026**

Après le premier audit des 12 cas, un deuxième passage a été effectué sur le prototype AFC actuel, la mécanique d'évaluation et les libellés du formulaire.

## Éléments supplémentaires trouvés

### 1. Ch. 900 — libellé trop large dans l'ancien index

L'ancien `FIELD_META.ch900` disait en substance « contributions aux établissements chargés de tâches publiques ». Cette formule est plus large que le prototype AFC actuel.

Le prototype officiel vise :

- subventions;
- taxes touristiques encaissées par les offices du tourisme;
- contributions versées aux établissements chargés de l'élimination des déchets et de l'approvisionnement en eau;
- art. 18, al. 2, let. a à c, LTVA.

Le nouveau `data.js` audité corrige le libellé et évite de transformer une catégorie précise du formulaire en catégorie générale de « tâches publiques ».

### 2. Cas B — phrase sur le taux spécial trop absolue

L'ancien contrôle disait « le taux spécial 3,8 % ne concerne pas la restauration ». Cette formulation peut être mal comprise, puisque le petit-déjeuner lié à une prestation d'hébergement peut suivre le taux spécial de l'hébergement.

Nouvelle formulation : « Le taux spécial de 3,8 % ne s'applique pas aux prestations de restauration indépendantes. »

### 3. Cas G — double lecture de l'impôt sur les acquisitions

Le calcul était déjà correct, mais pédagogiquement le ch. 400 de CHF 4'620 masquait la décomposition :

- autre IP courant : CHF 3'000;
- impôt sur les acquisitions déclaré au ch. 383 et déductible dans les hypothèses : CHF 1'620;
- total ch. 400 : CHF 4'620.

La nouvelle donnée rend ce mécanisme visible.

### 4. Cas J — pratique administrative 2025 à mettre à jour

L'AFC a révisé le formulaire 764 le 17.11.2025. Depuis cette date :

- application obligatoire de la procédure de déclaration : signatures des parties non requises;
- application facultative : signatures juridiquement contraignantes des deux parties toujours requises.

En outre, à partir du 08.03.2025, le formulaire de procédure de déclaration doit être téléversé directement dans le décompte TVA en ligne.

Ces éléments sont désormais intégrés au nouveau `data.js` audité.

### 5. Cas K — annexe du dégrèvement

À partir du 08.03.2025, l'annexe / relevé relatif au dégrèvement ultérieur de l'impôt préalable doit également être téléversé directement dans le décompte TVA en ligne. Le nouveau cas K le précise.

### 6. Mécanique d'évaluation actuelle

Aucune erreur de calcul supplémentaire n'a été détectée dans la mécanique de remise par cas :

- les réponses du mode Évaluation sont séparées des brouillons des autres modes;
- après remise, les champs sont verrouillés;
- le corrigé n'est révélé qu'après une action volontaire;
- un cas n'est marqué `mastered` qu'avec un meilleur score d'évaluation de 100 %;
- l'ouverture ultérieure du corrigé n'annule pas une réussite autonome déjà obtenue, ce qui est cohérent.

Le futur parcours devra toutefois distinguer cette validation **par cas** d'une éventuelle **évaluation finale globale**.

### 7. Dette technique observée

Le fichier `index.html` actuel contient encore données fiscales, logique, stockage, rendu et styles dans un seul fichier d'environ 100 KB. Ce n'est pas une erreur fiscale, mais c'est un risque de maintenance : une correction de texte fiscal peut accidentellement toucher la logique ou le rendu.

La branche `audit-effective-v2` commence donc la séparation :

- `data.js` : source de vérité fiscale et pédagogique;
- `logic.js` : calculs purs;
- `tests/unit.mjs` : invariants fiscaux et arithmétiques.

Le `main` ne sera pas remplacé avant intégration complète et contrôle du nouveau rendu.

## Conclusion du deuxième passage

Toujours **aucune erreur arithmétique** détectée parmi les 12 cas actuels. Les nouveaux points trouvés concernent essentiellement la précision des hypothèses, l'actualisation de la pratique administrative et la fidélité des libellés au prototype AFC. La priorité reste donc : intégrer le nouveau `data.js` audité, modulariser l'application, puis élargir le parcours seulement après tests.