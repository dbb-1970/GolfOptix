import {getStore} from '@netlify/blobs';
import {admin} from '@netlify/identity';
import catalog from '../../public/course-catalog.json' with {type:'json'};
import {dispatchCrew,emailReady} from '../lib/crew-email.mjs';
export default async()=>{if(!emailReady())return;for(const course of catalog.courses.filter(c=>!c.publicDemo))for(const track of course.tracks.filter(t=>t.available))await dispatchCrew({getStore,admin,course:track.id,limit:10});};
// Netlify scheduled functions cannot be invoked through a public URL.
export const config={schedule:'*/5 * * * *'};
