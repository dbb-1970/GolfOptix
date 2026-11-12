# Ground under repair, events, briefings and quote sharing

Release date: November 11, 2026. These changes extend the operational application; the engineering atlas, source geometry, valve inventory and pinned map assets are unchanged.

## Ground under repair

Open a hole → Edit map → Draw repair area. Choose finger/mouse tracing or tap/click boundary corners. The preview closes the outline; a full-map confirmation is required before saving. Pause drawing to pan or zoom. Undo a point, clear the draft or cancel before saving. The drawing is an operational polygon, never a source engineering feature. It has a separate Ground under repair layer and retains its course/hole registration in overview, hole views and printed maps. Custom area names receive a GUR prefix for recognition.

Saved areas can be named, moved, redrawn, removed/reopened and restored using the existing reversible map history. Removing an area does not falsely close an unfinished repair work order. Operators can report work on the area with the existing work-order controls. Source evidence stays intact, and shared-map authorization, revision checks, recovery and actor history apply. A remote shared-map refresh pauses an active outline for review rather than mixing drawing with pan gestures. Removed areas must be restored before redrawing. Each outline supports 3–500 finite points; this is tracing on the selected course drawing, not a surveyed/legal boundary or GPS measurement.

## Workspace function tabs

Map, Maintenance, Calendar, Crew, Garage, Pins, Chemicals and Events use equal-sized page-navigation tabs with a selected state. On phones they wrap into two rows. Ordinary crew-only accounts retain their own-work navigation; existing server authorization remains the authority. Header account/language controls remain separate. Printouts omit navigation. The Learn library remains planned, not a dead tab or a claim of completed documentation.

## Course events and work availability

Maintenance → Course events, or the Events tab, supports tournaments, shotgun starts and other special events. Enter the true course-clear/work-resumption window and affected holes, or the entire track. A window can span up to 31 days. Information-only events stay visible without blocking work. These are course-entered windows; no tee-sheet vendor or event provider is connected.

Existing work is not moved or erased when an event changes: conflicts are flagged for review. New planned Crew assignments and work orders enforce event blocks, with only an authenticated manager's recorded override permitted. Emergency reports can still be created during an event, with an explicit clearance-review hold; dispatching work into a blocked window still requires the recorded manager override. Overrides remain in work and actor history. The same checks apply when a pin route, chemical assignment or equipment work order is created through Crew. Calendar-only repeating plans and unassigned service reminders are flagged for review on the calendar; they are not physical control instructions and are not automatically rescheduled.

Preparation tasks have concrete instructions, dates/times, optional workers and a readiness deadline for the relevant event day. They appear in Crew and the maintenance calendar and follow work-log → closure request → manager approval. Preparation inside a blocked window requires a manager override. Changing an event keeps earlier tasks/history; managers review and adjust readiness deadlines. Untouched preparation jobs can be cancelled with a reason rather than pretending the work was completed. Cancelling an event releases its work restriction while preserving its tasks and history for review.

## Week and day work briefings

Crew defaults to Week view. Select a day to drill down, use Back to week, or select Day view directly. The schedule includes regular assignments and all assigned work-order types: map repairs, equipment/pumps, pin/cup routes, event preparation and chemical tickets. Supervisors can view/filter their team; workers remain restricted to their own schedule and tickets. Cancelled jobs can be included explicitly; completed jobs retain their status.

Preview & print this week/day creates a clean, role-scoped briefing with worker, time range, location, classification, status, instructions, deadlines and availability notices. It supports browser Print / Save PDF. The projection excludes employee DOB, email addresses, account data and pay rates. Course-entered notes remain original or use reviewed Spanish instructions; labels and guide text have English/Spanish versions. The preview is a timestamped snapshot, not a live-updating paper record. Calendar-only reminders stay on the maintenance calendar. Full chemical instructions and pin sheets remain attached to their authoritative records; a briefing does not replace them.

## Share my quote

The public calculator's Share my quote button describes sending an estimate and GolfOptix link to a supervisor, superintendent or director. It provides an email draft, copy estimate/link and copy link. The user reviews and sends from their own email app; GolfOptix does not automatically send quote emails or collect the recipient. The share URL contains only pricing choices/counts and restores the calculator, using current published prices. It contains no sign-in, course location or personnel data. Invalid link values fall back to default pricing. Estimates are USD, separate the visit, preserve founding-course conditions, and do not apply private waivers or claim to be binding contracts. Existing prices are unchanged.

## Walkthrough and learning library

The 83-step full public tour includes repair boundaries, course events, availability/preparation and week/day briefings, with a Course events chapter. The overview also mentions events and briefings, and the closing slide mentions quote sharing. No tour step sends email, performs printing or saves operational work. `docs/LEARN-AREA-PLAN.md` retains the proposal for a future signed-in illustrated library; the new navigation uses tabs.

## Validation and deployment boundaries

All 194 automated tests pass. Automated tests cover event scopes/timing, manager overrides, preparation deadlines/cancellation, multiday windows, retained records, polygon validation/undo/source separation/shared geometry, briefing privacy/drilldown/Spanish instructions, and reproducible quote calculations/links. Existing authorization, conflicts, recovery and history tests are retained. Browser checks use only the fictional Test Drive: event and prep creation, calendar entries, rejection of conflicting work, explicit override, a repair outline/layer/overview, full-map confirmation with cancelled draft preserved and confirmed save, phone controls, team/day print preview, worker-only Spanish briefing, email-draft URL and copied/reopened quote settings.

No live Kings records, workers, quotes or emails were created during development. Physical phone hardware/freehand feel and printer-specific settings are not claimed as field-validated; the phone layout, corner-input path, print preview and underlying geometry were checked. No paid services, tracking pixel, payment charge, or third-party calendar/tee-sheet integration was added.
