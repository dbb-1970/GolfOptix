# Maintenance calendar, coverage and navigation — November 9, 2026

Rollback baseline: `9c856bd178bde1cd3dc2a17a94cce34b61050351`. This release changes application overlays and controls; no atlas SVG, valve inventory, source geometry or engineering evidence was edited.

## First maintenance workflow

Open **Maintenance calendar** from the course header or **Calendar** in the persistent phone navigation. The calendar header always offers **Open course map** and **My account**. The logo returns home. Month, week and upcoming-work views share the same event details. The phone starts with Upcoming work.

Use **Schedule watering**, **Schedule pesticide application** or **Schedule fertilizer application**. Enter the hole/area, first date, start time, duration, crew, instructions and optional repeat rule. Product is required for application plans. Amounts, units and restrictions are entered by the superintendent; the app does not recommend products/rates or operate equipment.

Open an entry to start, complete, move or skip that occurrence. A move requires a reason and leaves other repeat dates unchanged. Skipping requires a reason. Application completion requires notes. Completed occurrences preserve their planned product/instructions and actual amount independently of later plan edits. Archive retains records and history; it can be reversed. Changes record the authenticated editor, server time and before/after fields.

Shared calendars use the `golfoptix-maintenance-calendar-v1` Netlify Blobs store, one `courses/<track-id>` record per approved private track. The API checks membership and origin, uses course and record versions plus conditional ETag writes, and reads back writes before acknowledging success. A conflicting edit leaves the form in place for review. Public demo data never uses this API and resets on exit, refresh, 15-minute idle or one-hour absolute expiry. Never add customer records to the public source repository.

**Download calendar records** creates a JSON export. **Print this calendar view** prints the chosen view. Calendar exports currently have no import UI. Existing **Map backups** cover maps and map-overlay state, including coverage settings/scales; they do not replace or restore the online calendar.

## Editable sprinkler coverage

Use **Layers → Sprinkler coverage**, then select a sprinkler. The detail panel has **Sprinkler coverage · Edit radius & arc**; phones have a direct **Coverage** shortcut. **Coverage radius** is editable for each head. Arc defaults to 360°. Automatic overlapping circles use 65% of each head’s nearest-neighbor distance on the same hole, strictly as an illustration. They are not source irrigation observations or a hydraulic calculation.

Use map units for an illustration, or **Set hole scale from a known distance**: identify two points using the crosshair, enter their known separation in feet and its source. Then save a per-head radius in feet. Circles/arcs are geometrically circular in master-map coordinates and follow master-to-hole/card transforms, moved heads, removal/restoration and work-order prints. Start angles are clockwise from the top of the course overview, rotating with portrait views. Each hole’s fitted source geometry may still have local inaccuracies; a two-point scale does not survey or warp it. Actual throw depends on field conditions and equipment.

Coverage is generated in a dedicated top-level `sprinkler-coverage` group, never in the original water-line/head/valve layers. Map coverage edits are browser/account-local under the existing map storage model. Radius/arc edits retain before/after history and support Undo. Scale changes have a separate retained calibration history. Coverage visibility is a view control and defaults off. Saving a head’s coverage enables the layer for review.

## Navigation and help

Phone navigation always exposes Holes, Search, Layers, Repairs, Calendar and More. Map help explains exploration, move, size, add, repair and storage. Field help uses the actual button names. The logo and every footer show BETA. The original tightly fitted brand tagline is preserved.

**Valves** is a separate checked-by-default layer control. It changes visibility, retains every original valve observation and does not delete anything. Coverage also has its own visibility control.

## Continuous phone dragging fix

An SVG child receives implicit touch capture. When the stage takes over, the child’s bubbling `lostpointercapture` was incorrectly ending the drag after the first movement. Only genuine loss of the stage’s own capture now ends the gesture. The regression test exercises the actual course event handlers across multiple moves, the implicit transfer and touch release.

## Checks and remaining work

Automated tests cover permissions, origin checks, conflicting/replayed/failed writes, repeat schedules/month ends, occurrence moves, completion snapshots, archive/restore, circular/partial coverage, scaling/validation, coverage undo, existing map state, gesture math and the continuous-drag regression. Browser QA covers desktop and 390×844 phone layouts, demo watering/application creation, completion, field help, rescheduling, calibrated radius, layer controls and navigation.

Vehicle/tool service types are reserved in the model; fleet registration, service intervals and equipment workflows are future work. No satellite diagnostics, weather integration, notifications, chemical inventory, spray-controller integration or automatic irrigation control was added. Calendar times currently use America/New_York for the active Florida course. Full authenticated online saving and physical-phone touch behavior need a live account/device check if an authenticated test session is unavailable. Shared records currently use one course document; partitioning/retention is needed before large-scale usage.

Rollback the application with a reverting commit restoring the baseline files; retain online calendar data. Do not erase browser data or the Blobs store during rollback. Preserve downloaded map/calendar exports before any intentional data replacement.
