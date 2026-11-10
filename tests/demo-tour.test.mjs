import {test} from 'node:test';import assert from 'node:assert/strict';
import {tourSteps,tourPages,readTour,placeFlyout} from '../public/assets/demo-tour-model.js';

test('walkthrough state expires and rejects malformed or out-of-range progress',()=>{
 const now=10000000,valid={version:2,active:true,seen:true,index:5,updatedAt:now-1000};
 assert.equal(readTour(JSON.stringify(valid),now).index,5);
 for(const value of ['bad',JSON.stringify({...valid,index:-1}),JSON.stringify({...valid,index:tourSteps.length}),JSON.stringify({...valid,updatedAt:now-3600001}),JSON.stringify({...valid,updatedAt:now+100}),JSON.stringify({...valid,active:'yes'})])assert.equal(readTour(value,now).active,false);
});
test('phone flyouts remain inside the screen and above the map navigation',()=>{
 const screen={width:390,height:844,bottom:78},card={width:358,height:300};
 for(const target of [{left:20,top:700,right:100,bottom:740,width:80,height:40},{left:10,top:10,right:380,bottom:800,width:370,height:790},{left:360,top:200,right:390,bottom:244,width:30,height:44}]){
  const p=placeFlyout(target,card,screen);assert.ok(p.left>=16);assert.ok(p.left+card.width<=screen.width-16);assert.ok(p.top>=16);assert.ok(p.top+card.height<=screen.height-screen.bottom-16);
 }
});
test('desktop flyouts prefer an unobstructed side of the pointed-to control',()=>{
 const target={left:100,top:250,right:180,bottom:300,width:80,height:50};
 const p=placeFlyout(target,{width:360,height:270},{width:1280,height:900});
 assert.ok(p.left>target.right);
});
test('tour destinations are exclusively public demo pages; instructions cannot grant access',()=>{
 assert.ok(tourSteps.length>=20);for(const s of tourSteps){assert.ok(Object.hasOwn(tourPages,s.page));assert.ok(tourPages[s.page].startsWith('/test-drive/'));}
 assert.match(tourSteps.find(s=>s.prepare==='worker').text,/demo creates no real accounts or emails/);
});
test('the guided journey covers classification, work logs, draft closure, manager review and retained history',()=>{
 for(const prepare of ['tourLog','tourSubmit','tourAssistant','tourReview','tourApprove','tourHistory'])assert.ok(tourSteps.some(s=>s.prepare===prepare));
 assert.ok(tourSteps.some(s=>s.target==='#calendar-order-kind'));
 assert.ok(tourSteps.some(s=>s.target==='.repair-form [name="maintenanceKind"]'));
 assert.equal(readTour(JSON.stringify({version:1,active:true,seen:true,index:5,updatedAt:Date.now()})).active,false);
});
