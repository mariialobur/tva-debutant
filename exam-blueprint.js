export function shuffle(items, random=Math.random){
  const array=[...items];
  for(let i=array.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}
  return array;
}

export function selectBlueprintQuestions(bank, blueprint, expectedSize, random=Math.random){
  const byId=new Map(bank.map(item=>[item.id,item]));
  const selected=[];
  const used=new Set();
  for(const section of blueprint){
    const candidates=section.ids.map(id=>byId.get(id)).filter(Boolean).filter(item=>!used.has(item.id));
    if(candidates.length<section.count) throw new Error(`Blueprint incomplet: ${section.label} (${candidates.length}/${section.count})`);
    for(const item of shuffle(candidates,random).slice(0,section.count)){selected.push({...item,examTheme:section.label});used.add(item.id);}
  }
  if(selected.length<expectedSize){
    const remaining=shuffle(bank.filter(item=>!used.has(item.id)),random);
    for(const item of remaining.slice(0,expectedSize-selected.length)){selected.push({...item,examTheme:'Complément'});used.add(item.id);}
  }
  if(selected.length!==expectedSize) throw new Error(`Blueprint: ${selected.length} questions au lieu de ${expectedSize}`);
  return shuffle(selected,random);
}
