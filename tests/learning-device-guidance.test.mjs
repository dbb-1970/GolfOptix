import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {tourSteps} from '../public/assets/demo-tour-model.js';
const c=JSON.parse(fs.readFileSync('public/assets/learning-catalog.json','utf8'));
const items=[...c.guides,...c.classes],get=id=>items.find(g=>g.id===id);
const xml=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
test('each published bilingual lesson carries explicit device guidance and matching illustrated steps',()=>{
 const images=new Set();
 for(const g of items){
  assert.ok(['field','setup','both','public'].includes(g.deviceMode),g.id);
  assert.ok(g.deviceNote.length>60,g.id);assert.ok(g.es.deviceNote.length>60,g.id+' Spanish');
  assert.equal(g.es.steps.length,g.steps.length,g.id);
  for(const version of [g,g.es])for(const s of version.steps){
   assert.ok(!images.has(s.image),s.image);images.add(s.image);
   const svg=fs.readFileSync('public'+s.image,'utf8');
   assert.ok(svg.includes(xml(s.title)),g.id+' illustration title');
   assert.match(svg,/SIMPLIFIED EXAMPLE|EJEMPLO SIMPLIFICADO/);
   assert.match(svg,/FIELD WORK|FULL TOOLS|FIELD \+|PUBLIC TOOL|TRABAJO DE CAMPO|TODAS LAS HERRAMIENTAS|CAMPO \+|HERRAMIENTA PÚBLICA/);
  }
 }
});
test('phone execution and office setup instructions distinguish actual scope without granting access',()=>{
 for(const id of ['crew-add','credentials','copy-schedule','calendar','events','pins','garage-inventory','chemical-products','chemical-plan','recovery','transfer']){
  assert.equal(get(id).deviceMode,'setup',id);assert.match(get(id).deviceNote,/Full tools/);
 }
 assert.match(get('chemical-record').deviceNote,/three steps/);
 assert.match(get('chemical-record').deviceNote,/Back retains/);
 assert.match(get('reports').deviceNote,/annual budget entry/);
 assert.match(get('work-progress').deviceNote,/never gives a worker/);
 assert.match(get('map-navigation').deviceNote,/Find a map feature \(including repairs\)/);
 assert.match(get('calendar').deviceNote,/one-time/);
});
test('full tour explains temporary full-tools preview, phone entry steps and restoration',()=>{
 assert.match(tourSteps[0].text,/temporarily opens Full tools/);
 assert.match(tourSteps.at(-1).text,/restores phone field view/);
 assert.match(tourSteps.find(s=>s.prepare==='chemApply').text,/three steps/);
 assert.match(tourSteps.find(s=>s.title==='See the story behind the numbers.').text,/annual budget entry/);
});
