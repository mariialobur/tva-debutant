# Revue d’extension — méthode effective Niveau 1

**Date : 17.08.2026**  
**Version : 2.1.0**  
**Périmètre : passage de 12 à 18 cas pratiques**

## Objet

Cette extension complète le Niveau 1 par six situations de travail courant qui manquaient au parcours initial: période TVA selon le mode de décompte, importation de biens et DTe, monnaies étrangères, part privée d’un véhicule de service, décompte rectificatif et décompte annuel.

Les six nouveaux cas ont été construits pour introduire des réflexes fiduciaires sans transformer le Niveau 1 en dossier expert. Les hypothèses nécessaires sont donc données explicitement et les difficultés plus complexes restent réservées au Niveau 2.

## Cas ajoutés

| Cas | Thème | Point contrôlé |
|---|---|---|
| **M** | Contre-prestations convenues / reçues | facturation, encaissement, paiement anticipé et période de l’IP |
| **N** | Importation + DTe | distinction TVA à l’importation / impôt sur les acquisitions et justificatif douanier |
| **O** | Monnaie étrangère | conversion en CHF et cohérence de la méthode de change |
| **P** | Part privée véhicule | intégration d’une part privée documentée dans la base imposable |
| **Q** | Décompte rectificatif | correction de la période réellement concernée |
| **R** | Décompte annuel | seuil, demande, périodicité, acomptes et échéance annuelle |

## Référentiel officiel utilisé

- LTVA — RS 641.20: https://www.fedlex.admin.ch/eli/cc/2009/615/fr
- OTVA — RS 641.201: https://www.fedlex.admin.ch/eli/cc/2009/828/fr
- AFC — TVA, importations et acquisitions: https://www.estv.admin.ch/fr/taxe-sur-la-valeur-ajoutee
- AFC — décisions de taxation électroniques (DTe): https://www.estv.admin.ch/fr/decisions-de-taxation-electroniques-de-la-douane
- AFC — cours de change pour la TVA: https://www.estv.admin.ch/fr/tva-cours-de-change-de-monnaies-etrangeres
- AFC — déroulement d’un contrôle TVA: https://www.estv.admin.ch/fr/deroulement-dun-controle-tva
- AFC — communications concernant la TVA / véhicule de service: https://www.estv.admin.ch/fr/communications-concernant-la-tva
- AFC — décompte de rectification: https://www.estv.admin.ch/fr/tva-decompte-de-rectification
- AFC — décompte annuel: https://www.estv.admin.ch/fr/tva-decompte-annuel-2025
- Prototype AFC — méthode effective: https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf

## Garde-fous pédagogiques

### M — période TVA

Le cas indique expressément que l’entreprise utilise les contre-prestations convenues. Il ne présente donc pas l’encaissement comme le critère universel de rattachement et distingue le traitement du paiement anticipé.

### N — importation

Le cas porte sur une machine physique importée. La TVA à l’importation documentée par la DTe est distinguée du ch. 383 relatif à l’impôt sur les acquisitions. Le classement au ch. 405 est lié à la nature d’investissement de la machine dans ce dossier.

### O — devise

Le cours de 0,9500 CHF/EUR est uniquement une donnée d’exercice. Le parcours rappelle explicitement qu’un cours réel doit être repris dans la publication AFC applicable et que la méthode de conversion choisie doit être utilisée de façon cohérente pendant la période fiscale.

### P — véhicule de service

Le calcul de la part privée est fourni par le dossier afin que l’exercice porte sur son traitement dans le décompte. Les variantes particulières de calcul ne sont pas transformées en règle universelle.

### Q — rectification

Le participant reconstitue l’état corrigé de T2, mais la compétence visée est surtout procédurale: une erreur isolée d’une période déjà remise se corrige au moyen du décompte rectificatif de cette période, et non par déplacement silencieux dans la période suivante.

### R — décompte annuel

Le scénario suppose la demande et les conditions remplies. Le décompte annuel change la périodicité de remise, pas la logique de calcul de la méthode effective. Les acomptes payés pendant l’année sont présentés comme des paiements et non comme des rubriques de chiffre d’affaires ou d’impôt préalable.

## Évaluation et qualité

Le Niveau 1 comprend désormais **18 cas**. L’évaluation finale comporte **15 questions aléatoires** avec un seuil de **12/15 (80 %)** et s’appuie sur une banque de plus de 30 questions après extension.

L’ancien résultat final du parcours de 12 cas n’est pas réutilisé comme réussite de la nouvelle version: l’évaluation v2 possède une clé locale distincte.

La suite automatisée du dépôt vérifie les fichiers essentiels, l’intégrité des 18 cas, leur arithmétique, les sources référencées, les garde-fous pédagogiques et la structure de la banque de questions, puis exécute les scénarios Playwright E2E.

## Limite

Cette revue valide la cohérence pédagogique des scénarios au regard des sources officielles identifiées à la date ci-dessus. Un dossier réel peut nécessiter une qualification différente en fonction des faits, de la période fiscale, des documents disponibles ou d’une évolution du droit ou de la pratique AFC.
