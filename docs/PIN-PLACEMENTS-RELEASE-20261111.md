# Pin placements and cup cutting — November 11, 2026

## Delivered behavior

Maintenance → Pin placements offers two paths: superintendent-entered named setups and a calculated front/middle/back rotation. Labels can be letters, numbers or custom names. A saved setup contains per-green zones or a schematic approach-view point, with field directions. Exact green outlines, slopes, cup coordinates and yardages are not inferred. Approved atlas geometry and irrigation source layers are unchanged.

The calculated path balances front/middle/back across the selected greens, then rotates those zones on each scheduled job. It creates A/B/C or 1/2/3 setups; a label prefix allows a separately named set. Existing setups can be reused with a manual pattern of up to 31 steps, including repeated steps.

Rotations are finite: daily, weekly, every two weeks, or monthly, with a required last date within one year of the start. Monthly dates clamp to the last day of a shorter month and return to the original anchor day afterward. The pattern advances on work dates. One shared work order per date combines **cutting cups and moving pins**; worker assignment is optional. Duration covers the whole selected route, not each hole. Assigned jobs use the existing protected roster and email queue. A long assigned rotation creates a separate ticket notification per date; this release does not introduce a daily digest.

Each job retains the setup version and green-by-green snapshot used when planned. Setup edits do not rewrite earlier dated sheets. Managers can change an untouched job's date, setup or assignee, retaining its earlier snapshot and reason in history. Stopping a rotation cancels only untouched jobs from today onward, preserving past, worked and closed records. Overlapping pin jobs on the same green/date, conflicting worker bookings, invalid dates and stale revisions fail without a partial save.

The maintenance calendar has a Pin placements & cup cutting filter and direct links to the dated sheet. Assigned pin jobs also appear in Crew schedules. Pin sheets link to the same Crew work order; workers log work and request closure, and superintendent/authorized assistant approval closes it. Ordinary workers see only their assigned tickets and attached pin snapshots, not the whole setup library or other workers' records.

Printed sheets show the job's date, setup label, planning zones/diagram, instructions and status; closed sheets show the approving person/time. The print layout uses six columns for the 18-green sheet. Browser print settings and unusually long custom notes may span additional pages. Sheets are plans until work is recorded and closure approved; they are not certified precise pin-position sheets.

## Walkthrough, navigation and documentation

Three new full-tour steps and a Pin placements chapter explain the two paths, repeat schedules, printing, assignment and approval. The short overview includes a pin-planning introduction. Workspace navigation targets are sized consistently, with mobile wrapping. English and Spanish UI labels and instructional text are included; original course-entered notes remain original, with optional reviewed Spanish job instructions.

`docs/LEARN-AREA-PLAN.md` outlines a future signed-in illustrated instruction library. No empty Learn button or claim of a complete library is shipped.

## Storage and verification

Pin setups/rotations are part of the existing private Crew document, and dated snapshots are in work orders. Course permissions, optimistic concurrency, actor attribution and full-course recovery apply. No database reset or atlas regeneration is involved. The public demo uses temporary per-tab storage; testing creates no Kings records or real email.

Validation covers recurrence and month ends, calculated zones, preserved snapshots, stopping future jobs, access controls, booking conflicts, retry idempotency, work logs and manager approval, and serialization/recovery validation. A full-year synthetic 18-green rotation produced 366 jobs and about 1.87 MB of shared state in roughly 1.1 seconds locally; this is a local capacity check, not a production latency guarantee. Browser checks cover calculated daily jobs, a custom weekly pattern and diagram, calendar links, manager approval, Spanish, and phone layout.

## Limits and next improvements

No surveyed green geometry, GNSS capture, exact measured cup distances, slope/safe-area selection, exclusion zones, recovery-distance optimization, or automatic field verification. No golfer-facing public pin-data API or external vendor integration. Those require reliable course measurements, appropriate source rights and field review. The first release supports holes 1–18 per selected track; select the relevant greens for smaller tracks. Data and ticket history remain even when a rotation is stopped.

Research: Visage's rotation guide (https://visagehelp.com/downloads/Visage-PinPlacements.pdf?ver=1.0) and Unknown Golf's daily location/pin-sheet workflow (https://help.unknowngolf.com/article/xf4flqkbcz-can-i-set-the-pin-location-while-marking-the-course). General workflow concepts informed the feature; no vendor UI, private data or surveyed coordinates were copied.

Release checks: all 179 automated tests passed. The new walkthrough chapter was checked through all three steps in Spanish. Navigation targets measured 132 × 44 px on desktop and 114 × 44 px on a 390 px phone viewport, with no horizontal page overflow. All browser work used the public fictional demo; no real course record or email was created. Native printing uses the browser print dialog; physical-printer settings remain user-controlled.
