/* Readable screen labels; the source SVGs and print typography remain unchanged. */
(()=>{'use strict';const originals=new WeakMap();let queued=false;
function update(){queued=false;const root=window.golfCourse?.svg();if(!root)return;const bounds=root.getBoundingClientRect(),labels=[...root.querySelectorAll('text[data-asset-id]')],rows=[];
 for(const label of labels){const m=label.getScreenCTM();if(!m)continue;const scale=Math.max(Math.hypot(m.a,m.b),Math.hypot(m.c,m.d));if(!scale)continue;let original=originals.get(label);if(!original){original={font:parseFloat(getComputedStyle(label).fontSize)||10};originals.set(label,original);}const pixels=Math.max(9,Math.min(13,original.font*scale));label.style.fontSize=(pixels/scale).toFixed(4)+'px';label.style.strokeWidth=(1.5/scale).toFixed(4)+'px';rows.push({label});}
 const selected=root.querySelector('[data-edit-asset].asset-selected')?.id;for(const row of rows)row.rect=row.label.getBoundingClientRect();rows.sort((a,b)=>Number(b.label.dataset.assetId===selected)-Number(a.label.dataset.assetId===selected));const accepted=[];
 for(const {label,rect:r}of rows){const inside=r.width>0&&r.right>bounds.left&&r.left<bounds.right&&r.bottom>bounds.top&&r.top<bounds.bottom;const overlaps=inside&&accepted.some(b=>r.left<b.right+3&&r.right>b.left-3&&r.top<b.bottom+2&&r.bottom>b.top-2);label.style.visibility=inside&&!overlaps?'visible':'hidden';if(inside&&!overlaps)accepted.push(r);}
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
new MutationObserver(schedule).observe(document.getElementById('map-mount'),{childList:true,subtree:true,attributes:true,attributeFilter:['viewBox']});window.addEventListener('resize',schedule);window.addEventListener('golf-map-ready',schedule);document.getElementById('labels-toggle').addEventListener('change',schedule);schedule();
})();
