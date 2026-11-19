// Offline verification only. No cloud connection, live write or email dispatch.
import fs from'node:fs/promises';import{verifyStartingRecovery}from'../netlify/lib/quick-start-recovery.mjs';
if(!process.argv[2])throw Error('Provide the downloaded starting recovery JSON.');const saved=JSON.parse(await fs.readFile(process.argv[2],'utf8')),{report}=verifyStartingRecovery(saved);console.log(JSON.stringify(report,null,2));
