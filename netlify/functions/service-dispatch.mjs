import {getStore} from '@netlify/blobs';
import catalog from '../../public/course-catalog.json' with {type:'json'};
import {dispatchService} from '../lib/service-dispatch.mjs';
export default async()=>{for(const course of catalog.courses.filter(c=>!c.publicDemo))for(const track of course.tracks.filter(t=>t.available))await dispatchService({getStore,course:track.id});};
export const config={schedule:'15 * * * *'};
