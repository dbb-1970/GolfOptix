// The real workspace is also protected at the hosting edge. Course access comes
// from the authenticated session; a query parameter never grants membership.
const $=id=>document.getElementById(id),query=new URLSearchParams(location.search);
const demo=location.pathname.startsWith('/test-drive/maintenance/');
const root=demo?'/test-drive/maintenance/':'/maintenance/';
let courses=[];
function selectCourse(){
 const course=courses.find(c=>c.id===$('hub-course').value);if(!course)return;
 const calendar=new URL(root+'calendar/',location.origin),map=new URL(course.url,location.origin);
 if(!demo)calendar.searchParams.set('course',course.id);
 $('hub-calendar').href=calendar.pathname+calendar.search;
 $('hub-map-nav').href=$('hub-back-map').href=map.pathname+map.search;
 map.searchParams.set('panel','repairs');$('hub-repairs').href=map.pathname+map.search;
 if(!demo){const current=new URL(location.href);current.searchParams.set('course',course.id);history.replaceState(null,'',current.pathname+current.search);}
}
try{
 let user;
 if(demo){user={name:'Test Drive Guest'};courses=[{id:'juniper-cove-lakes',name:'Juniper Cove Golf Club — Lakes Course (DEMO COURSE)',url:'/test-drive/'}];}
 else{
  const {refreshSession}=await import('./identity-sdk.js');await refreshSession();
  const response=await fetch('/api/session',{credentials:'same-origin',cache:'no-store'});
  if(response.status===401||response.status===403){location.replace('/login/?required=maintenance');throw Error('Sign in to open your maintenance workspace.');}
  if(!response.ok)throw Error('Could not check your course access. Please try again.');
  user=await response.json();courses=user.courses||[];
  if(!courses.length){location.replace('/account/');throw Error('Your course access needs approval. Open My account to review your request.');}
 }
 const requested=demo?courses[0].id:query.get('course');
 const selected=courses.find(c=>c.id===requested)||(!requested?courses[0]:null);
 if(!selected)throw Error('This track is not approved for your account. Open My account to choose an available track.');
 for(const course of courses){const option=document.createElement('option');option.value=course.id;option.textContent=course.name;$('hub-course').append(option);}
 $('hub-course').value=selected.id;$('hub-course').disabled=courses.length<2;
 $('hub-person').textContent=demo?'Explore with fictional course data. Changes reset when you leave.':'Signed in as '+user.name;
 $('hub-course').addEventListener('change',selectCourse);selectCourse();
 $('hub-workspace').hidden=false;$('hub-status').textContent=demo?'This is the public Test Drive. Your real course records remain separate.':'';
}catch(error){$('hub-status').textContent=error.message;$('hub-status').classList.add('error');$('hub-retry').hidden=false;}
$('hub-retry').onclick=()=>location.reload();
