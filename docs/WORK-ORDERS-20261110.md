# Shared work orders, execution and closure approval — November 10, 2026

## Scope and authority

Crew tickets and map repairs now share the private course-scoped Crew store. Existing assignment records remain in assignments; map repairs are separate workOrders keyed by stable repair IDs and linked to stable feature IDs. No original SVG, irrigation coordinates or source evidence changes. There is no bulk migration or invented legacy authorship.

Workers see only their own assigned tickets, including linked map repairs. They can Record work performed and Submit for closure. Superintendent/admin access and manager-assigned Assistant Superintendent roles can approve closure, return it with notes, reopen closed work and edit assignments. Other scheduling, roster and personnel actions remain manager-only. A typed map assignee name never grants access: linking an actual Crew worker does. Server checks use active worker identity and stored manager privileges, never a submitted actor/role or profile title.

At least one signed work log is required before submission. Submit for closure is a draft close: status pending_closure, with requester, notes and time. Only an authenticated manager can Approve closure, and only from that pending state. Approval records the approver, verification notes and time. Return for more work retains the request in history and restores in_progress. Reopening retains all prior closure history. An instruction or assignee change invalidates a pending closure and requires resubmission. The old direct assignment.status completed action is rejected, including from older clients. Manager cancellation is distinct from completion; it cannot clear a map repair.

Each new ticket records the authenticated opener and an append-only per-ticket history of assignment, work notes, closure request, approval, correction, reopening and edits. Expected record versions, course revision, ETag compare-and-set, origin checks, idempotency and readback remain enforced. This records who logged/reported the work, not independent proof of physical completion. New records keep identities and display-name snapshots. Historical records without opener/approver information are labeled Legacy — not recorded; no person is backfilled as a verified original actor.

## Map and calendar

New repair reports save online before a successful report is shown. Work orders have Planned maintenance or Emergency (unplanned), work date, planned response/start time, duration and optional linked Crew worker. A draft-closed repair remains highlighted on overview, hole view and print; only approved completion removes that alert. Other open issues on the same asset remain highlighted. Shared repair state refreshes on visibility and roughly every 30 seconds. Browser map geometry is still browser-local; shared repair records do not synchronize custom geometry. A work order attached to another browser’s custom feature remains available in Crew/calendar even when that custom geometry is absent locally.

Legacy browser-only open repairs have an explicit Share work order online action. Original browser issue/history is retained locally as unverified legacy evidence. The authenticated publication itself is recorded online; it does not claim the publisher was the original reporter. Unclassified legacy tickets remain visibly unclassified until a manager classifies them.

Maintenance calendar Month, Week and Upcoming work include Crew assignments and map work orders on their work dates, with labels, status and links to full tickets. Completed/cancelled work is included via Show completed and skipped work. A Work order type filter distinguishes planned, emergency and unclassified records. Calendar downloads include the visible authorized work-order record collection, with no personnel roster or DOB. Watering/application schedules remain planning records; their free-text assignee field does not create a Crew execution ticket.

Assigned tickets queue transactional worker emails, including map repair tickets and classification/activity notes. Superseded pending notices are coalesced; actual acceptance/delivery limits remain as documented in Crew. Manager review is presented in Crew’s awaiting-approval queue; supervisor notification emails are not added by this release. No real worker, work order, credential or email was created in Kings as QA.

## Demonstration and backups

Demo work orders carry between Test Drive pages in sessionStorage in the same tab, separate from real course records. Refresh, leaving the Test Drive or ending/resetting it clears them; validation enforces a one-hour absolute and 15-minute idle limit. They never call the live write API or send email. The existing sample plans and geometry keep their page-reset behavior. Tutorial navigation marks internal demo navigation, and its copy explains this distinction. Demo role selection can exercise worker submission and superintendent/assistant approval.

Map backups may include a cached representation of shared repair state. Restoring that cache cannot alter online approval/history: the shared store remains authoritative and the next synchronization reasserts it. Offline/server failures do not fall back to a locally successful closure.

## Validation and rollback

97 automated checks pass, including own-ticket authorization, forged role/actor rejection, both ticket types, assistant approval, no direct completion, required pending state, correction/reopening, stale writes, idempotent approval, privacy projections, pending-map-highlight behavior, notification content and pending-closure invalidation after an edit. Browser QA exercised worker log → draft close → manager approval, emergency map report → pending highlight → calendar ticket → approval → cleared highlight, plus Assistant Superintendent approval at 390 × 844.

Rollback baseline: ef30cbe80ebcc47c6b2418377723077c9d15c066. Preserve the private Crew Blob data. A code rollback to the old client/API would not understand the new workflow, so do not allow operational writes through that old version without a deliberate compatibility review. No DNS, provider key, infrastructure geometry or existing user permissions were changed.
