import './level1-extension.js';
import './effective-path-progress.js';

const STORAGE_KEY = 'tva_effective_v2_state';
const LEGACY_KEYS = ['tvaEffectiveTrainerV6','tvaEffectiveTrainerV5','tvaEffectiveTrainerV4'];

const DEFAULT_STATE = {
  version: 2,
  caseIndex: 0,
  view: 'guided',
  mode: 'learn',
  records: {},
  drafts: {}
};

function safeGet(key){ try { return localStorage.getItem(key); } catch { return null; } }
function safeSet(key,value){ try { localStorage.setItem(key,value); } catch {} }
function safeRemove(key){ try { localStorage.removeItem(key); } catch {} }

function normalizeRecord(record={}){
  return {
    learningAttempts: Number(record.learningAttempts)||0,
    practiceAttempts: Number(record.practiceAttempts)||0,
    evaluationAttempts: Number(record.evaluationAttempts)||0,
    bestLearningScore: Number(record.bestLearningScore)||0,
    bestPracticeScore: Number(record.bestPracticeScore)||0,
    bestEvaluationScore: Number(record.bestEvaluationScore)||0,
    firstScore: Number.isFinite(Number(record.firstScore)) ? Number(record.firstScore) : null,
    solutionViewed: Boolean(record.solutionViewed),
    mastered: Number(record.bestEvaluationScore)===100
  };
}

function migrateLegacy(){
  for(const key of LEGACY_KEYS){
    const raw=safeGet(key);
    if(!raw) continue;
    try{
      const old=JSON.parse(raw);
      const records={};
      Object.entries(old.records||{}).forEach(([id,r])=>records[id]=normalizeRecord(r));
      return {
        ...DEFAULT_STATE,
        caseIndex:Number.isInteger(old.caseIndex)?old.caseIndex:0,
        view:['guided','extended'].includes(old.view)?old.view:'guided',
        mode:['learn','practice','evaluate'].includes(old.learningMode)?old.learningMode:'learn',
        records,
        drafts: old.drafts||{}
      };
    }catch{}
  }
  return null;
}

export function loadState(){
  const raw=safeGet(STORAGE_KEY);
  if(raw){
    try{
      const parsed=JSON.parse(raw);
      const records={};
      Object.entries(parsed.records||{}).forEach(([id,r])=>records[id]=normalizeRecord(r));
      return {...DEFAULT_STATE,...parsed,records};
    }catch{}
  }
  const migrated=migrateLegacy();
  if(migrated){ saveState(migrated); return migrated; }
  return structuredClone(DEFAULT_STATE);
}

export function saveState(state){ safeSet(STORAGE_KEY,JSON.stringify(state)); }
export function clearState(){
  safeRemove(STORAGE_KEY);
  LEGACY_KEYS.forEach(safeRemove);
}
export function stateKey(){ return STORAGE_KEY; }
export function blankRecord(){ return normalizeRecord({}); }
export function blankDraft(){ return { values:{}, qualification:'', assisted:false, submitted:false, correctionShown:false, lastScore:null }; }
