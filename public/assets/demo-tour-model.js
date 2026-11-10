export const tourPages = {
  map: '/test-drive/', maintenance: '/test-drive/maintenance/',
  calendar: '/test-drive/maintenance/calendar/', crew: '/test-drive/crew/'
};
export const tourSteps = [
  {page:'map',target:'.test-drive-notice',title:'Your morning starts here.',text:'You’re the superintendent of Juniper Cove. Explore your course, plan maintenance and organize your crew. This fictional Test Drive resets when you leave or it expires. NEXT opens the controls; the tour never saves edits or sends emails.'},
  {page:'map',target:'.map-controls',title:'Get close. Keep your bearings.',text:'Drag to move the map. On a phone, pinch to zoom; on a computer, scroll. Use + and − for smaller steps. The crosshair button fits the current course or hole back into view.'},
  {page:'map',target:'#hole-list',prepare:'holes',title:'Go straight to a hole.',text:'Choose a hole here or tap its numbered marker on the overview. NEXT opens Hole 3 as our example. Course overview always takes you back to the whole course.'},
  {page:'map',target:'.layer-section',prepare:'layers',title:'Choose what you see.',text:'Water lines, Valves, Sprinkler labels and Sprinkler coverage each have their own switch. White circles are heads; black triangles are valves. Coverage is illustrative until you supply a known distance and radius.'},
  {page:'map',target:'.rename-form',prepare:'sprinkler',title:'Every feature has a story.',text:'Tap a sprinkler, valve, line or landscape feature to open its details. Here you can correct a label, move the feature and review its history. Landscape features also have size controls. Map changes require your confirmation and can be undone.'},
  {page:'map',target:'#repair-note',prepare:'repair',title:'Turn a problem into a repair.',text:'Describe what is wrong, choose the work-order hole and optionally name an assignee. Flag red & save notes keeps the feature highlighted in overview and hole views. Record completion to clear the alert while retaining its history. This map assignee field does not send a Crew ticket email.'},
  {page:'map',target:'.coverage-editor input[type=range]',prepare:'coverage',title:'Dial in the sprinkler’s reach.',text:'Drag Coverage radius to preview the changing radius. Choose a full, half or quarter circle and save when ready. Feet require a hole scale from a known ground distance. The tour only opens these controls; it does not change the radius.'},
  {page:'map',target:'#new-landscape-type',prepare:'add',title:'Build the course you know.',text:'On a hole page, choose a tree, shrub, flower bed, pond or sand trap, then Add landscape. Sprinklers, valves and water lines have their own buttons. Place the feature, confirm the change, then select it to move or resize it. On a phone, use Edit map to find these tools.'},
  {page:'map',target:'print',prepare:'print',title:'Take the work into the field.',text:'Print work order produces the current hole with its open repairs highlighted. You can also use Undo for an accidental map edit. Nothing is printed automatically during this tour.'},
  {page:'maintenance',target:'#hub-workspace',title:'A home for course maintenance.',text:'This is the superintendent’s maintenance hub. The calendar plans watering and applications; Map repairs returns to the course’s repair list. Equipment inventory is planned, rather than an active feature to try today.'},
  {page:'maintenance',target:'#hub-calendar',title:'Plan ahead, then record the work.',text:'Open the maintenance calendar for watering, pesticide and fertilizer plans. NEXT takes you there. These are work plans, not remote controls for irrigation equipment.'},
  {page:'calendar',target:'.calendar-create',title:'Start with the job.',text:'Choose Schedule watering, Schedule pesticide application or Schedule fertilizer application. NEXT opens an unsaved watering form so you can see how a plan is built.'},
  {page:'calendar',target:'#cf-hole',prepare:'watering',group:'watering',title:'Be specific about the location.',text:'Choose a hole or the entire course. Add an exact area and a zone or circuit label if helpful. Give the plan a name your team will recognize. No plan exists until you press Save.'},
  {page:'calendar',target:'#cf-repeat',prepare:'watering',group:'watering',title:'Set the timing once.',text:'Choose the first date, start time and duration. Does this repeat? lets you plan daily, weekly or monthly work. Application forms also ask for the product, amount and restrictions; GolfOptix does not choose a product or application rate for you.'},
  {page:'calendar',target:'.calendar-view',title:'See the work your way.',text:'Switch between Month, Week and Upcoming work. Open planned work to record completion, skip a visit or adjust the plan. The calendar’s Assigned to text records a name; use Crew when you want an assigned ticket and email notification.'},
  {page:'calendar',target:'#calendar-crew-link',title:'Now organize the people.',text:'Crew connects individual schedules and work tickets. NEXT takes you to the superintendent’s Crew workspace. Moving between demo pages resets that page’s practice edits; your tour progress carries on.'},
  {page:'crew',target:'.calendar-view',title:'One crew. A clear plan.',text:'Use Month for the big picture, Week for the working week and Day for today’s assignments. Filter to one worker when planning an individual’s schedule. As superintendent, you manage the crew; ordinary workers see only their own work.'},
  {page:'crew',target:'#crew-field-email',prepare:'worker',group:'worker',title:'Invite a worker.',text:'Add a worker with their name, email, job title and optional date of birth. The email becomes their login. In a real course, saving queues a welcome with a temporary password and the correct course and track. The demo creates no real accounts or emails.'},
  {page:'crew',target:'#crew-field-jobTitle',prepare:'worker',group:'worker',title:'Give the right level of access.',text:'Assistant Superintendent enables Crew management when assigned by an authorized manager. Other new crew titles are read only: their own schedule and tickets. Dates of birth and personnel details stay private to managers.'},
  {page:'crew',target:'#crew-field-workerId',prepare:'assignment',group:'assignment',title:'Give the job to a person.',text:'Assign work / shift starts a ticket. Choose a worker, describe the job, set its date, start time and duration, then select the hole or course area. NEXT shows where the detailed instructions go.'},
  {page:'crew',target:'#crew-field-notes',prepare:'assignment',group:'assignment',title:'Make the next action obvious.',text:'Write clear work instructions here. Create ticket & assign work saves the assignment; on a real course it also queues the worker’s email. Your worker can read and print their ticket. Managers record completion or cancellation.'},
  {page:'crew',target:'#crew-field-target',prepare:'copy',group:'copy',title:'Repeat the schedule, not the typing.',text:'Copy one worker’s week or month into a destination period. Existing assignments are retained, new tickets start Scheduled, and overlapping work blocks the copy. Review the source, destination and worker before saving.'},
  {page:'crew',target:'.crew-assignment',prepare:'tickets',title:'A ticket for every assignment.',text:'Select a scheduled job to open its instructions and Print this ticket. Managers can edit, complete or cancel it. Real-course ticket changes queue email updates; the demo sends nothing. No print or save is triggered by the tour.'},
  {page:'crew',target:'#crew-back-map',title:'You’re ready to take the wheel.',text:'Return to the course map whenever you need it. Try the controls, make a practice edit and explore your workflow. END INSTRUCTION closes this guide. The Superintendent tour button lets you start again at any time.'}
];

export function readTour(raw, now=Date.now()) {
  const fresh={version:1,active:false,seen:false,index:0,updatedAt:now};
  try { const s=JSON.parse(raw); if(s?.version===1 && typeof s.active==='boolean' && typeof s.seen==='boolean' && Number.isInteger(s.index) && s.index>=0 && s.index<tourSteps.length && Number.isFinite(s.updatedAt) && s.updatedAt<=now && now-s.updatedAt<3600000) return s; } catch {}
  return fresh;
}

// Keep the flyout on screen, preferring a clear side of its actual target.
export function placeFlyout(target,card,viewport) {
  const gap=18,pad=16,bottom=viewport.height-(viewport.bottom||0)-pad;
  const clamp=(v,min,max)=>Math.max(min,Math.min(v,Math.max(min,max)));
  const x=clamp(target.left+target.width/2-card.width/2,pad,viewport.width-card.width-pad);
  const y=clamp(target.top+target.height/2-card.height/2,pad,bottom-card.height);
  const choices=[{left:target.right+gap,top:y},{left:target.left-card.width-gap,top:y},{left:x,top:target.bottom+gap},{left:x,top:target.top-card.height-gap}];
  return choices.find(p=>p.left>=pad&&p.left+card.width<=viewport.width-pad&&p.top>=pad&&p.top+card.height<=bottom)||{left:clamp(viewport.width-card.width-pad,pad,viewport.width),top:clamp(bottom-card.height,pad,bottom)};
}
