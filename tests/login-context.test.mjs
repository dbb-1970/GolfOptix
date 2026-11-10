import {test} from 'node:test';
import assert from 'node:assert/strict';
import catalog from '../public/course-catalog.json' with {type:'json'};
import {loginContext,loginDestination} from '../public/assets/login-context.js';
import {crewAccountLink} from '../netlify/lib/crew-email.mjs';

test('a welcome opens account setup with the inviter’s real course and track',()=>{
  const link=new URL(crewAccountLink('kings-ridge-kings'));
  assert.equal(link.origin,'https://golfoptix.com');
  assert.equal(link.pathname,'/login/');
  const context=loginContext(catalog.courses,link.search);
  assert.equal(context.crewSetup,true);
  assert.equal(context.signup,false); // This invited Identity already exists.
  assert.equal(context.course.id,'kings-ridge');
  assert.equal(context.track.id,'kings-ridge-kings');
  assert.equal(context.invalid,false);
  assert.equal(link.searchParams.has('password'),false);
  assert.equal(link.searchParams.has('email'),false);
});
test('ordinary signup links select the requested course and track, including a future track request',()=>{
  const context=loginContext(catalog.courses,'?signup=1&course=kings-ridge&track=kings-ridge-ridge');
  assert.equal(context.signup,true);
  assert.equal(context.crewSetup,false);
  assert.equal(context.course.name,'Kings Ridge Golf Club');
  assert.equal(context.track.name,'Ridge Course');
});
test('crew setup rejects unknown, unavailable and mismatched course/track hints',()=>{
  for(const search of ['?setup=crew&course=unknown&track=kings-ridge-kings','?setup=crew&course=kings-ridge&track=juniper-cove-lakes','?setup=crew&course=kings-ridge&track=kings-ridge-ridge','?setup=crew&course=juniper-cove&track=juniper-cove-lakes']){
    const context=loginContext(catalog.courses,search);
    assert.equal(context.crewSetup,false);assert.equal(context.invalid,true);
  }
  assert.throws(()=>crewAccountLink('unknown'));
  assert.throws(()=>crewAccountLink('kings-ridge-ridge'));
  assert.throws(()=>crewAccountLink('juniper-cove-lakes'));
});
test('URL hints cannot grant course access or choose an external post-login destination',()=>{
  const approved={courses:[{id:'kings-ridge-kings',url:'/course/'}]};
  assert.equal(loginDestination({courses:[]},'kings-ridge-kings',true),null);
  assert.equal(loginDestination(approved,'unapproved',true),null);
  assert.equal(loginDestination(approved,'kings-ridge-kings',true),'/crew/?course=kings-ridge-kings');
  assert.equal(loginDestination(approved,'kings-ridge-kings',false),'/course/');
});
