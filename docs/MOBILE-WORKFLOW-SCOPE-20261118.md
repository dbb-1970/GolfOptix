# GolfOptix: proposed phone / desktop workflow scope

18 November 2026 · DISCUSSION DRAFT · Nothing removed, restricted, redesigned or deployed by this review.

## Basis and limitations

Inventory of the current local implementation: public routes and UI action handlers in crew-app.js, calendar-app.js, maintenance.js, gps-map.js, field-locations.js, coverage.js, ground-repair.js, pump-app.js, operations-app.js, business-ui.js, chemical-app.js, pin-app.js, event-app.js, reports-ui.js, learn-app.js, backup-ui.js, recovery-ui.js, admin.js, login.js and account pages; cross-checked against the learning catalog and workspace navigation. The prior phone audit supplies browser layout evidence. This is a workflow scope review, not a claim to have executed every possible combination of data, permissions, failures and live transactions. No real records, emails, account permissions or chemical inventories were changed to produce it.

Target: iPhone Air / Chrome. Desktop recommendations can include a sufficiently large tablet, but a tablet should not simply be identified as desktop by width or user-agent. Frequency alone is insufficient: retain tasks where location, camera, immediate action, safety or field observations matter.

Legend:
- **PHONE**: retain a complete, purpose-built phone workflow, subject to existing permissions.
- **LIGHT**: retain a concise phone view and selected quick actions; move broad setup/bulk editing to desktop.
- **DESK**: recommend desktop-first editing/configuration. Keep necessary read-only information available on the phone through relevant tickets/assets. Do not enforce restrictions before owner approval.

## A. Daily work and work orders

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| A01 | My Day: own assignments, instructions, status, time and location | PHONE | Primary field landing screen; show work before setup controls. |
| A02 | My Week: own upcoming assignments | PHONE | Simple dated list; drill into a day or ticket. |
| A03 | Superintendent daily dispatch / whole-team day | PHONE | Separate team view from personal work; urgent/unassigned work prominent. |
| A04 | Read ticket, reviewed Spanish instructions and history | PHONE | Essential at the place of work; retain original instructions too. |
| A05 | Record work performed and actual minutes | PHONE | Short repeated entry; identify actual worker where authorized. |
| A06 | Submit draft closure | PHONE | Crew finishes in the field; approval remains separate. |
| A07 | Approve closure / return for more work | PHONE | Superintendent may physically inspect before approval. |
| A08 | Reopen a repair / cancel an assignment | PHONE | Retain reason, confirmation and actor history; manager permissions. |
| A09 | Create emergency work / report an obstruction | PHONE | Urgent field action; collect minimal required fields first. |
| A10 | Create a one-off planned task, assign or reassign it | PHONE | Managers need to respond while away from the office. |
| A11 | Edit long instructions, resource assignments and estimates | LIGHT | Quick corrections on phone; broad planning at desktop. |
| A12 | Create / revise reusable job templates and reviewed translations | DESK | Deliberate authoring; phone can assign an existing template. |
| A13 | Assign from a saved job template | PHONE | A short worker/date/time/equipment flow. |
| A14 | Offline draft notebook, review and send work-log drafts | PHONE | Important in weak signal; never imply queued drafts are online saves. |
| A15 | Preview a day/week briefing or individual ticket | PHONE | Useful shared reference; save/print action can remain secondary. |
| A16 | Bulk briefing printing and crew-display configuration | DESK | Office/shop preparation; mobile viewing stays available. |

## B. Calendar and weather

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| B01 | Today/day calendar and previous/next day | PHONE | Default operational view, not setup forms. |
| B02 | Week calendar | PHONE | Agenda or day cards, not tiny desktop columns. |
| B03 | Month / arbitrary date range / extensive filters | LIGHT | Compact overview and date navigation; detailed planning on desktop. |
| B04 | Open work from the calendar | PHONE | Link to the original ticket/application/equipment record. |
| B05 | Move one scheduled item to another date/time | PHONE | Tap/select date as an alternative to drag; preview conflicts. |
| B06 | Review a scheduling conflict or event restriction | PHONE | Clear affected jobs and workers, not just a colored indicator. |
| B07 | Resolve a conflict by reassignment or single reschedule | PHONE | Manager field decisions; retain warnings/override evidence. |
| B08 | Skip/reopen one occurrence or start work | PHONE | Short daily actions. |
| B09 | Create a simple one-off watering or course-care task | PHONE | Select an existing process and area; keep recurrence optional. |
| B10 | Build long recurring watering, fertilizing or course-care programs | DESK | Many dates and assumptions; phone displays and adjusts occurrences. |
| B11 | Change/archive/restore a recurring plan | DESK | Show downstream impact; allow individual field exceptions on phone. |
| B12 | Import/export calendars and roll back unused imports | DESK | File review and bulk consequences. |
| B13 | Forecast icons, highs/lows and F/C choice | PHONE | Fast field context; unforecast days remain unknown. |
| B14 | Weather detail, Calendar Insights and source/age | PHONE | Explain suggestions; no silent rescheduling or chemical prescriptions. |
| B15 | Record field weather review, hold/release recommendation | PHONE | Actual field conditions belong beside the work. |
| B16 | Accept an alternate work window / schedule inspection | PHONE | Manager review and confirmation required as currently implemented. |
| B17 | Google Calendar connection, sync settings and reconciliation | DESK | Account linking and broad sync decisions; sync health and schedule viewing on phone. |

## C. Crew and personnel

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| C01 | Team availability and worker's today's assignments | PHONE | Superintendent operational view; ordinary crew sees only own work. |
| C02 | Request own time off / report absence | PHONE | Short worker workflow. |
| C03 | Approve/decline absence and review affected jobs | PHONE | Managers respond promptly; do not silently delete existing work. |
| C04 | Copy one worker's week / month forward | DESK | Bulk scheduling, conflicts and date review. |
| C05 | Add worker, DOB, email, title, permissions and welcome email | DESK | Personnel setup; title changes may affect privileges. |
| C06 | Edit/archive/restore personnel profiles or resend welcome email | DESK | Administrative actions, not daily crew navigation. |
| C07 | View appropriate worker contact, title and qualification status | LIGHT | Only necessary fields; no broad DOB/private-record display. |
| C08 | Attach/edit/archive credential records, scope and evidence references | DESK | Careful recordkeeping; badges are not official authorization. |
| C09 | Check credential / expiry status for an assignment | PHONE | Relevant to field supervision; existing role restrictions remain. |
| C10 | Crew change-history and email-delivery administration | DESK | Audit/administration; show concise failures to relevant managers. |

## D. Maps, irrigation, landscape and locations

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| D01 | Overview, choose hole, pan/pinch/zoom/fit | PHONE | Core field capability; controls must not obscure the map. |
| D02 | Toggle lines, valves, labels, coverage, pumps, GPS, repair boundaries | PHONE | Simple layer drawer, not permanent control panels. |
| D03 | Search for a sprinkler/valve/line/repair | PHONE | Fast route to the relevant feature. |
| D04 | Read asset label, current issues and maintenance history | PHONE | Compact sheet first, detail on request. |
| D05 | Report map repair, urgency, assigned worker and scheduled response | PHONE | Same work-order approval/history flow as other repairs. |
| D06 | Capture ticket/equipment/feature field position and obstruction status | PHONE | A genuine reason to use the phone; retain accuracy/source/time. |
| D07 | Resolve/update a field-location incident | PHONE | Field state changes immediately; preserve history. |
| D08 | GPS-refine one sprinkler, valve or other feature position | PHONE | Field verification; requires alignment and acceptable measured quality. No claim of automatic 3-foot precision. |
| D09 | GPS alignment: map reference/check points and coordinate registration | DESK | Sensitive map calibration; phone must retain reference-point coordinate capture for field survey work. Separate collection from alignment approval. |
| D10 | Correct one asset label or move a feature manually | PHONE | Explicit edit mode, confirmation and undo; does not alter source evidence. |
| D11 | Add a single confirmed missing sprinkler/valve/landscape feature | LIGHT | Useful in field; deliberate editing, never accidental browsing gestures. |
| D12 | Trace/redraw Ground Under Repair | PHONE | Field tracing is central; provide undo points and clear finish/cancel. |
| D13 | Resize/rotate an existing garden, rock/tree/water/sand feature | LIGHT | Retain sliders and preview; complex shapes better at desktop. |
| D14 | Inspect coverage / adjust one sprinkler radius and pattern | LIGHT | Useful during irrigation checks; full coverage project at desktop. |
| D15 | Establish measured hole scale / configure coverage alignment | DESK | Field measurement collection can remain on phone; configuration is careful setup. |
| D16 | Draw/redraw water-line geometry and connected features | DESK | Precision work; phone can flag required corrections rather than force finger drawing. |
| D17 | Remove/restore a mapped feature or return to source geometry | LIGHT | Manager-only deliberate action with history; secondary tool, not browsing control. |
| D18 | Print/save a highlighted hole work order | LIGHT | Keep access; printing and batch preparation are desktop strengths. |
| D19 | Whole-course landscape/layout editing and infrastructure reconciliation | DESK | Authoritative comparison and precision; never invent infrastructure. |
| D20 | Map version review, full backup/import/download/delete/restore | DESK | Broad consequences; phone may show save/sync/version status. |
| D21 | Shared recovery-point creation and isolated restore drill | DESK | Operator-controlled recovery, not a field toolbar action. |

## E. Garage and pump stations

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| E01 | Find equipment / scan an existing equipment QR link | PHONE | Direct access to the machine in front of the worker. |
| E02 | Open pump house from map / see components | PHONE | Critical field navigation; no separate competing primary phone tab necessary. |
| E03 | Read condition, current meters, service due and active work orders | PHONE | Immediate operational information. |
| E04 | Record hours/mileage/meter reading | PHONE | Short, frequent and captured at machine. |
| E05 | Report breakdown and mark field location | PHONE | Essential; one shared ticket, not disconnected equipment/map notes. |
| E06 | Change equipment/station operating condition | PHONE | Authorized staff must mark out of service/reduced capacity and restore after checks. |
| E07 | Open/perform due service and record work | PHONE | Mechanic's day-to-day workflow. |
| E08 | Read manufacturer's applicable document and component/part references | PHONE | Available at the equipment; preserve unverified compatibility labels. |
| E09 | Reserve available equipment for one task | PHONE | Fast manager decision; conflict checks remain. |
| E10 | Add inventory from known catalog/custom equipment; enter baseline/serial/warranty | DESK | Detailed onboarding. Catalog entries are not installed inventory or tracked failures. |
| E11 | Build component hierarchy / replace equipment or installed component | DESK | Structure and identity changes require deliberate review; field work logs and parts issues stay mobile. |
| E12 | Create/edit recurring date/meter service rules and automatic dispatch | DESK | Long-term planning, references and thresholds. Phone can create a one-off work order. |
| E13 | Register pump station, areas served and full installed composition | DESK | Configuration. Placing/checking a station's actual map location stays mobile. |
| E14 | Generate/print QR labels and bulk inventory exports | DESK | Workshop/office preparation; phone uses labels. |
| E15 | Read detailed equipment history and costs | LIGHT | Concise history by default; full ledger/comparison desktop. |

## F. Parts, stock, fuel, receipts and budgets

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| F01 | Find part reference and available stock for a job | PHONE | Mechanic must see what's available at point of work. |
| F02 | Issue a part to a work order; record suspected/confirmed failure diagnosis | PHONE | Keeps repair history and future failure counts useful. |
| F03 | Reverse an erroneous issue with a reason | PHONE | Authorized correction at the time of work; retain history. |
| F04 | Receive a small parts delivery | LIGHT | Compact scan/search/quantity flow if supported; bulk purchase/catalog entry desktop. No barcode capability is assumed. |
| F05 | Add/edit parts catalog, prices and compatibility documentation | DESK | Exact-model/serial evidence review and careful master data. |
| F06 | Record fuel issued to equipment / actual delivery / tank reading | PHONE | Field/shop event; quantity, unit and inventory type must be unambiguous. |
| F07 | Review low fuel / planned refill and update delivery timing | PHONE | Operational response; never implies an automatic supplier order. |
| F08 | Configure tanks, capacity, fuel/unit and refill thresholds/lead times | DESK | Infrequent setup with potentially broad consequences. |
| F09 | Capture receipt image and review extracted details | PHONE | Camera is valuable; extraction is a draft until reviewed and posted. |
| F10 | Quickly attribute a receipt or cost to a ticket/project | LIGHT | Mobile capture/simple linkage; complex reconciliation desktop. |
| F11 | Void/correct/reconcile expenses, stock costs and allocations | DESK | Deliberate financial review with audit trail. |
| F12 | Annual/remaining budget entry, amendments and project setup | DESK | Strong fit for owner's example; remove from normal phone navigation. |
| F13 | Budget status / recorded spend / available allowance | LIGHT | Managers may need answers in field; keep concise read-only summary. |
| F14 | Quick work-order estimate / cost context | LIGHT | Useful before authorizing a repair; complex allocation desktop. |
| F15 | Loaded labor rates / financial scope / full ledger exports | DESK | Sensitive setup and analysis; not crew UI. |

## G. Chemicals, applications and turf guidance

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| G01 | View assigned spray/fertilizer job and instructions | PHONE | Applicator's field work; permission-aware. |
| G02 | Read reviewed product label, SDS, PPE and restrictions | PHONE | Keep accessible before and during work; do not bury behind office setup. |
| G03 | Record actual application date/time, area, quantities, wind/temp, calibration and checks | PHONE | Essential contemporaneous evidence. Break existing long form into steps; do not remove required information. |
| G04 | Save/submit actual record for approval | PHONE | Confirm observations, not prefilled planned amounts passed off as actual. |
| G05 | Review/approve or return actual record | PHONE | Manager may review in field; show meaningful summary and source detail. Approval posts stock and closes the linked work under existing rules. |
| G06 | Correct an approved application | DESK | Inventory reversals and audit consequences; pending urgent problems can be flagged from phone. |
| G07 | Browse/select/customize chemical references, documents, ingredients and expiry stock | DESK | Reference/master-data configuration and verification, not a quick field form. |
| G08 | Receive chemical stock / record measured count or waste | LIGHT | Useful in store; short product/unit/quantity flow; bulk corrections desktop. |
| G09 | Define measured treatment areas and measurement provenance | DESK | Geometry/units and baseline evidence; field measurements can be collected on phone. |
| G10 | Build application mix, rates, carrier volume and reusable recipes | DESK | Calculation-heavy preparation; phone displays the approved/dispatched instructions. |
| G11 | Build/copy future application plans and agronomic programs | DESK | Annual/seasonal planning and documentation. |
| G12 | Dispatch a prepared application / change assigned applicator | LIGHT | Keep manager confirmation on phone; review credentials, stock, documents and conflicts. No one-tap treatment prescription. |
| G13 | Cancel an unperformed application | LIGHT | Supervisor may need immediate field decision; preserve reservations/history and warnings. |
| G14 | Turf profiles/model thresholds and historical model analysis | DESK | Setup and evidence-heavy review; models are guidance, not treatment instructions. |
| G15 | Record actual field weather/irrigation observations | PHONE | Local observations are valuable inputs; don't replace them with forecasts. |
| G16 | Review an inspection flag and assign a field review | PHONE | Concise signal and source, then field decision. |
| G17 | Chemical reference CSV import, full exports and compliance-style reporting | DESK | Large records/documentation. Do not claim regulatory certification. |

## H. Pins and course events

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| H01 | View today's pin sheet and assigned cup-cutting route | PHONE | Actual setup happens on course. |
| H02 | Record fresh pin GPS / revise today's placement/setup | PHONE | Field position and condition-driven exception, authorized staff. |
| H03 | Record cup-cutting work and submit/approve closure | PHONE | Same combined pin-placement/cup-cutting ticket. |
| H04 | Print/save today's pin sheet | LIGHT | Keep action; bulk preparation/printing desktop. |
| H05 | Design named per-green pin setups and repeating patterns/horizons | DESK | Many greens/dates; desktop comparison makes errors easier to catch. |
| H06 | Calculate front/middle/back rotation / stop future untouched jobs | DESK | Bulk future work, not recurring field navigation. Zones are not exact surveyed positions. |
| H07 | View tournament/shotgun restrictions and preparation jobs | PHONE | Needed to avoid conflicts with play. |
| H08 | Quick event time/window update or preparation-task assignment | LIGHT | Authorized exception on phone; preview affected work, never silently reschedule it. |
| H09 | Create multi-day event, affected holes, restrictions and preparation plan | DESK | Careful operational planning; keep mobile view and quick changes. |

## I. Reports and learning

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| I01 | Incomplete/urgent work-order queue and drill into source ticket | PHONE | Actionable supervision; emergency-first and scheduled-date order. |
| I02 | Fleet condition / open breakdown summary | PHONE | Useful now; source equipment is one tap away. |
| I03 | Budget, chemical stock/use, fuel and crew-load summaries | LIGHT | A few readable indicators and simple filters, existing permissions. |
| I04 | Budget-to-machine-to-ledger analysis, historical trends and project scope | DESK | Wider comparisons and detailed evidence. |
| I05 | Component failure quantities / patterns and downtime analysis | DESK | Analysis across records; phone retains failure entry and asset history. Do not call raw counts failure rates. |
| I06 | Full report tables, custom financial periods, CSV exports and report printing | DESK | Desktop strengths; don't force sideways tables as the primary phone experience. |
| I07 | Search/read illustrated how-to guides and assigned course lessons | PHONE | Task help where the worker is using the app. |
| I08 | Walk through a class / view source taught version | PHONE | One step at a time; may also use shop display/desktop. |
| I09 | Record class attendance | LIGHT | Simple attendee check list for authorized managers. |
| I10 | Author/edit/publish course lessons, many steps/images and reviewed translations | DESK | Content authoring and review; mobile consumption remains. |
| I11 | Print handout/class packages and bulk learning administration | DESK | Office preparation. |
| I12 | Guided demo walkthrough | PHONE | Focus on core field tasks; separate optional office-setup chapter. |

## J. Accounts, onboarding, support and public pages

| ID | Current scenario | Proposal | Reason / phone boundary |
| --- | --- | --- | --- |
| J01 | Sign in/out, course/track selection, reset/change password | PHONE | Must work on actual live origin; a local demo without API cannot authenticate. |
| J02 | Change own language, name/contact/profile | PHONE | Simple personal settings; course requests don't grant access. |
| J03 | Course signup/new-course request and public pilot/contact forms | PHONE | Prospective customers may come from email/phone. Minimal stepped forms. |
| J04 | Course onboarding, maps/inventory import and acceptance checklist | DESK | Administrative preparation and source review; pilot status may be read on phone. |
| J05 | Owner account approval, course membership/access and account administration | DESK | Sensitive administration; no ordinary crew access on any device. |
| J06 | Bulk welcome-email/delivery administration and owner notification dispatch | DESK | Administrative management; user-facing delivery errors need clear mobile messages. |
| J07 | Support issue reporting/status and error/draft help | PHONE | Needed when stranded in field; do not make support desktop-only. |
| J08 | Full equipment/operational import/export and unused-import rollback | DESK | File review, duplicates and broad effects. |
| J09 | Home/features/pricing calculator/share quote/contact/legal pages | PHONE | Public discovery/conversion, not internal office clutter; retain mobile usability. |
| J10 | Manual billing/pilot agreement management | DESK | Billing is manual today; don't imply a delivered automated subscription console. |

## Proposed phone navigation

Four principal destinations: **Today · Map · Schedule · More**.

- Today: My work / Team work (authorized managers), urgent work and awaiting-approval items. Avoid duplicating My Day and My Week as separate permanent tabs.
- Map: hole picker, simple layers, field search, select asset/report issue. Explicit Edit mode for authorized map changes.
- Schedule: Day/Week; a month/date picker when needed. Existing plans and one-off field changes. Pin sheets and play restrictions appear with relevant work.
- More: Equipment, Crew availability, application records, receipts/fuel/parts, summaries, help, profile/language. Expose by role and context, not a 20-item flat menu.
- Pump stations are reached from their map icon or Equipment; chemicals from assigned applications or their workspace. Don't require a separate primary tab for every asset type.

Desktop keeps the full management workspace: configuration, long-horizon planning, finance, catalogs, bulk changes, reporting, backups and administration. Phone can link to an office-only task with a plain explanation, but not merely shrink the desktop form or block a user halfway through it. A deliberate optional advanced escape hatch can be discussed; no permanent device lockout is proposed without approval.

## Boundary decisions needing owner discussion

1. Is annual budget entry desktop-only, while budget status remains a manager phone summary? Recommendation: yes.
2. Are one-off work scheduling, reassignment and closure approval all fully mobile? Recommendation: yes.
3. Keep application field records fully mobile but move mix/program design to desktop? Recommendation: yes.
4. Keep precise feature field correction/GPS/GUR mobile, while whole-map setup, pipe drafting and recovery live on desktop? Recommendation: yes, retaining reference-coordinate capture on phone.
5. Keep rapid inventory/part/fuel transactions mobile while catalogs and setup stay desktop? Recommendation: yes.
6. Hide office tools from normal phone navigation, or prohibit all mobile access? Recommendation: hide by default; agree any hard restrictions per workflow, with clear alternatives.

## UI simplification versus actual device load

Hiding buttons is not a performance optimization by itself. course-auth.js and play-start.js currently load course, pump, operations, chemical, pin, event, conflict, field-location, crew, work-order and map-edit modules before map bootstrap finishes. Reducing that graph requires tested dependency splitting; removing a script ad hoc can break linked work orders and map state.

After scope approval: load map assets by visible hole; load optional coverage/GPS/editors and specialist screens when needed; avoid rendering every record/long report into the initial phone DOM; add paging/search where inventories grow. The current shared transaction snapshot is also a data-boundary concern: a lighter phone view alone does not reduce its payload. Any server projection/pagination must preserve membership, worker-only access, revision/conflict checks and history. These are implementation proposals, not delivered capabilities or measured speed improvements.

## Audit / release status

This scope discussion pauses the screen redesign at **My Day — In review**. Nothing is approved. After agreement, audit one retained phone workflow at a time and use the existing owner rule: revise → explicit approval → commit/publish → verify production → mark complete → advance. Desktop changes caused by shared controls also require verification. Saved records and course geometry must remain untouched by this scope review.
