// Audited source of truth — méthode effective
// Fiscal review: 17.08.2026

export const RATES = { ch303: 0.081, ch313: 0.026, ch343: 0.038 };

export const SOURCE_LIBRARY = {
  law: { label: 'LTVA — Fedlex', url: 'https://www.fedlex.admin.ch/eli/cc/2009/615/fr' },
  ordinance: { label: 'OTVA — Fedlex', url: 'https://www.fedlex.admin.ch/eli/cc/2009/828/fr' },
  form: { label: 'Prototype AFC — méthode effective', url: 'https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf' },
  rates: { label: 'AFC — taux TVA', url: 'https://www.estv.admin.ch/fr/taux-de-la-tva-suisse' },
  acquisitions: { label: 'AFC — impôt sur les acquisitions', url: 'https://www.estv.admin.ch/fr/impot-sur-les-acquisitions-tva' },
  transfer: { label: 'AFC — formulaire 764 / procédure de déclaration', url: 'https://www.estv.admin.ch/fr/newnsb/Os-oY1FEYEzWtOce1tKdC' },
  online: { label: 'AFC — décompter la TVA en ligne', url: 'https://www.estv.admin.ch/fr/decompter-la-tva-en-ligne' },
  control: { label: 'AFC — déroulement d’un contrôle TVA', url: 'https://www.estv.admin.ch/fr/deroulement-dun-controle-tva' }
};

export const FIELD_META = {
  ch200: { code: '200', label: 'Total des contre-prestations convenues ou reçues', sub: 'Y compris les prestations imposées par option, les transferts par procédure de déclaration, les prestations à l’étranger et le chiffre d’affaires mondial.' },
  ch205: { code: '205', label: 'Part du ch. 200 provenant de prestations exclues mais imposées par option', sub: 'Information comprise dans le ch. 200. Elle ne s’ajoute pas une seconde fois et n’est pas une déduction.' },
  ch220: { code: '220', label: 'Prestations exonérées', sub: 'Notamment exportations et autres prestations exonérées selon l’art. 23 LTVA.', sign: '+' },
  ch221: { code: '221', label: 'Prestations fournies à l’étranger', sub: 'Lieu de la prestation situé à l’étranger.', sign: '+' },
  ch225: { code: '225', label: 'Transferts avec la procédure de déclaration', sub: 'Art. 38 LTVA; le formulaire 764 doit être complété et téléversé dans le décompte TVA en ligne.', sign: '+', attachment: true },
  ch230: { code: '230', label: 'Prestations exclues fournies en Suisse sans option', sub: 'Prestations exclues selon l’art. 21 LTVA, sans option selon l’art. 22.', sign: '+' },
  ch235: { code: '235', label: 'Diminutions de la contre-prestation', sub: 'Rabais, escomptes, retours, pertes sur débiteurs et corrections comparables.', sign: '+' },
  ch280: { code: '280', label: 'Divers', sub: 'Autres déductions admises, par exemple la valeur du terrain lorsque les conditions sont remplies.', sign: '+' },
  ch303: { code: '303', label: 'Prestations soumises au taux normal', sub: 'Base imposable au taux de 8,1 %.' },
  ch313: { code: '313', label: 'Prestations soumises au taux réduit', sub: 'Base imposable au taux de 2,6 %.' },
  ch343: { code: '343', label: 'Prestations soumises au taux spécial pour l’hébergement', sub: 'Base imposable au taux de 3,8 %.' },
  ch383base: { code: '383', label: 'Impôt sur les acquisitions — contre-prestation', sub: 'Saisir la contre-prestation nette dans la colonne de base.' },
  ch383tax: { code: '383', label: 'Impôt sur les acquisitions — impôt', sub: 'Montant d’impôt dû; il entre dans le total ch. 399.' },
  ch400: { code: '400', label: 'Impôt préalable grevant les coûts en matériel et prestations de services', sub: 'Impôt préalable déductible, sous réserve des conditions et corrections applicables.' },
  ch405: { code: '405', label: 'Impôt préalable grevant les investissements et autres charges d’exploitation', sub: 'Classement par nature de la dépense; ce chiffre n’est pas une correction négative.', sign: '+' },
  ch410: { code: '410', label: 'Dégrèvement ultérieur de l’impôt préalable', sub: 'Montant positif; le relevé détaillé requis doit être téléversé dans le décompte TVA en ligne.', sign: '+', attachment: true },
  ch415: { code: '415', label: 'Corrections de l’impôt préalable', sub: 'Saisir une valeur positive; le formulaire applique le signe moins.', sign: '−' },
  ch420: { code: '420', label: 'Réduction de la déduction de l’impôt préalable', sub: 'Saisir une valeur positive; réduction selon une méthode appropriée et documentée.', sign: '−' },
  ch900: { code: '900', label: 'Subventions, taxes touristiques et contributions visées à l’art. 18, al. 2, let. a à c, LTVA', sub: 'Le prototype AFC vise notamment les subventions, taxes touristiques et certaines contributions versées aux établissements chargés de l’élimination des déchets et de l’approvisionnement en eau.' },
  ch910: { code: '910', label: 'Dons, dividendes, dédommagements, etc.', sub: 'Autres mouvements de fonds selon l’art. 18, al. 2, let. d à l, LTVA.' }
};

export const CASES = [
  {
    id: 'A', tab: 'Base 8,1 %', title: 'Alpina Conseil Sàrl — premier décompte', meta: 'Conseil · Lausanne · T1 2026', level: 'Débutant', group: 'Fondamentaux',
    task: 'Saisissez le chiffre d’affaires imposable et l’impôt préalable sur les achats courants.',
    info: 'Un cas simple permet de comprendre la chaîne <strong>200 → 299 → 303 → 399</strong>, puis la déduction du ch. 400 et le solde au ch. 500.',
    facts: [['Honoraires de conseil', 100000, '8,1 %'], ['TVA sur achats professionnels courants', 3240, 'IP']],
    legal: 'Art. 18, 25 et 28 ss LTVA.', sourceKeys: ['law', 'form', 'rates'],
    qualification: { question: 'Quelle est la qualification principale du chiffre d’affaires ?', options: ['Prestation imposable au taux normal', 'Prestation exclue sans option', 'Exportation exonérée', 'Prestation au taux réduit'], correct: 0, explain: 'Les honoraires de conseil suisses du cas sont imposables au taux normal.' },
    checks: ['Le total du ch. 303 doit correspondre au ch. 299.', 'Le ch. 400 contient un montant de TVA, pas la base HT.'],
    fields: ['ch200', 'ch303', 'ch400'], expected: { ch200: 100000, ch303: 100000, ch400: 3240 },
    explain: { ch200: 'Le ch. 200 reprend les contre-prestations hors TVA: CHF 100’000.', ch303: 'Toute la base est imposable au taux normal: CHF 100’000 × 8,1 % = CHF 8’100.', ch400: 'La TVA déductible sur les achats courants est portée au ch. 400: CHF 3’240.' }
  },
  {
    id: 'B', tab: 'Deux taux', title: 'Boulangerie du Lac — sur place et à emporter', meta: 'Restauration · Vevey · T2 2026', level: 'Débutant +', group: 'Fondamentaux',
    task: 'Ventilez les ventes entre le taux normal et le taux réduit, puis saisissez l’impôt préalable.',
    info: 'Dans les hypothèses du cas, des <strong>mesures organisationnelles appropriées</strong> permettent de distinguer les prestations de restauration des denrées destinées à être emportées. Les repas servis sur place sont à <strong>8,1 %</strong> et les denrées alimentaires admissibles à emporter à <strong>2,6 %</strong>.',
    facts: [['Repas servis sur place', 40000, '8,1 %'], ['Denrées alimentaires admissibles à emporter, sans alcool; mesures organisationnelles appropriées et enregistrement séparé', 60000, '2,6 %'], ['Impôt préalable déductible', 5000, 'IP']],
    legal: 'Art. 25, notamment al. 3, LTVA; pratique sectorielle AFC.', sourceKeys: ['law', 'form', 'rates'],
    qualification: { question: 'Quel traitement correspond aux ventes du cas ?', options: ['Toutes les ventes à 8,1 %', 'Deux bases distinctes à 8,1 % et 2,6 %', 'Toutes les ventes à 2,6 %', 'Taux spécial de 3,8 %'], correct: 1, explain: 'Les faits du cas permettent de distinguer la restauration à 8,1 % des denrées admissibles à emporter à 2,6 %.' },
    checks: ['Ch. 303 + ch. 313 = ch. 299.', 'Le taux spécial de 3,8 % ne s’applique pas aux prestations de restauration indépendantes.', 'Dans un dossier réel, la séparation doit reposer sur des mesures organisationnelles appropriées et être objectivement démontrable.'],
    fields: ['ch200', 'ch303', 'ch313', 'ch400'], expected: { ch200: 100000, ch303: 40000, ch313: 60000, ch400: 5000 },
    explain: { ch200: 'Le chiffre d’affaires total est CHF 100’000.', ch303: 'Les repas servis sur place sont portés au ch. 303: CHF 40’000.', ch313: 'Les ventes à emporter admissibles sont portées au ch. 313: CHF 60’000.', ch400: 'L’impôt préalable déductible est CHF 5’000.' }
  },
  {
    id: 'C', tab: 'Trois taux', title: 'Hôtel des Cimes — trois taux dans un même établissement', meta: 'Hôtellerie · Valais · T3 2026', level: 'Intermédiaire', group: 'Fondamentaux',
    task: 'Répartissez les nuitées, le restaurant et les produits à emporter entre les trois taux.',
    info: 'Le taux spécial de <strong>3,8 %</strong> vise l’hébergement avec petit-déjeuner lié. Le restaurant indépendant reste au taux normal et les denrées à emporter du cas sont au taux réduit.',
    facts: [['Nuitées avec petit-déjeuner lié à l’hébergement', 180000, '3,8 %'], ['Restaurant avec service', 70000, '8,1 %'], ['Denrées alimentaires admissibles à emporter, sans alcool', 15000, '2,6 %'], ['Impôt préalable déductible', 7200, 'IP']],
    legal: 'Art. 25 LTVA; AFC, taux spécial pour l’hébergement.', sourceKeys: ['law', 'form', 'rates'],
    qualification: { question: 'Combien de taux légaux sont utilisés dans ce cas ?', options: ['Un seul taux', 'Deux taux', 'Trois taux', 'Aucun taux suisse'], correct: 2, explain: 'Le cas combine le taux normal, le taux réduit et le taux spécial pour l’hébergement.' },
    checks: ['303 + 313 + 343 = 299.', 'Le petit-déjeuner lié à la nuitée suit le taux spécial de 3,8 %.', 'Les prestations de restaurant indépendantes restent au taux normal.'],
    fields: ['ch200', 'ch303', 'ch313', 'ch343', 'ch400'], expected: { ch200: 265000, ch303: 70000, ch313: 15000, ch343: 180000, ch400: 7200 },
    explain: { ch200: 'Le total des recettes est CHF 265’000.', ch303: 'Restaurant: CHF 70’000.', ch313: 'Produits à emporter: CHF 15’000.', ch343: 'Hébergement avec petit-déjeuner lié: CHF 180’000.', ch400: 'Impôt préalable: CHF 7’200.' }
  },
  {
    id: 'D', tab: 'Rabais ch. 235', title: 'Nova Services SA — note de crédit après facturation', meta: 'Services · Genève · T4 2026', level: 'Intermédiaire', group: 'Fondamentaux',
    task: 'Déclarez le chiffre d’affaires avant correction, puis la diminution de contre-prestation.',
    info: 'Une diminution de contre-prestation est portée au <strong>ch. 235</strong>. Dans ce cas, la note de crédit est comptabilisée pendant T4 2026.',
    facts: [['Factures émises pendant T4 2026 avant correction', 120000, 'CA'], ['Note de crédit comptabilisée pendant T4 2026', 10000, 'ch. 235'], ['Impôt préalable déductible', 2000, 'IP']],
    legal: 'Art. 41 LTVA; structure du prototype AFC.', sourceKeys: ['law', 'form'],
    qualification: { question: 'Comment traiter la note de crédit du cas ?', options: ['Comme prestation exclue au ch. 230', 'Comme diminution au ch. 235', 'Comme don au ch. 910', 'Comme impôt préalable au ch. 400'], correct: 1, explain: 'La note de crédit réduit la contre-prestation et est déclarée au ch. 235.' },
    checks: ['Ch. 299 = ch. 200 − ch. 289.', 'La note de crédit est au ch. 235, pas au ch. 230.', 'La période dépend du moment de la comptabilisation ou de l’encaissement de la correction.'],
    fields: ['ch200', 'ch235', 'ch303', 'ch400'], expected: { ch200: 120000, ch235: 10000, ch303: 110000, ch400: 2000 },
    explain: { ch200: 'Le ch. 200 reprend CHF 120’000 avant la diminution.', ch235: 'La note de crédit réduit la contre-prestation de CHF 10’000.', ch303: 'La base taxable résiduelle est CHF 110’000.', ch400: 'L’impôt préalable est CHF 2’000.' }
  },
  {
    id: 'E', tab: 'Exclu + ch. 415', title: 'Cabinet Dr Weber — activités mixtes', meta: 'Santé · Zurich · T2 2026', level: 'Intermédiaire +', group: 'Déductions et corrections',
    task: 'Séparez les prestations exclues et imposables, puis corrigez l’impôt préalable sur les coûts communs.',
    info: 'Les prestations exclues sans option sont au <strong>ch. 230</strong>. Dans ce scénario, les montants des ch. 400 et 405 sont présentés <strong>avant</strong> la correction documentée de double affectation portée au ch. 415.',
    facts: [['Recettes totales', 250000, 'CA'], ['Prestations médicales remplissant les conditions d’exclusion', 90000, 'Art. 21'], ['Prestations administratives imposables', 160000, '8,1 %'], ['IP sur coûts communs en matériel et services, avant correction du scénario', 12000, 'ch. 400'], ['IP sur investissements communs et autres charges, avant correction du scénario', 3000, 'ch. 405'], ['Part sans droit à déduction selon la clé appropriée et documentée du cas', 40, '40 %'], ['Correction de double affectation', 6000, 'ch. 415']],
    hiddenOutsideLearn: [6],
    legal: 'Art. 21 et art. 29 à 31 LTVA, notamment art. 30.', sourceKeys: ['law', 'form', 'control'],
    qualification: { question: 'Quel mécanisme corrige la part non déductible des coûts communs dans ce scénario ?', options: ['Réduction au ch. 420', 'Correction au ch. 415', 'Dégrèvement au ch. 410', 'Diminution au ch. 235'], correct: 1, explain: 'La double affectation des coûts communs est corrigée au ch. 415 dans les hypothèses du cas.' },
    checks: ['Les prestations exclues vont au ch. 230.', 'L’IP directement attribuable aux prestations exclues n’est pas revendiqué.', 'Le ch. 405 classe l’IP par nature; il ne remplace pas le ch. 415.', 'Le taux de 40 % est une donnée documentée du cas, pas une règle générale.'],
    fields: ['ch200', 'ch230', 'ch303', 'ch400', 'ch405', 'ch415'], expected: { ch200: 250000, ch230: 90000, ch303: 160000, ch400: 12000, ch405: 3000, ch415: 6000 },
    explain: { ch200: 'Toutes les contre-prestations sont comprises dans CHF 250’000.', ch230: 'Les prestations médicales exclues sont déduites au ch. 230: CHF 90’000.', ch303: 'La base imposable restante est CHF 160’000.', ch400: 'CHF 12’000 d’IP sur coûts communs en matériel et services avant correction du scénario.', ch405: 'CHF 3’000 d’IP sur investissements communs et autres charges avant correction du scénario.', ch415: 'CHF 15’000 × 40 % = CHF 6’000 de correction.' }
  },
  {
    id: 'F', tab: 'Export ch. 220', title: 'Helvetic Machines SA — exportation de biens', meta: 'Industrie · Neuchâtel · T1 2026', level: 'Intermédiaire', group: 'Déductions et corrections',
    task: 'Déclarez le chiffre d’affaires total, l’exportation exonérée et les ventes suisses imposables.',
    info: 'Les exportations et autres prestations exonérées sont portées au <strong>ch. 220</strong>. Elles sont déduites du ch. 200 pour obtenir le ch. 299, avec maintien en principe du droit à l’impôt préalable lorsque les conditions sont remplies.',
    facts: [['Exportations documentées', 100000, 'ch. 220'], ['Ventes en Suisse', 50000, '8,1 %'], ['Impôt préalable déductible', 6500, 'IP']],
    legal: 'Art. 23 et 28 ss LTVA.', sourceKeys: ['law', 'form'],
    qualification: { question: 'Comment qualifier l’exportation documentée ?', options: ['Exclue sans droit à déduction', 'Exonérée avec maintien possible du droit à déduction', 'Fournie à l’étranger au ch. 221 dans tous les cas', 'Imposable au taux réduit'], correct: 1, explain: 'L’exportation documentée est exonérée et se déclare au ch. 220.' },
    checks: ['Une exportation n’est pas une prestation fournie à l’étranger au ch. 221 par défaut.', 'Le droit à l’IP est conservé sous réserve des preuves et conditions.'],
    fields: ['ch200', 'ch220', 'ch303', 'ch400'], expected: { ch200: 150000, ch220: 100000, ch303: 50000, ch400: 6500 },
    explain: { ch200: 'Le chiffre d’affaires mondial du cas est CHF 150’000.', ch220: 'Les exportations documentées sont portées au ch. 220: CHF 100’000.', ch303: 'Les ventes suisses imposables représentent CHF 50’000.', ch400: 'Impôt préalable déductible: CHF 6’500.' }
  },
  {
    id: 'G', tab: 'Étranger + acquisitions', title: 'Digital Romandie Sàrl — client français et fournisseur étranger', meta: 'Services numériques · Vaud · T3 2026', level: 'Avancé', group: 'Déductions et corrections',
    task: 'Traitez la prestation dont le lieu est à l’étranger et l’impôt sur les acquisitions.',
    info: 'La prestation dont le lieu est à l’étranger est déclarée au <strong>ch. 221</strong>. Le conseil acheté à l’étranger est soumis, selon les hypothèses du cas, à l’impôt sur les acquisitions au <strong>ch. 383</strong>. Si l’affectation ouvre le droit à déduction, cet impôt peut simultanément entrer dans l’impôt préalable.',
    facts: [['Honoraires à des clients suisses', 80000, '8,1 %'], ['Service B2B dont le lieu est en France dans le cas', 120000, 'ch. 221'], ['Conseil acquis auprès d’une entreprise étrangère non inscrite au registre suisse', 20000, 'acquisition'], ['Impôt sur les acquisitions au taux normal', 1620, 'ch. 383'], ['Autre IP courant déductible', 3000, 'ch. 400'], ['Impôt sur les acquisitions déductible dans le cas', 1620, 'ch. 400'], ['Total ch. 400', 4620, 'IP'], ['IP sur investissement', 1500, 'ch. 405']],
    hiddenOutsideLearn: [3, 5, 6],
    legal: 'Art. 8, 45 ss et 28 ss LTVA.', sourceKeys: ['law', 'form', 'acquisitions', 'rates'],
    qualification: { question: 'Quel traitement principal s’applique au conseil acheté à l’étranger ?', options: ['Il augmente le ch. 200', 'Il est déclaré au ch. 383 comme acquisition', 'Il est déclaré comme don au ch. 910', 'Il est toujours sans TVA en Suisse'], correct: 1, explain: 'Le conseil acheté relève de l’impôt sur les acquisitions selon les hypothèses du cas.' },
    checks: ['Le service au client français du cas va au ch. 221.', 'Au ch. 383, la base et l’impôt doivent être renseignés.', 'La déduction simultanée de l’impôt sur les acquisitions dépend de l’affectation ouvrant le droit à déduction.', 'Dans ce cas, ch. 400 = CHF 3’000 d’autre IP courant + CHF 1’620 d’impôt sur les acquisitions déductible.'],
    fields: ['ch200', 'ch221', 'ch303', 'ch383base', 'ch383tax', 'ch400', 'ch405'], expected: { ch200: 200000, ch221: 120000, ch303: 80000, ch383base: 20000, ch383tax: 1620, ch400: 4620, ch405: 1500 },
    explain: { ch200: 'Le chiffre d’affaires total est CHF 200’000.', ch221: 'La prestation dont le lieu est à l’étranger est portée au ch. 221: CHF 120’000.', ch303: 'La base suisse imposable est CHF 80’000.', ch383base: 'La base de l’acquisition est CHF 20’000.', ch383tax: 'CHF 20’000 × 8,1 % = CHF 1’620 d’impôt sur les acquisitions.', ch400: 'Dans ce dossier: CHF 3’000 d’autre IP courant + CHF 1’620 d’impôt sur les acquisitions déductible = CHF 4’620.', ch405: 'IP sur investissement: CHF 1’500.' }
  },
  {
    id: 'H', tab: 'Subvention ch. 900', title: 'CultureLab — subvention et prestations commerciales', meta: 'Association · Fribourg · T3 2026', level: 'Avancé', group: 'Déductions et corrections',
    task: 'Analysez la contribution communale, puis traitez son effet sur le chiffre d’affaires et l’impôt préalable.',
    info: 'Dans ce cas, la décision communale qualifie expressément les CHF 30’000 de <strong>subvention / contribution de droit public</strong>. Le montant est déclaré au ch. 900 et entraîne, selon la clé appropriée et documentée du dossier, une réduction de l’impôt préalable au ch. 420.',
    facts: [['Prestations commerciales', 70000, '8,1 %'], ['Décision communale qualifiant expressément le versement de subvention / contribution de droit public; aucune contre-prestation individualisable n’est fournie en échange dans les hypothèses du cas', 30000, 'ch. 900'], ['Impôt préalable commun avant réduction', 6000, 'ch. 400'], ['Part financée selon la clé appropriée et documentée du cas', 20, '20 %'], ['Réduction', 1200, 'ch. 420']],
    hiddenOutsideLearn: [4],
    legal: 'Art. 18, al. 2, let. a à c, al. 3, et art. 33, al. 2, LTVA.', sourceKeys: ['law', 'form', 'control'],
    qualification: { question: 'La subvention qualifiée dans les données du cas doit-elle être incluse au ch. 200 ?', options: ['Oui, toujours', 'Non; elle est déclarée séparément au ch. 900', 'Oui, mais au taux de 2,6 %', 'Non; elle est portée au ch. 910'], correct: 1, explain: 'La contribution est expressément qualifiée comme subvention / contribution de droit public dans le dossier et est déclarée au ch. 900.' },
    checks: ['La subvention du cas n’est pas ajoutée au ch. 200.', 'Le ch. 420 réduit l’IP selon la clé appropriée et documentée.', 'Le taux de 20 % est propre au cas.', 'Un paiement public rémunérant une prestation ou un sponsoring avec contre-prestation publicitaire exige une autre analyse.'],
    fields: ['ch200', 'ch303', 'ch400', 'ch420', 'ch900'], expected: { ch200: 70000, ch303: 70000, ch400: 6000, ch420: 1200, ch900: 30000 },
    explain: { ch200: 'Les prestations commerciales constituent CHF 70’000 de contre-prestations.', ch303: 'Ces prestations sont imposables au taux normal.', ch400: 'L’IP commun avant réduction est CHF 6’000.', ch420: 'CHF 6’000 × 20 % = CHF 1’200 selon la clé donnée du cas.', ch900: 'La subvention de CHF 30’000 est déclarée séparément.' }
  },
  {
    id: 'I', tab: 'Option ch. 205', title: 'ImmoPro SA — location commerciale imposée par option', meta: 'Immobilier · Bâle · T4 2026', level: 'Avancé', group: 'Situations particulières',
    task: 'Montrez correctement la part du chiffre d’affaires imposée par option sans la compter deux fois.',
    info: 'Le <strong>ch. 205 est une information comprise dans le ch. 200</strong>. Dans ce cas, les locaux sont utilisés à des fins commerciales, non exclusivement à des fins d’habitation, et l’option est supposée valablement exercée.',
    facts: [['Honoraires de gestion imposables', 150000, '8,1 %'], ['Location de locaux commerciaux à un destinataire les utilisant à des fins commerciales; option valablement exercée dans les hypothèses du cas', 50000, 'ch. 205'], ['IP sur coûts courants', 10000, 'ch. 400'], ['IP sur investissements', 2000, 'ch. 405']],
    legal: 'Art. 21 et 22 LTVA; conditions de l’option à vérifier.', sourceKeys: ['law', 'form'],
    qualification: { question: 'Quelle relation existe entre les ch. 200 et 205 ?', options: ['Le ch. 205 s’ajoute au ch. 200', 'Le ch. 205 est compris dans le ch. 200', 'Le ch. 205 est déduit du ch. 200', 'Les deux chiffres sont indépendants'], correct: 1, explain: 'Le ch. 205 informe sur une part déjà comprise dans le ch. 200.' },
    checks: ['Ch. 205 ≤ ch. 200.', 'La base ch. 303 reste CHF 200’000.', 'Ne pas calculer ch. 299 comme 200 + 205.', 'Pour l’immobilier, vérifier notamment l’affectation du destinataire et les conditions de l’art. 22 LTVA.'],
    fields: ['ch200', 'ch205', 'ch303', 'ch400', 'ch405'], expected: { ch200: 200000, ch205: 50000, ch303: 200000, ch400: 10000, ch405: 2000 },
    explain: { ch200: 'Les contre-prestations totales sont CHF 200’000, location avec option incluse.', ch205: 'CHF 50’000 représentent la part du ch. 200 imposée par option.', ch303: 'La base imposable est CHF 200’000.', ch400: 'IP sur coûts courants: CHF 10’000.', ch405: 'IP sur investissements: CHF 2’000.' }
  },
  {
    id: 'J', tab: 'Procédure ch. 225', title: 'Transmission PME SA — transfert par procédure de déclaration', meta: 'Restructuration · Berne · T2 2026', level: 'Avancé', group: 'Situations particulières',
    task: 'Déterminez le traitement du transfert lorsque les conditions de l’art. 38 LTVA sont supposées remplies, puis déclarez le chiffre d’affaires ordinaire.',
    info: 'Dans ce dossier, l’acquéreur est assujetti et les autres conditions de l’art. 38 LTVA sont supposées remplies. L’impôt théorique sur CHF 250’000 au taux normal dépasserait CHF 10’000. Le transfert est inclus au ch. 200, puis déduit au <strong>ch. 225</strong>.',
    facts: [['Total des contre-prestations', 400000, 'ch. 200'], ['Cession du fonds de commerce répondant aux conditions de l’art. 38 LTVA; acquéreur assujetti dans le scénario', 250000, 'ch. 225'], ['Impôt théorique à 8,1 % sur la valeur transférée: CHF 20’250 > CHF 10’000', 20250, 'contrôle art. 38'], ['Prestations ordinaires imposables', 150000, '8,1 %'], ['IP sur coûts courants', 7000, 'ch. 400'], ['IP sur investissements', 2000, 'ch. 405']],
    legal: 'Art. 38 LTVA; formulaire AFC n° 764.', sourceKeys: ['law', 'form', 'transfer', 'online'],
    qualification: { question: 'Où déclarer le transfert soumis à la procédure de déclaration ?', options: ['Uniquement au ch. 225', 'Au ch. 200 puis au ch. 225', 'Au ch. 230', 'Au ch. 910'], correct: 1, explain: 'Le transfert est compris dans le total du ch. 200, puis déduit au ch. 225.' },
    checks: ['Ch. 225 est distinct du ch. 230.', 'Les conditions de l’art. 38 doivent être examinées dans chaque dossier.', 'Le formulaire 764 actuel doit être utilisé et téléversé directement dans le décompte en ligne.', 'Depuis le 17.11.2025, les signatures ne sont plus nécessaires en cas d’application obligatoire; elles restent requises pour l’application facultative.'],
    fields: ['ch200', 'ch225', 'ch303', 'ch400', 'ch405'], expected: { ch200: 400000, ch225: 250000, ch303: 150000, ch400: 7000, ch405: 2000 },
    explain: { ch200: 'Le total déclaré est CHF 400’000.', ch225: 'La cession est portée au ch. 225 pour CHF 250’000.', ch303: 'La base ordinaire imposable restante est CHF 150’000.', ch400: 'IP sur coûts courants: CHF 7’000.', ch405: 'IP sur investissements: CHF 2’000.' }
  },
  {
    id: 'K', tab: 'Dégrèvement ch. 410', title: 'Atelier Horizon — changement d’affectation favorable', meta: 'Artisanat · Jura · T4 2026', level: 'Avancé', group: 'Situations particulières',
    task: 'Calculez le dégrèvement ultérieur lié au changement d’affectation de la machine et reportez-le dans le décompte.',
    info: 'La machine était initialement affectée exclusivement à une activité ne donnant pas droit à déduction; l’IP de CHF 5’000 n’a donc <strong>légalement pas été déduit à l’origine</strong>. Après trois années écoulées, son affectation change durablement en faveur d’une activité entrepreneuriale imposable ouvrant le droit à déduction. La valeur résiduelle TVA est alors de 2/5.',
    facts: [['Prestations imposables', 100000, '8,1 %'], ['IP sur coûts courants', 3000, 'ch. 400'], ['IP sur investissements de la période', 1000, 'ch. 405'], ['TVA sur la machine non déductible à l’origine en raison de son affectation initiale', 5000, 'calcul'], ['Après trois années écoulées, changement d’affectation durable vers une activité ouvrant le droit à déduction', 2000, 'ch. 410']],
    hiddenOutsideLearn: [4],
    legal: 'Art. 32, al. 1 et 2, LTVA; relevé détaillé au ch. 410.', sourceKeys: ['law', 'form', 'online'],
    qualification: { question: 'Pourquoi le ch. 410 est-il applicable dans ce cas ?', options: ['Parce qu’une déduction disponible à l’origine a simplement été oubliée', 'Parce que les conditions de déduction n’étaient pas remplies à l’origine et le deviennent après le changement d’affectation', 'Parce que le chiffre d’affaires a augmenté', 'Parce que toute machine de plus de trois ans donne droit à un crédit'], correct: 1, explain: 'Le dégrèvement ultérieur suppose ici que le droit à déduction n’existait pas à l’origine et apparaît ensuite du fait du changement d’affectation.' },
    checks: ['Ch. 410 est additionné dans le calcul du ch. 479.', 'Pour un bien mobilier, la réduction est d’un cinquième par année écoulée.', 'Après trois années écoulées, il reste 2/5 dans les hypothèses du cas.', 'Le dégrèvement ultérieur ne doit pas être confondu avec la simple correction d’une déduction oubliée alors que le droit existait déjà.', 'Le relevé détaillé requis doit être téléversé directement dans le décompte en ligne.'],
    fields: ['ch200', 'ch303', 'ch400', 'ch405', 'ch410'], expected: { ch200: 100000, ch303: 100000, ch400: 3000, ch405: 1000, ch410: 2000 },
    explain: { ch200: 'Chiffre d’affaires: CHF 100’000.', ch303: 'Base imposable: CHF 100’000.', ch400: 'IP sur coûts: CHF 3’000.', ch405: 'IP sur investissements: CHF 1’000.', ch410: 'CHF 5’000 × 2/5 = CHF 2’000 de dégrèvement ultérieur dans les hypothèses du cas.' }
  },
  {
    id: 'L', tab: 'Don ch. 910', title: 'Fondation Atelier Ouvert — don sans prestation', meta: 'Fondation · Suisse romande · T1 2026', level: 'Intermédiaire +', group: 'Situations particulières',
    task: 'Distinguez un don sans contre-prestation d’une subvention et du chiffre d’affaires.',
    info: 'Le don est déclaré au <strong>ch. 910</strong>. Il n’est pas ajouté au ch. 200 et ne provoque pas, à lui seul, une réduction au ch. 420.',
    facts: [['Vente d’objets artisanaux', 50000, '8,1 %'], ['Don privé sans contre-prestation', 20000, 'ch. 910'], ['Impôt préalable lié aux ventes imposables', 2500, 'ch. 400']],
    legal: 'Art. 18, al. 2, let. d, art. 28 et art. 33, al. 1, LTVA.', sourceKeys: ['law', 'form'],
    qualification: { question: 'Où déclarer le don privé sans contre-prestation ?', options: ['Au ch. 200', 'Au ch. 900', 'Au ch. 910', 'Au ch. 420'], correct: 2, explain: 'Le don sans contre-prestation est déclaré au ch. 910 dans ce cas.' },
    checks: ['Ne pas confondre ch. 900 et ch. 910.', 'Le don n’entraîne pas en lui-même de réduction ch. 420.', 'Le droit à déduction doit néanmoins être établi selon l’affectation.'],
    fields: ['ch200', 'ch303', 'ch400', 'ch910'], expected: { ch200: 50000, ch303: 50000, ch400: 2500, ch910: 20000 },
    explain: { ch200: 'La vente d’objets constitue CHF 50’000 de contre-prestations.', ch303: 'Les ventes sont imposables au taux normal.', ch400: 'CHF 2’500 d’IP sont déductibles selon les données du cas.', ch910: 'Le don privé est porté au ch. 910: CHF 20’000.' }
  }
];
