# Audit fiscal — méthode effective

**Projet :** Parcours pratique du décompte TVA suisse — méthode effective  
**Audit :** 17.08.2026  
**Périmètre :** 12 cas actuels A–L, logique des rubriques, calculs, qualification TVA et droit à l'impôt préalable.  
**Principe :** aucune règle n'est considérée comme acquise uniquement parce que le calcul « fonctionne ». La qualification, la rubrique et la source officielle doivent également être cohérentes.

## Sources de contrôle prioritaires

- LTVA, RS 641.20 : https://www.fedlex.admin.ch/eli/cc/2009/615/fr
- Prototype AFC du décompte TVA en ligne — méthode effective : https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf
- AFC — taux de TVA : https://www.estv.admin.ch/fr/taux-de-la-tva-suisse
- AFC — impôt sur les acquisitions : https://www.estv.admin.ch/fr/impot-sur-les-acquisitions-tva
- AFC — décompter la TVA en ligne : https://www.estv.admin.ch/fr/decompter-la-tva-en-ligne
- AFC — déroulement d'un contrôle TVA : https://www.estv.admin.ch/fr/deroulement-dun-controle-tva
- AFC — formulaire 764 / procédure de déclaration : https://www.estv.admin.ch/fr/newnsb/Os-oY1FEYEzWtOce1tKdC

## Résultat global

**Aucune erreur arithmétique détectée dans les 12 cas.** Les formules du simulateur correspondent à la structure actuelle du prototype AFC pour les rubriques utilisées :

- ch. 289 = 220 + 221 + 225 + 230 + 235 + 280;
- ch. 299 = 200 − 289;
- ch. 379 = bases imposables aux taux actuels dans le périmètre des exercices;
- ch. 399 = impôt dû sur 303 / 313 / 343 + impôt sur les acquisitions ch. 383;
- ch. 479 = 400 + 405 + 410 − 415 − 420;
- ch. 500 / 510 = solde à payer / en faveur de l'assujetti.

Les taux 8,1 %, 2,6 % et 3,8 % correspondent aux taux actuellement en vigueur pour les périodes 2026 utilisées dans les cas.

### Statut

- **8 cas : verts** — logique fiscale et présentation suffisamment encadrées.
- **4 cas : verts avec durcissement recommandé** — B, H, I, K.
- **0 cas : rouge pour erreur de calcul.**
- **K est la correction conceptuelle la plus importante** : il faut préciser pourquoi l'impôt préalable n'était pas déductible à l'origine; un simple oubli de déduction ne suffit pas à créer un dégrèvement ultérieur au sens de l'art. 32 LTVA.

---

## A — Alpina Conseil Sàrl — premier décompte

**Statut : ✅ vert.**

- Honoraires suisses de conseil : taux normal 8,1 % dans les hypothèses du cas.
- ch. 200 = 100'000; ch. 303 = 100'000; ch. 400 = 3'240.
- Impôt dû : 8'100; impôt préalable : 3'240; ch. 500 = 4'860.
- La logique correspond aux art. 18, 25 et 28 LTVA.

**Action :** aucune correction fiscale nécessaire.

## B — Boulangerie du Lac — sur place et à emporter

**Statut : ✅ vert, formulation à renforcer.**

Le résultat 40'000 à 8,1 % / 60'000 à 2,6 % est correct **si les conditions factuelles du cas sont explicitement remplies**. L'art. 25, al. 3, LTVA prévoit le taux normal pour les denrées remises dans le cadre de prestations de la restauration et le taux réduit pour les denrées destinées à être emportées ou livrées lorsque des **mesures appropriées d'ordre organisationnel** permettent de les distinguer des prestations de restauration.

Le texte actuel mentionne surtout que les ventes sont « enregistrées séparément ». Cela va dans la bonne direction mais ne doit pas être présenté comme l'unique condition légale.

**Correction recommandée :** ajouter dans les faits que des mesures organisationnelles appropriées sont en place et que les ventes à emporter sont enregistrées séparément. Remplacer « le taux spécial ne concerne pas la restauration » par « le taux spécial ne s'applique pas aux prestations de restauration indépendantes » afin d'éviter une formulation trop générale en présence du petit-déjeuner lié à l'hébergement.

## C — Hôtel des Cimes — trois taux

**Statut : ✅ vert.**

- Hébergement avec petit-déjeuner lié : 3,8 %.
- Restaurant indépendant : 8,1 %.
- Denrées admissibles à emporter : 2,6 % dans les hypothèses du cas.
- AFC confirme que le taux spécial de 3,8 % s'applique au logement avec petit-déjeuner même lorsque le petit-déjeuner est facturé séparément.

Calcul : ch. 399 = 5'670 + 390 + 6'840 = 12'900; après IP 7'200, ch. 500 = 5'700.

**Action :** aucune correction fiscale nécessaire.

## D — Nova Services SA — note de crédit / ch. 235

**Statut : ✅ vert.**

L'art. 41 LTVA impose l'adaptation du chiffre d'affaires lors de la comptabilisation de la correction ou de l'encaissement effectif de la contre-prestation corrigée. La présentation ch. 200 = 120'000, ch. 235 = 10'000, base ch. 303 = 110'000 est cohérente avec le prototype AFC.

Calcul : impôt dû 8'910; ch. 500 = 6'910 après IP 2'000.

**Action :** aucune correction nécessaire. Conserver la distinction entre décompte selon contre-prestations convenues et reçues.

## E — Cabinet Dr Weber — activités mixtes / ch. 415

**Statut : ✅ vert, hypothèse comptable à expliciter légèrement.**

- Prestations médicales : le cas indique expressément qu'elles remplissent les conditions d'exclusion; c'est une hypothèse nécessaire et correcte.
- Art. 29 LTVA : l'IP affecté aux prestations exclues sans option n'est pas déductible.
- Art. 30 LTVA : en cas de double affectation, l'IP doit être corrigé en proportion de l'utilisation.
- Le prototype AFC prévoit le ch. 415 notamment pour les corrections de double affectation.

La clé de 40 % est explicitement une donnée documentée du cas et non une règle générale. L'AFC indique lors des contrôles qu'elle examine si la clé utilisée est appropriée.

Calcul : IP commun 15'000; correction 40 % = 6'000; ch. 479 = 9'000; ch. 500 = 3'960.

**Amélioration recommandée :** préciser que les CHF 12'000 et CHF 3'000 sont, dans le scénario, enregistrés avant la correction de double affectation au ch. 415. Cela évite de laisser croire qu'une seule méthode de ventilation comptable est obligatoire dans tous les dossiers.

## F — Helvetic Machines SA — exportation / ch. 220

**Statut : ✅ vert.**

L'art. 23 LTVA exonère notamment la livraison de biens transportés ou expédiés directement à l'étranger. Le prototype AFC affecte les prestations exonérées au ch. 220. La déduction de l'IP reste possible sous réserve des conditions et preuves.

Calcul : ch. 200 = 150'000; ch. 220 = 100'000; ch. 303 = 50'000; impôt dû 4'050; crédit ch. 510 = 2'450 après IP 6'500.

**Action :** aucune correction nécessaire.

## G — Digital Romandie Sàrl — prestation à l'étranger + acquisition

**Statut : ✅ vert, pédagogie à clarifier.**

- Art. 8, al. 1, LTVA : la prestation B2B du cas est réputée fournie au lieu du destinataire en France; ch. 221 dans les hypothèses du cas.
- Art. 45 LTVA et page AFC sur l'impôt sur les acquisitions : une prestation de conseil relevant du principe du lieu du destinataire, acquise auprès d'une entreprise étrangère non inscrite en Suisse, est soumise à l'impôt sur les acquisitions pour le destinataire assujetti.
- Art. 28, al. 1, let. b, LTVA : l'impôt déclaré sur les acquisitions peut être déduit lorsqu'il est affecté à une activité ouvrant le droit à déduction.

CHF 20'000 × 8,1 % = CHF 1'620. Le ch. 400 de CHF 4'620 est cohérent si le dossier comprend CHF 3'000 d'autre IP courant + CHF 1'620 d'impôt sur les acquisitions déductible.

**Amélioration recommandée :** afficher explicitement cette décomposition 3'000 + 1'620 afin que l'utilisateur comprenne pourquoi le même impôt sur les acquisitions apparaît d'abord dans l'impôt dû puis, si les conditions sont remplies, dans l'impôt préalable.

## H — CultureLab — subvention / ch. 900 et ch. 420

**Statut : ⚠️ calcul correct, qualification à verrouiller.**

Le résultat est cohérent **si le versement communal est réellement une subvention ou autre contribution de droit public au sens de l'art. 18 LTVA**. Le fait qu'un paiement provienne d'une commune ne suffit pas, à lui seul, pour éviter toute confusion avec une contre-prestation.

L'art. 18, al. 3, LTVA prévoit une règle particulièrement claire : lorsque la collectivité publique indique expressément au bénéficiaire que les fonds constituent une subvention ou une autre contribution de droit public, ils sont réputés tels. L'art. 33, al. 2, LTVA impose ensuite une réduction de l'IP en proportion des fonds visés à l'art. 18, al. 2, let. a à c. Le prototype utilise ch. 900 et ch. 420.

La clé de 20 % peut rester dans un exercice **si elle est donnée comme clé appropriée et documentée du dossier**; l'AFC contrôle précisément le caractère approprié de la clé.

**Correction requise :** modifier le fait du cas pour indiquer que la décision de la commune qualifie expressément les CHF 30'000 de subvention / contribution de droit public et qu'aucune contre-prestation individualisable n'est fournie en échange. Conserver l'avertissement sur le sponsoring.

## I — ImmoPro SA — option / ch. 205

**Statut : ✅ vert, conditions de l'option à rendre visibles.**

Le prototype AFC confirme que le ch. 205 est une information comprise dans le ch. 200 et ne constitue pas une déduction. L'art. 22 LTVA autorise en principe l'option, mais l'interdit notamment pour les prestations immobilières visées à l'art. 21, al. 2, ch. 20 et 21 lorsque le destinataire affecte ou compte affecter l'objet exclusivement à des fins d'habitation.

Le cas parle déjà de « locaux commerciaux » et suppose une option valable. Pour une formation, il est préférable de rendre cette hypothèse explicite.

**Correction recommandée :** préciser que le destinataire utilise les locaux à des fins commerciales, non exclusivement d'habitation, et que l'option a été exercée de manière valable (indication claire ou déclaration dans le décompte selon l'art. 22).

## J — Transmission PME SA — procédure de déclaration / ch. 225

**Statut : ✅ vert, hypothèse à rendre plus transparente.**

L'art. 38 LTVA impose la procédure de déclaration lorsque l'impôt calculé au taux légal applicable au prix de vente dépasse CHF 10'000 ou qu'il y a aliénation à une personne étroitement liée, dans les opérations visées, notamment certaines restructurations et cessions de fonds de commerce à un autre assujetti. La déclaration intervient dans le décompte ordinaire.

Le prototype inclut le transfert au ch. 200 puis le déduit au ch. 225. Le formulaire 764 actuel doit être utilisé; depuis la révision publiée le 17.11.2025, les signatures ne sont plus nécessaires pour l'application obligatoire, alors qu'elles restent requises pour l'application facultative.

**Amélioration recommandée :** ajouter dans les faits que, selon les hypothèses du cas, l'acquéreur est assujetti et que l'impôt théorique au taux légal applicable au prix de vente dépasse CHF 10'000 (ou expliciter l'autre déclencheur retenu). Le résultat numérique actuel ne change pas.

## K — Atelier Horizon — dégrèvement ultérieur / ch. 410

**Statut : ⚠️ correction conceptuelle prioritaire.**

Le calcul CHF 5'000 × 2/5 = CHF 2'000 après trois années écoulées est correct selon l'art. 32, al. 2, LTVA pour un bien mobilier **si les conditions de déduction n'étaient pas remplies à l'origine et deviennent remplies ultérieurement**.

Le texte actuel indique seulement « TVA non déduite à l'origine sur la machine ». Cette formulation est trop large : un simple oubli de réclamer un impôt préalable qui était déjà déductible à l'origine n'est pas, en soi, le fait générateur du dégrèvement ultérieur de l'art. 32.

**Correction requise :** indiquer clairement que la machine était initialement affectée exclusivement à une activité ne donnant pas droit à déduction (par exemple une activité exclue sans option), que l'IP de CHF 5'000 n'a donc légalement pas été déduit, puis qu'après trois années écoulées la machine est durablement affectée à une activité entrepreneuriale imposable ouvrant le droit à déduction. Dans cette hypothèse, 2/5 restent dégrevables au ch. 410.

Le relevé détaillé associé au ch. 410 doit être préparé et, selon les instructions AFC actuelles, téléversé dans le décompte en ligne.

## L — Fondation Atelier Ouvert — don / ch. 910

**Statut : ✅ vert.**

L'art. 18, al. 2, let. d, LTVA classe les dons parmi les éléments qui ne font pas partie de la contre-prestation. L'art. 33, al. 1, prévoit qu'en dehors des éléments visés à l'al. 2, ces montants ne provoquent pas une réduction de l'IP. Le prototype affecte les dons au ch. 910.

Le cas précise « don privé sans contre-prestation » et lie l'IP de CHF 2'500 aux ventes imposables. Le traitement ch. 910 sans ch. 420 est cohérent dans ces hypothèses.

**Action :** aucune correction fiscale nécessaire. Maintenir la vigilance sur les situations où le versement rémunère en réalité une prestation (par ex. promotion/publicité individualisée).

---

## Contrôle arithmétique indépendant

| Cas | ch. 299 | ch. 399 | ch. 479 | ch. 500 | ch. 510 |
|---|---:|---:|---:|---:|---:|
| A | 100'000 | 8'100 | 3'240 | 4'860 | 0 |
| B | 100'000 | 4'800 | 5'000 | 0 | 200 |
| C | 265'000 | 12'900 | 7'200 | 5'700 | 0 |
| D | 110'000 | 8'910 | 2'000 | 6'910 | 0 |
| E | 160'000 | 12'960 | 9'000 | 3'960 | 0 |
| F | 50'000 | 4'050 | 6'500 | 0 | 2'450 |
| G | 80'000 | 8'100 | 6'120 | 1'980 | 0 |
| H | 70'000 | 5'670 | 4'800 | 870 | 0 |
| I | 200'000 | 16'200 | 12'000 | 4'200 | 0 |
| J | 150'000 | 12'150 | 9'000 | 3'150 | 0 |
| K | 100'000 | 8'100 | 6'000 | 2'100 | 0 |
| L | 50'000 | 4'050 | 2'500 | 1'550 | 0 |

## Audit de la structure du formulaire

Le modèle actuel reproduit correctement les relations principales du prototype AFC dans son périmètre : ch. 205 est inclus dans ch. 200; ch. 220/221/225/230/235/280 alimentent ch. 289; ch. 383 entre dans ch. 399; ch. 410 augmente l'IP net alors que ch. 415 et 420 le diminuent; ch. 900 et 910 sont des mouvements de fonds séparés du ch. 200 dans les cas concernés.

Le simulateur utilise exclusivement les taux actuels 8,1 / 2,6 / 3,8 et indique qu'il ne simule pas les anciens taux : dans ce périmètre, le contrôle pédagogique `ch. 379 = ch. 299` est cohérent.

## Corrections avant toute extension du parcours

1. **B** — inscrire explicitement les mesures organisationnelles appropriées pour distinguer vente à emporter et restauration.
2. **E** — préciser que les montants ch. 400/405 sont enregistrés avant la correction de double affectation du scénario.
3. **G** — rendre visible la décomposition du ch. 400 : autre IP courant + impôt sur les acquisitions déductible.
4. **H** — qualification expresse de la subvention par la collectivité publique + absence de contre-prestation individualisable.
5. **I** — préciser usage commercial/non résidentiel et exercice valable de l'option.
6. **J** — expliciter le déclencheur de l'art. 38 retenu et l'assujettissement de l'acquéreur.
7. **K** — préciser l'absence initiale de droit à déduction puis le changement d'affectation donnant droit; ne jamais enseigner « IP oubliée = ch. 410 ».
8. Mettre à jour la date de revue des sources seulement après intégration et nouveau contrôle.

## Conclusion

Le socle actuel est fiscalement nettement plus solide qu'une simple démonstration. Le principal risque n'est pas une mauvaise arithmétique mais une **hypothèse implicite qui pourrait être interprétée comme une règle générale**. Les corrections ci-dessus doivent donc être intégrées avant d'ajouter de nouveaux cas.

Après ces corrections, l'étape suivante pourra être la restructuration technique (séparation données/logique/interface), la création d'un mémo professionnel méthode effective, puis seulement l'extension progressive vers des cas supplémentaires dont chaque règle aura une source AFC/Fedlex identifiable.