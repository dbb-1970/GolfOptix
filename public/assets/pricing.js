/* Public arithmetic only: no account, tracking, storage or payment request. */
(function(root){
'use strict';
const price={monthly:225,annual:2250,includedManagers:3,extraManagerMonthly:25,extra18Monthly:75,extra18Annual:750,extra9Monthly:45,extra9Annual:450,onboarding:500,pilotMonthly:150,currency:'USD'};
function estimate({plan='monthly',tracks18=1,tracks9=0,managers=0,visit=true}={}){
 if(!['monthly','annual','pilot'].includes(plan))throw Error('Unknown service arrangement');
 for(const [value,min,max]of [[tracks18,1,18],[tracks9,0,18],[managers,0,50]])if(!Number.isInteger(value)||value<min||value>max)throw Error('Choose a valid inventory count');
 const annual=plan==='annual',base=annual?price.annual:plan==='pilot'?price.pilotMonthly:price.monthly,extra18=(tracks18-1)*(annual?price.extra18Annual:price.extra18Monthly),extra9=tracks9*(annual?price.extra9Annual:price.extra9Monthly),extraManagers=managers*price.extraManagerMonthly*(annual?12:1),recurring=base+extra18+extra9+extraManagers,setup=visit?price.onboarding:0;
 return{annual,base,extra18,extra9,extraManagers,recurring,setup,firstPayment:recurring+setup,firstYear:recurring*(annual?1:12)+setup};
}
if(typeof module!=='undefined')module.exports={price,estimate};
if(!root.document)return;
const form=document.getElementById('pricing-calculator-form');if(!form)return;
for(const [name,min,max]of [['tracks18',1,18],['tracks9',0,18],['managers',0,50]]){const select=form.elements[name];for(let n=min;n<=max;n++){const option=document.createElement('option');option.value=String(n);option.textContent=String(n);select.append(option);}}
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n),el=id=>document.getElementById(id);
function render(){const v=Object.fromEntries(new FormData(form)),r=estimate({plan:v.plan,tracks18:Number(v.tracks18),tracks9:Number(v.tracks9),managers:Number(v.managers),visit:v.visit==='yes'});el('estimate-total').textContent=money(r.recurring);el('estimate-period').textContent=r.annual?'/ year':'/ month';
 const dl=el('estimate-breakdown');dl.replaceChildren();for(const [label,value]of [['Base service · first 18 holes',r.base],['Additional 18-hole tracks',r.extra18],['Additional nine-hole tracks',r.extra9],['Additional management users',r.extraManagers],['One-time site visit',r.setup]]){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=money(value);dd.dataset.noTranslate='true';dl.append(dt,dd);}
 el('estimate-first-label').textContent=r.annual?'First year + selected site visit':'First month + selected site visit';el('estimate-first').textContent=money(r.firstPayment);el('estimate-year').replaceChildren();const yearLabel=document.createElement('span'),yearValue=document.createElement('strong');yearLabel.textContent='12-month total, including selected visit';yearValue.textContent=money(r.firstYear);el('estimate-year').append(yearLabel,yearValue);el('estimate-pilot-note').hidden=v.plan!=='pilot';root.GolfLanguage?.refresh();}
form.addEventListener('change',render);form.addEventListener('submit',e=>e.preventDefault());render();
})(typeof window!=='undefined'?window:globalThis);
