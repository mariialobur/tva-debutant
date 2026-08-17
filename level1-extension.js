// TVA suisse — méthode effective · Niveau 1
// Extension structurée 12 → 18 cas, revue le 17.08.2026.
// Les taux/cours chiffrés propres aux scénarios sont des données pédagogiques du dossier;
// les sources officielles en vigueur restent déterminantes pour un dossier réel.

import { CASES, SOURCE_LIBRARY } from './data.js';
import { QUESTION_BANK } from './evaluation-data.js';

Object.assign(SOURCE_LIBRARY, {
  timing: { label: 'LTVA — art. 39–40 (mode et naissance de la créance)', url: 'https://www.fedlex.admin.ch/eli/cc/2009/615/fr' },
  imports: { label: 'AFC — TVA: importations et acquisitions', url: 'https://www.estv.admin.ch/fr/taxe-sur-la-valeur-ajoutee' },
  dte: { label: 'AFC — décisions de taxation électroniques (DTe)', url: 'https://www.estv.admin.ch/fr/decisions-de-taxation-electroniques-de-la-douane' },
  fx: { label: 'AFC — cours de change de monnaies étrangères pour la TVA', url: 'https://www.estv.admin.ch/fr/tva-cours-de-change-de-monnaies-etrangeres' },
  vehicle: { label: 'AFC — part privée véhicule de service', url: 'https://www.estv.admin.ch/fr/communications-concernant-la-tva' },
  rectification: { label: 'AFC — décompte de rectification TVA', url: 'https://www.estv.admin.ch/fr/tva-decompte-de-rectification' },
  annual: { label: 'AFC — décompte annuel', url: 'https://www.estv.admin.ch/fr/tva-decompte-annuel-2025' }
});

const EXTRA_CASES = [
  {
    id:'M', tab:'Convenues / reçues', title:'Atelier Jura Sàrl — facturation, encaissement et acompte', meta:'Services · Jura · T2 2026', level:'Intermédiaire +', group:'Période et mode de décompte',
    task:'Déterminez quelles contre-prestations et quel impôt préalable appartiennent à T2 lorsque l’entreprise décompte selon les contre-prestations convenues.',
    info:'Atelier Jura établit ses décomptes selon les <strong>contre-prestations convenues</strong>. Une facture client émise en juin appartient donc à T2 même si elle est encaissée en juillet. Un paiement anticipé encaissé en juin pour une prestation imposable non exonérée fait également naître la dette fiscale en juin. Pour l’impôt préalable, le droit naît, dans ce mode, à la réception de la facture fournisseur sous réserve des autres conditions.',
    facts:[
      ['Facture client émise le 18.06, prestation imposable; paiement reçu le 15.07',60000,'T2 — facturation'],
      ['Acompte encaissé le 25.06 pour une future prestation imposable non exonérée',20000,'T2 — paiement anticipé'],
      ['Facture fournisseur reçue le 28.06: TVA déductible; paiement le 10.07',2430,'ch. 400']
    ],
    legal:'Art. 39 et 40 LTVA; distinction contre-prestations convenues / reçues et paiements anticipés.', sourceKeys:['timing','control','form'],
    qualification:{question:'Quel chiffre d’affaires du cas appartient à T2 selon le mode des contre-prestations convenues ?',options:['CHF 80’000','CHF 60’000 seulement','CHF 20’000 seulement','CHF 0 jusqu’aux encaissements de juillet'],correct:0,explain:'La facture de juin et l’acompte encaissé en juin appartiennent tous deux à T2 selon les faits du cas.'},
    checks:['Ne pas déplacer la facture de juin en T3 au seul motif qu’elle est payée en juillet.', 'Un paiement anticipé imposable peut déclencher la dette fiscale avant la facture finale.', 'Sous les contre-prestations convenues, le droit à l’IP naît en principe à la réception de la facture fournisseur.', 'Le mode de décompte doit être identifié avant de rapprocher factures et encaissements.'],
    fields:['ch200','ch303','ch400'],
    expected:{ch200:80000,ch303:80000,ch400:2430},
    explain:{ch200:'T2 comprend CHF 60’000 facturés en juin + CHF 20’000 d’acompte encaissé en juin = CHF 80’000.',ch303:'Toute la base du scénario est imposable au taux normal: CHF 80’000.',ch400:'La facture fournisseur reçue en juin ouvre, dans les hypothèses du cas, un droit à déduction de CHF 2’430 en T2.'}
  },
  {
    id:'N', tab:'Importation + DTe', title:'MecaSwiss SA — machine importée et preuve douanière', meta:'Industrie · Neuchâtel · T3 2026', level:'Intermédiaire +', group:'Importation de biens',
    task:'Traitez une importation de biens sans la confondre avec l’impôt sur les acquisitions de services étrangers.',
    info:'Une <strong>importation de biens</strong> relève de la TVA à l’importation. Dans le dossier, la machine est utilisée exclusivement pour une activité entrepreneuriale imposable; l’entreprise dispose de la décision de taxation électronique et a acquitté l’impôt sur les importations. La TVA à l’importation déductible est classée ici au ch. 405 comme impôt préalable sur investissement. Elle ne va pas au ch. 383.',
    facts:[
      ['Ventes suisses imposables',120000,'8,1 %'],
      ['Machine importée d’Allemagne',50000,'bien importé — pas ch. 383'],
      ['TVA à l’importation selon DTe, acquittée et déductible dans le scénario',4050,'ch. 405']
    ],
    legal:'Art. 28 et 50 ss LTVA; TVA à l’importation distincte de l’impôt sur les acquisitions; DTe comme justificatif.', sourceKeys:['law','imports','dte','form'],
    qualification:{question:'Où déclarer la TVA à l’importation de CHF 4’050 dans ce scénario ?',options:['Comme impôt préalable au ch. 405','Au ch. 383 comme impôt sur les acquisitions','Au ch. 220 comme exportation','Au ch. 900'],correct:0,explain:'La machine est un bien importé. La DTe justifie, sous les conditions du cas, la déduction de la TVA à l’importation comme impôt préalable.'},
    checks:['Bien importé ≠ prestation de services étrangère soumise automatiquement au ch. 383.', 'La DTe constitue une pièce justificative centrale pour la déduction de l’impôt préalable à l’importation.', 'Le droit à déduction suppose notamment l’affectation entrepreneuriale ouvrant le droit à déduction.', 'Le classement ch. 405 est retenu ici parce que la machine est un investissement.'],
    fields:['ch200','ch303','ch405'],
    expected:{ch200:120000,ch303:120000,ch405:4050},
    explain:{ch200:'Les ventes propres en Suisse représentent CHF 120’000.',ch303:'La base imposable au taux normal est CHF 120’000.',ch405:'La TVA à l’importation de CHF 4’050, justifiée par la DTe et déductible dans le cas, est classée parmi l’IP sur investissement.'}
  },
  {
    id:'O', tab:'Monnaie étrangère', title:'Studio Léman Sàrl — facture en EUR et cours TVA', meta:'Design B2B · Vaud · T2 2026', level:'Intermédiaire +', group:'Monnaies étrangères',
    task:'Convertissez une contre-prestation en EUR en CHF selon la méthode de change choisie pour la période fiscale.',
    info:'Studio Léman a choisi d’utiliser le <strong>cours mensuel moyen</strong> pour la TVA et conserve cette méthode pendant toute la période fiscale. Pour les besoins de l’exercice, l’extrait de cours joint au dossier donne <strong>1 EUR = CHF 0,9500</strong> pour la facture concernée. Cette valeur est une donnée pédagogique du scénario; dans un dossier réel, utiliser le cours AFC applicable.',
    facts:[
      ['Facture imposable en Suisse',50000,'EUR'],
      ['Cours TVA fourni dans le dossier',0.95,'CHF / EUR'],
      ['Base convertie: EUR 50’000 × 0,9500',47500,'CHF'],
      ['Autre impôt préalable déductible',2000,'ch. 400']
    ],
    hiddenOutsideLearn:[2],
    legal:'Art. 45 OTVA; cours du jour ou cours mensuel moyen selon la méthode choisie, appliquée de manière cohérente pendant la période fiscale.', sourceKeys:['ordinance','fx','form'],
    qualification:{question:'L’entreprise peut-elle passer au cours du jour uniquement pour une transaction parce qu’il lui est plus favorable ?',options:['Non; la méthode choisie doit être maintenue pendant au moins une période fiscale','Oui, librement pour chaque facture','Oui, uniquement si la facture dépasse CHF 10’000','Oui, mais seulement au taux réduit'],correct:0,explain:'L’AFC autorise le cours mensuel moyen ou le cours du jour, mais la méthode choisie doit être conservée pendant au moins une période fiscale.'},
    checks:['La base TVA doit être exprimée en CHF.', 'Le cours du scénario est fourni comme donnée pédagogique; ne pas le réutiliser pour un dossier réel.', 'Une méthode de conversion choisie ne se change pas transaction par transaction.', 'Le même principe de méthode vaut pour l’impôt grevant les opérations, l’impôt sur les acquisitions et l’IP déductible.'],
    fields:['ch200','ch303','ch400'],
    expected:{ch200:47500,ch303:47500,ch400:2000},
    explain:{ch200:'EUR 50’000 × CHF 0,9500 = CHF 47’500 de contre-prestation.',ch303:'La base imposable au taux normal est CHF 47’500.',ch400:'L’autre impôt préalable déductible du dossier est CHF 2’000.'}
  },
  {
    id:'P', tab:'Part privée véhicule', title:'Bureau Léman SA — utilisation privée d’un véhicule de service', meta:'Conseil · Lausanne · T2 2026', level:'Avancé', group:'Parts privées',
    task:'Intégrez la part privée du véhicule dans le chiffre d’affaires imposable sans la traiter comme une correction d’impôt préalable.',
    info:'L’entreprise met un véhicule de service à disposition d’un collaborateur avec usage privé. Pour le cas, le calcul forfaitaire applicable a déjà été documenté à partir d’un prix d’acquisition hors TVA de CHF 50’000: <strong>0,9 % par mois × 3 mois = CHF 1’350</strong> de base imposable pour T2. L’exercice porte sur son report au décompte, pas sur les variantes particulières du calcul automobile.',
    facts:[
      ['Prestations de conseil imposables',90000,'8,1 %'],
      ['Prix d’acquisition du véhicule hors TVA',50000,'base du calcul forfaitaire'],
      ['Part privée T2 selon calcul documenté: 0,9 % × 3 mois',1350,'8,1 %'],
      ['Impôt préalable courant déductible',3000,'ch. 400']
    ],
    hiddenOutsideLearn:[2],
    legal:'Pratique AFC relative à la part privée des véhicules de service; contrôle TVA des parts privées.', sourceKeys:['vehicle','control','rates','form'],
    qualification:{question:'Quel traitement retient le scénario pour la part privée de CHF 1’350 ?',options:['L’ajouter aux contre-prestations imposables au taux normal','La déduire au ch. 415','La déclarer au ch. 910','L’ignorer car elle concerne un collaborateur'],correct:0,explain:'Dans le scénario, la part privée constitue une base imposable supplémentaire au taux normal.'},
    checks:['La part privée n’est pas une réduction ch. 420 ni une correction ch. 415 dans ce scénario.', 'Le forfait de 0,9 % est celui indiqué par l’AFC pour l’usage privé du véhicule de service; le cas fournit déjà le calcul.', 'Les situations particulières de véhicules exigent une analyse propre dans un dossier réel.', 'Lors d’un contrôle, l’AFC vérifie notamment la correcte déclaration des parts privées aux frais de véhicules.'],
    fields:['ch200','ch303','ch400'],
    expected:{ch200:91350,ch303:91350,ch400:3000},
    explain:{ch200:'CHF 90’000 de prestations + CHF 1’350 de part privée = CHF 91’350.',ch303:'Toute la base du cas est imposable au taux normal: CHF 91’350.',ch400:'L’impôt préalable courant déductible est CHF 3’000.'}
  },
  {
    id:'Q', tab:'Décompte rectificatif', title:'Agence Riviera Sàrl — facture oubliée dans un trimestre déjà remis', meta:'Marketing · Montreux · correction T2 2026', level:'Avancé', group:'Rectification',
    task:'Reconstituez le décompte corrigé de T2 après découverte d’une facture client imposable oubliée.',
    info:'Le décompte T2 a déjà été remis avec CHF 100’000 de chiffre d’affaires imposable et CHF 5’000 d’IP. En août, une facture imposable de CHF 20’000 appartenant à T2 est découverte. L’AFC indique qu’une erreur isolée d’une période mensuelle, trimestrielle ou semestrielle se corrige au moyen du <strong>décompte rectificatif de la période concernée</strong>, en ligne via le Portail AFC depuis 2025.',
    facts:[
      ['Chiffre d’affaires T2 déjà déclaré',100000,'8,1 %'],
      ['Facture imposable T2 oubliée',20000,'8,1 %'],
      ['Impôt préalable T2 correctement déclaré',5000,'ch. 400']
    ],
    legal:'Décompte rectificatif de la période concernée; remise en ligne via Portail AFC.', sourceKeys:['rectification','online','form'],
    qualification:{question:'Où corriger l’oubli découvert en août ?',options:['Dans un décompte rectificatif de T2','En l’ajoutant silencieusement à T3','Uniquement dans la concordance annuelle','En modifiant seulement le grand livre'],correct:0,explain:'Une erreur isolée d’un trimestre déjà remis se corrige dans le décompte rectificatif de ce trimestre.'},
    checks:['Le tableau demande l’état corrigé complet de T2.', 'Ne pas transférer automatiquement une erreur connue dans la période suivante.', 'La correction d’une période isolée est distincte de la concordance annuelle.', 'Depuis le 1er janvier 2025, l’AFC demande d’effectuer ces corrections en ligne via le Portail AFC.'],
    fields:['ch200','ch303','ch400'],
    expected:{ch200:120000,ch303:120000,ch400:5000},
    explain:{ch200:'État corrigé T2: CHF 100’000 déjà déclarés + CHF 20’000 oubliés = CHF 120’000.',ch303:'Toute la base corrigée du scénario est imposable à 8,1 %: CHF 120’000.',ch400:'L’IP T2 était correcte et reste CHF 5’000.'}
  },
  {
    id:'R', tab:'Décompte annuel', title:'MicroTech Sàrl — première année au décompte annuel', meta:'IT · Vaud · exercice 2026', level:'Avancé', group:'Périodicité annuelle',
    task:'Construisez le décompte annuel selon la méthode effective et distinguez la déclaration annuelle des acomptes versés pendant l’année.',
    info:'MicroTech réalise un chiffre d’affaires annuel de CHF 800’000, a demandé le <strong>décompte annuel</strong> dans le délai applicable et remplit dans le scénario les conditions de ponctualité / paiement. Son chiffre d’affaires est inférieur au plafond actuellement applicable de CHF 5’005’000. La méthode de déclaration reste la méthode effective: ce qui change est la périodicité. Les trois acomptes AFC versés pendant l’année relèvent du paiement et ne deviennent pas des rubriques de chiffre d’affaires du décompte.',
    facts:[
      ['Chiffre d’affaires annuel imposable',800000,'8,1 %'],
      ['Impôt préalable annuel déductible',40000,'ch. 400'],
      ['Décompte annuel demandé dans le délai et conditions du scénario remplies',0,'périodicité'],
      ['Trois acomptes AFC payés pendant l’année',0,'paiements — pas ch. 200']
    ],
    legal:'Décompte annuel depuis 2025 sur demande et sous conditions; plafond actuel CHF 5’005’000; trois acomptes pour la méthode effective.', sourceKeys:['annual','form','online'],
    qualification:{question:'Qu’est-ce qui change lorsque MicroTech passe au décompte annuel ?',options:['La périodicité de remise, pas la méthode effective de calcul','Les taux légaux deviennent des TDFN','Le chiffre d’affaires n’est plus déclaré','L’impôt préalable disparaît'],correct:0,explain:'Le décompte annuel simplifie la périodicité; le calcul du décompte selon la méthode effective reste fondé sur les mêmes mécanismes.'},
    checks:['Le plafond actuel indiqué par l’AFC est CHF 5’005’000 de chiffre d’affaires annuel.', 'Le décompte annuel doit être demandé dans les délais et suppose le respect des conditions publiées par l’AFC.', 'Pour la méthode effective, trois acomptes sont dus pendant l’année: 30 mai, 30 août et 30 novembre.', 'Le décompte annuel doit être remis et payé avant la fin février de l’année suivante.', 'Les acomptes ne sont pas ajoutés au ch. 200 ni déduits comme impôt préalable dans ce formulaire pédagogique.'],
    fields:['ch200','ch303','ch400'],
    expected:{ch200:800000,ch303:800000,ch400:40000},
    explain:{ch200:'Le chiffre d’affaires annuel imposable est CHF 800’000.',ch303:'Toute la base du scénario est au taux normal: CHF 800’000.',ch400:'L’impôt préalable annuel déductible est CHF 40’000.'}
  }
];

for (const c of EXTRA_CASES) {
  if (!CASES.some(existing => existing.id === c.id)) CASES.push(c);
}

const EXTRA_QUESTIONS = [
  {id:'timing-convenued',q:'Une entreprise décompte selon les contre-prestations convenues. Une facture imposable est émise le 20 juin et payée en juillet. À quelle période la dette fiscale appartient-elle en principe ?',o:['À la période comprenant la facturation de juin','Uniquement à la période de l’encaissement de juillet','À la concordance annuelle seulement','Au choix de l’entreprise'],a:0,w:'Sous les contre-prestations convenues, la dette naît en principe au moment de la facturation, sous réserve des règles particulières de l’art. 40 LTVA.',s:'LTVA — art. 39–40',u:SOURCE_LIBRARY.timing.url},
  {id:'timing-advance',q:'Sous les contre-prestations convenues, un paiement anticipé est encaissé pour une future prestation imposable non exonérée. Quel réflexe est correct ?',o:['Examiner la naissance de la dette fiscale dès l’encaissement de l’acompte','Attendre toujours la facture finale','Ignorer l’acompte en TVA','Le porter au ch. 910'],a:0,w:'L’art. 40 LTVA prévoit la naissance de la dette lors de l’encaissement en cas de paiement anticipé pour les prestations concernées.',s:'LTVA — art. 40',u:SOURCE_LIBRARY.timing.url},
  {id:'import-vs-acquisition',q:'Une machine physique est importée en Suisse. Quel mécanisme faut-il distinguer de l’impôt sur les acquisitions de services étrangers ?',o:['La TVA à l’importation','La procédure de déclaration ch. 225','La subvention ch. 900','Le don ch. 910'],a:0,w:'L’importation de biens est soumise à la TVA à l’importation; les services étrangers et certains travaux peuvent relever de l’impôt sur les acquisitions.',s:'AFC — TVA, importations et acquisitions',u:SOURCE_LIBRARY.imports.url},
  {id:'dte-proof',q:'Quel document constitue notamment une preuve pour la déduction de l’impôt préalable lors de l’importation de biens ?',o:['La décision de taxation électronique (DTe)','Un simple devis fournisseur','Une note interne sans justificatif','Le certificat de salaire'],a:0,w:'L’AFC indique que la DTe à l’importation constitue une preuve pour la déduction de l’impôt préalable.',s:'AFC — DTe',u:SOURCE_LIBRARY.dte.url},
  {id:'fx-consistency',q:'Une entreprise a choisi le cours mensuel moyen pour ses conversions TVA. Peut-elle passer au cours du jour uniquement pour une facture plus favorable au milieu de la période fiscale ?',o:['Non, la méthode choisie doit être maintenue pendant au moins une période fiscale','Oui, facture par facture','Oui, si le client est étranger','Oui, si le montant dépasse CHF 10’000'],a:0,w:'L’AFC permet le cours mensuel moyen ou le cours du jour, mais la méthode choisie doit être maintenue pendant au moins une période fiscale.',s:'AFC — cours de change TVA',u:SOURCE_LIBRARY.fx.url},
  {id:'vehicle-private',q:'Quel point l’AFC mentionne explicitement parmi les éléments contrôlés en matière d’impôt préalable et d’usage des véhicules ?',o:['La correcte déclaration des parts privées','Le kilométrage uniquement si le véhicule est électrique','La couleur du véhicule','Le lieu d’achat du carburant uniquement'],a:0,w:'L’AFC indique que le contrôle porte notamment sur la correcte déclaration des parts privées aux frais de véhicules.',s:'AFC — déroulement d’un contrôle TVA',u:SOURCE_LIBRARY.control.url},
  {id:'rectification-period',q:'Une facture imposable de T2 a été oubliée et l’erreur est découverte en août. Quelle approche indique l’AFC pour une erreur isolée ?',o:['Rectifier T2 au moyen du décompte rectificatif de la période concernée','Ajouter la facture à T3 sans autre formalité','Attendre obligatoirement la concordance annuelle','Ne corriger que le grand livre'],a:0,w:'Les corrections d’une période isolée se font au moyen du décompte rectificatif de la période concernée.',s:'AFC — décompte de rectification TVA',u:SOURCE_LIBRARY.rectification.url},
  {id:'annual-three-instalments',q:'Combien d’acomptes sont prévus pendant l’année pour un assujetti à la méthode effective qui utilise le décompte annuel ?',o:['Trois','Un','Quatre','Aucun'],a:0,w:'L’AFC prévoit trois acomptes pour la méthode effective, avec échéances au 30 mai, 30 août et 30 novembre.',s:'AFC — décompte annuel',u:SOURCE_LIBRARY.annual.url},
  {id:'annual-deadline',q:'Quand le décompte annuel TVA doit-il être remis et payé selon la règle actuelle ?',o:['Avant la fin février de l’année suivante','Avant le 30 novembre de la même année','Dans les 30 jours après chaque trimestre','Uniquement lors de la concordance annuelle'],a:0,w:'L’AFC indique que le décompte annuel doit être remis et payé avant la fin février de l’année suivante.',s:'AFC — décompte annuel',u:SOURCE_LIBRARY.annual.url}
];

for (const q of EXTRA_QUESTIONS) {
  if (!QUESTION_BANK.some(existing => existing.id === q.id)) QUESTION_BANK.push(q);
}
