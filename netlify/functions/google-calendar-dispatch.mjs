import {getStore} from '@netlify/blobs';
import {admin} from '@netlify/identity';
import {crewAccess} from '../lib/crew-api.mjs';
import {crewStore,readCrew} from '../lib/crew-store.mjs';
import {googleStore,configured,synchronize} from '../lib/google-calendar.mjs';
export default async()=>{if(!configured(process.env))return;const store=googleStore(getStore);for await(const page of store.list({prefix:'connections/',paginate:true})){for(const blob of page.blobs){const entry=await store.getWithMetadata(blob.key,{type:'json'}),c=entry?.data;if(!c?.tokens||!c.calendarId||!c.selected?.length)continue;try{const user=await admin.getUser(c.userId),state=(await readCrew(crewStore(getStore),c.course)).state;if(!crewAccess(user,state)?.manager||user.appMetadata?.crew_temp_required)continue;await synchronize({getStore,key:blob.key,env:process.env});}catch{/* The connection retains its prior confirmed state; retry at the next scheduled run. */}}}};
export const config={schedule:'*/5 * * * *'};
