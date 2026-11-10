import {tourPages,tourSteps,readTour,placeFlyout} from './demo-tour-model.js?v=1';

const page=Object.keys(tourPages).find(key=>tourPages[key]===location.pathname);
if(page) init();
function init(){
  const KEY='golfoptix-superintendent-tour-v1',$=s=>document.querySelector(s);
  const phone=()=>matchMedia('(max-width:760px), (max-height:500px) and (pointer:coarse)').matches;
  let state;try{state=readTour(sessionStorage.getItem(KEY));}catch{state=readTour(null);}
  let target=null,busy=false,ownedDialog=null,previousFocus=null,positionFrame=0;
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
  const launch=make('button','demo-tour-launch','✧ Superintendent tour');launch.type='button';launch.title='Start the guided superintendent walkthrough';
  const ui=make('div','demo-tour-ui');ui.hidden=true;
  const ring=make('div','demo-tour-ring');ring.setAttribute('aria-hidden','true');
  const connector=document.createElementNS('http://www.w3.org/2000/svg','svg');connector.setAttribute('class','demo-tour-connector');connector.setAttribute('aria-hidden','true');
  connector.innerHTML='<defs><marker id="tour-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#e6c887"/></marker></defs><path fill="none" stroke="#e6c887" stroke-width="2" marker-end="url(#tour-arrow)"/>';
  const card=make('section','demo-tour-card');card.setAttribute('role','dialog');card.setAttribute('aria-modal','false');card.setAttribute('aria-labelledby','demo-tour-title');card.setAttribute('aria-describedby','demo-tour-description');
  const meta=make('div','demo-tour-meta'),chapter=make('span','demo-tour-chapter'),count=make('span');meta.append(chapter,count);
  const progress=make('div','demo-tour-progress'),bar=make('span');progress.append(bar);progress.setAttribute('aria-hidden','true');
  const title=make('h2');title.id='demo-tour-title';
  const copy=make('div','demo-tour-copy'),text=make('p');copy.setAttribute('aria-live','polite');text.id='demo-tour-description';
  const missing=make('p','demo-tour-missing','This control is not available in this view. NEXT continues the walkthrough.');missing.hidden=true;copy.append(text,missing);
  const actions=make('div','demo-tour-actions');
  function control(label,cls,fn){const b=make('button',cls,label);b.type='button';b.onclick=fn;actions.append(b);return b;}
  const back=control('BACK','demo-tour-back',()=>advance(-1));
  const end=control('END INSTRUCTION','demo-tour-end',finish);
  const next=control('NEXT →','demo-tour-next',()=>advance(1));
  card.append(meta,progress,title,copy,actions);ui.append(ring,connector,card);document.body.append(launch,ui);
  function persist(){state.updatedAt=Date.now();try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch{}}
  function finish(){state.active=false;state.seen=true;persist();target=null;ui.hidden=true;document.body.append(ui);launch.hidden=false;(previousFocus?.isConnected?previousFocus:launch).focus({preventScroll:true});}
  launch.onclick=()=>{previousFocus=document.activeElement;state={version:1,active:true,seen:true,index:0,updatedAt:Date.now()};persist();show();};
  function visible(e){if(!e?.isConnected||!e.getClientRects().length)return false;const s=getComputedStyle(e);return s.visibility!=='hidden'&&s.display!=='none';}
  async function waitFor(fn,ms=8000){const start=Date.now();while(Date.now()-start<ms){const value=fn();if(value)return value;await new Promise(resolve=>setTimeout(resolve,80));}return null;}
  function pane(name){if(!phone())return;const b=$('[data-pane-button="'+name+'"]');if(b&&document.body.dataset.mobilePane!==name)b.click();}
  function closePane(){if(!phone())return;const b=$('.mobile-drawer-backdrop');if(document.body.dataset.mobilePane&&b)b.click();}
  async function hole(){closePane();if(window.golfCourse?.hole()!==3)window.golfCourse?.go(3);await waitFor(()=>window.golfCourse?.hole()===3&&$('#map-mount [data-edit-asset]'));}
  async function sprinkler(){await hole();const head=$('#map-mount [data-edit-asset][aria-label^="Sprinkler "]');if(head&&$('#asset-panel')?.hidden)head.dispatchEvent(new MouseEvent('click',{bubbles:true}));$('#asset-panel')?.classList.add('sheet-expanded');}
  function openForm(button,selector){const d=$(selector);if(!d?.open){$(button)?.click();ownedDialog=$(selector);}return d;}
  async function prepare(step){
    switch(step.prepare){
      case'holes':pane('holes');break;
      case'layers':await hole();pane('layers');break;
      case'sprinkler':await sprinkler();break;
      case'repair':await sprinkler();break;
      case'coverage':await sprinkler();if($('.coverage-options'))$('.coverage-options').open=true;break;
      case'add':await hole();$('#close-asset')?.click();if(phone()){if(!document.body.classList.contains('mobile-edit-mode'))$('.mobile-edit-button')?.click();else if(document.body.dataset.mobilePane!=='tools')$('.mobile-edit-button')?.click(),$('.mobile-edit-button')?.click();}break;
      case'print':$('#close-asset')?.click();closePane();if(phone())pane('more');break;
      case'watering':openForm('[data-schedule-type="watering"]','#calendar-editor');break;
      case'worker':openForm('#crew-add-worker','#crew-editor');break;
      case'assignment':openForm('#crew-assign','#crew-editor');break;
      case'copy':openForm('#crew-copy','#crew-editor');break;
      case'tickets':$('[data-crew-view="week"]')?.click();break;
    }
  }
  function findTarget(step){if(step.target==='.test-drive-notice'&&phone())return $('.map-toolbar');if(step.target==='print')return phone()?[...document.querySelectorAll('[data-mobile-pane="more"] button')].find(b=>b.textContent==='Print this hole'):$('#print-hole');return $(step.target);}
  async function advance(delta){
    if(busy)return;const following=state.index+delta;if(following<0)return;if(following>=tourSteps.length){finish();return;}
    if(ownedDialog?.open&&tourSteps[following].group!==tourSteps[state.index].group){ownedDialog.querySelector('.calendar-editor-heading button')?.click();if(ownedDialog.open)return;document.body.append(ui);ownedDialog=null;}
    state.index=following;persist();await show();
  }
  async function show(){
    if(!state.active||busy)return;const step=tourSteps[state.index];
    if(step.page!==page){persist();dispatchEvent(new Event('golf-demo-navigation'));location.assign(tourPages[step.page]);return;}
    busy=true;next.disabled=back.disabled=true;launch.hidden=true;
    try{
      await prepare(step);target=await waitFor(()=>{const e=findTarget(step);return visible(e)?e:null;},2500);
      if(!state.active)return;
      missing.hidden=!!target;target=target||launch;
      const portal=target.closest('dialog[open]')||document.body;portal.append(ui);
      chapter.textContent=({map:'The course map',maintenance:'Maintenance',calendar:'Work planning',crew:'Your crew'})[page];
      count.textContent=String(state.index+1).padStart(2,'0')+' / '+tourSteps.length;bar.style.width=((state.index+1)/tourSteps.length*100)+'%';
      title.textContent=step.title;text.textContent=step.text;back.hidden=state.index===0;ui.hidden=false;
      if(target!==launch)target.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
      await new Promise(resolve=>requestAnimationFrame(resolve));position();next.disabled=back.disabled=false;next.focus({preventScroll:true});
    }catch{finish();}finally{busy=false;next.disabled=back.disabled=false;}
  }
  function position(){
    if(ui.hidden||!target)return;
    const r=target.getBoundingClientRect(),width=innerWidth,height=window.visualViewport?.height||innerHeight;
    const visibleRect={left:Math.max(8,Math.min(width-8,r.left)),top:Math.max(8,Math.min(height-8,r.top)),right:Math.max(8,Math.min(width-8,r.right)),bottom:Math.max(8,Math.min(height-8,r.bottom))};visibleRect.width=Math.max(0,visibleRect.right-visibleRect.left);visibleRect.height=Math.max(0,visibleRect.bottom-visibleRect.top);
    ring.hidden=target===launch||!visible(target);connector.style.display=ring.hidden?'none':'';
    Object.assign(ring.style,{left:(visibleRect.left-5)+'px',top:(visibleRect.top-5)+'px',width:(visibleRect.width+10)+'px',height:(visibleRect.height+10)+'px'});
    card.style.maxHeight=Math.max(140,height-(page==='map'&&phone()?78:0)-32)+'px';
    const box=card.getBoundingClientRect(),p=placeFlyout(visibleRect,box,{width,height,bottom:page==='map'&&phone()?78:0});Object.assign(card.style,{left:p.left+'px',top:p.top+'px'});
    const cx=visibleRect.left+visibleRect.width/2,cy=visibleRect.top+visibleRect.height/2,sx=Math.max(p.left+16,Math.min(cx,p.left+box.width-16)),sy=Math.max(p.top+16,Math.min(cy,p.top+box.height-16));
    connector.querySelector('path[stroke]').setAttribute('d',`M${sx} ${sy} L${cx} ${cy}`);
  }
  function schedulePosition(){if(!positionFrame)positionFrame=requestAnimationFrame(()=>{positionFrame=0;position();});}
  addEventListener('resize',schedulePosition);addEventListener('scroll',schedulePosition,true);window.visualViewport?.addEventListener('resize',schedulePosition);
  document.addEventListener('keydown',e=>{if(state.active&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();finish();}},true);
  // Only walkthrough progress survives navigation; no practice edits or personnel are retained.
  (async()=>{const ready=await waitFor(()=>page==='map'?window.GolfCoverage&&$('#map-mount [data-edit-asset]'):page==='maintenance'?visible($('#hub-workspace')):page==='calendar'?!$('[data-schedule-type="watering"]')?.disabled:visible($('#crew-manager-actions')));if(!ready)return;if(!state.seen&&!state.active){state.active=true;state.seen=true;state.index=tourSteps.findIndex(s=>s.page===page);persist();}if(state.active){if(tourSteps[state.index].page!==page){state.index=tourSteps.findIndex(s=>s.page===page);persist();}show();}})();
}
