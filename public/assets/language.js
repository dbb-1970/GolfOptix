/* Local interface translations. Private notes are never sent to a translator. */
(()=>{'use strict';
let language='en',dictionary={},working=false,queued=false,storageKey='golfoptix-language',clicked=false;
try{language=localStorage.getItem(storageKey)==='es'?'es':'en';}catch{}
const originals=new WeakMap(),skip='[data-no-translate],script,style,code,pre,textarea,svg,[translate="no"],option[data-user-value]';
function phrase(en){const raw=en.trim();if(dictionary[raw])return dictionary[raw];
 const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
 const month=raw.match(/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/);if(month)return new Intl.DateTimeFormat('es',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(+month[2],months.indexOf(month[1]),1)));
 const full=raw.match(/^(?:(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), )?(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})$/);if(full)return new Intl.DateTimeFormat('es',{...(full[1]?{weekday:'long'}:{}),day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(+full[4],months.indexOf(full[2]),+full[3])));
 const pending=raw.match(/^(\d+) awaiting approval$/);if(pending)return pending[1]+' pendientes de aprobación';
 const n=raw.match(/^(\d+) work orders · (\d+) emergency jobs$/);if(n)return n[1]+(n[1]==='1'?' orden de trabajo · ':' órdenes de trabajo · ')+n[2]+(n[2]==='1'?' emergencia':' emergencias');
 const pair=raw.match(/^([^:]+): ([-\d.,]+)$/);if(pair&&dictionary[pair[1]])return dictionary[pair[1]]+': '+pair[2];
 const more=raw.match(/^More tools · (.+)$/);if(more&&dictionary[more[1]])return 'Más herramientas · '+dictionary[more[1]];
 if(raw.includes(' · ')){const pieces=raw.split(' · '),translated=pieces.map(x=>phrase(x)||x);if(translated.some((x,i)=>x!==pieces[i]))return translated.join(' · ');}
 const number=raw.match(/^(Hole|Green|Tee) (\d+)$/);if(number&&dictionary[number[1]])return dictionary[number[1]]+' '+number[2];
 const count=raw.match(/^(\d+) (items|jobs|assignments shown|actual work minutes)(.*)$/);if(count){const terms={items:'elementos',jobs:'trabajos','assignments shown':'asignaciones mostradas','actual work minutes':'minutos de trabajo real'};return count[1]+' '+terms[count[2]]+(count[3]===' · your work only'?' · solo sus tareas':count[3]);}
 return null;
}
function translate(node){if(!node.nodeValue?.trim()||node.parentElement?.closest(skip))return;const previous=originals.get(node);const en=previous&&[previous.en,previous.es].includes(node.nodeValue)?previous.en:node.nodeValue;const value=phrase(en);if(!value)return;const es=en.replace(en.trim(),value);originals.set(node,{en,es});const desired=language==='es'?es:en;if(node.nodeValue!==desired)node.nodeValue=desired;}
function toolbar(){const bar=document.createElement('div');bar.className='language-switch';bar.setAttribute('role','group');bar.setAttribute('aria-label','Language / Idioma');bar.dataset.noTranslate='true';for(const [code,label]of [['en','🇺🇸 English'],['es','🇪🇸 Español']]){const b=document.createElement('button');b.type='button';b.dataset.golfLanguage=code;b.textContent=label;b.onclick=()=>{clicked=true;language=code;try{localStorage.setItem(storageKey,code);}catch{}update();document.dispatchEvent(new CustomEvent('golf-language-change',{detail:code}));};bar.append(b);}return bar;}
function update(){if(working)return;working=true;try{document.documentElement.lang=language;
 // Native modal dialogs block the page header, so keep a language choice inside them too.
 for(const modal of document.querySelectorAll('dialog[open]'))if(!modal.querySelector('.language-switch'))modal.prepend(toolbar());
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode())translate(node);
 for(const b of document.querySelectorAll('[data-golf-language]'))b.setAttribute('aria-pressed',String(b.dataset.golfLanguage===language));
 for(const e of document.querySelectorAll('[placeholder],[title],[aria-label]')){if(e.closest(skip))continue;for(const a of ['placeholder','title','aria-label']){const key='english'+a.replace('-',''),value=e.getAttribute(a),en=e.dataset[key]||value;if(en&&phrase(en)){e.dataset[key]=en;e.setAttribute(a,language==='es'?phrase(en):en);}}}
 }finally{working=false;}}
const bar=toolbar(),target=document.querySelector('header,.site-nav,.app-nav,.maintenance-nav');if(target)target.append(bar);else{bar.classList.add('language-switch-floating');document.body.prepend(bar);}
fetch('/assets/es-ui.json?v=ops3').then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{dictionary=d;update();new MutationObserver(()=>{if(!working&&!queued){queued=true;requestAnimationFrame(()=>{queued=false;update();});}}).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['open']});}).catch(()=>{bar.title='Translation file unavailable. English remains available.';});
// Each signed-in account has a separate device preference. This does not alter access.
if(!location.pathname.startsWith('/test-drive/'))fetch('/api/session',{cache:'no-store',credentials:'same-origin'}).then(r=>r.ok?r.json():null).then(u=>{if(!u?.id)return;storageKey='golfoptix-language:'+u.id;try{if(clicked)localStorage.setItem(storageKey,language);else{const saved=localStorage.getItem(storageKey);if(saved==='es'||saved==='en')language=saved;}}catch{}update();}).catch(()=>{});
window.GolfLanguage={get:()=>language,refresh:update,english:value=>Object.keys(dictionary).find(k=>dictionary[k]===value)||value};
})();
