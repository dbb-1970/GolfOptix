# Phone usability review — 17 November 2026

Target reported by owner: iPhone / Chrome, tested at Kings Ridge. This release changes presentation and navigation, not course geometry, asset positions, GPS accuracy rules or operational records.

## Findings and fixes

- A selected hole at 390 × 844 had only 364 px of map height. Duplicate workspace tabs, language controls, a standalone Field locations launcher and explanatory status text consumed the remaining space. The revised map has 683 px (81% of this viewport), with a 52 px brand/course header, compact hole toolbar and bottom navigation.
- On phone maps, Holes, Search, Layers, Maintenance, Crew and More remain accessible. More contains other authorized workspaces, field locations, language, walkthrough, printing and backups. Desktop destinations remain tabs.
- A selected feature now opens a compact action strip. Move, Repair, Coverage/Size and Details remain available. Details deliberately expands the scrollable record; Close dismisses it. Long forms no longer open over half the map automatically.
- The initial instructional save-status paragraph no longer takes permanent map space. Actual status changes are announced; failure/offline/conflict/unsaved messages remain visible. Routine acknowledgements expire after six seconds.
- Other phone workspaces use one persistent native workspace selector instead of a multi-row wall of tabs. Field locations and the demo tour are reachable there rather than floating over working content. Only authorized destinations are copied; server permissions remain unchanged.
- Calendar course settings, filters, date jump, weather settings and insights are grouped behind an explicit disclosure. Schedule work is separately expandable. Day/week/month selection uses a compact native selector. Conflict warnings remain outside disclosures. The calendar content moved from below 1,580 px after the first cleanup to about 739 px after the second pass at 390 × 844.
- Crew profile and management controls collapse separately; worker-only view does not show empty management disclosures. Secondary equipment actions collapse, leaving scheduling and breakdown reporting immediately available.
- Inputs use 16 px text to avoid iPhone focus magnification. Dialog height is constrained to the viewport with vertical scrolling. Calendar-style dialog headings stay available while scrolling. Bottom map navigation accounts for the device safe area.
- Resizing back to desktop restores moved controls to their original parents, preserving handlers and entered values. Walkthrough targets expand their phone disclosures/detail sheet as needed. Learning instructions and Spanish interface phrases were updated.

## Review coverage

Browser viewport review, not a physical iPhone certification:

| Area | Checked |
| --- | --- |
| Map | Hole 3, overview navigation, zoom buttons, fit, selected sprinkler quick actions, expanded details, More drawer, destinations and language relocation |
| Calendar | Week and day navigation, view selector, settings disclosures, schedule-watering dialog, visible conflict summary |
| Crew | Schedule, add-worker dialog, work ticket, worker-only projection and destination list |
| Equipment | Garage list, equipment details, service scheduling dialog, actions grouping |
| Operations | Daily dispatch, budget, expenses and fuel screens |
| Reports | Overview, work-order status, filters and horizontally contained detail tables |
| Specialist tools | Chemicals, pumps, pin setup/rotation dialog, event dialog |
| Learning | Library, search/filter layout and phone navigation guide |
| Public pages | Home, login, pilot signup and contact |

At 390 px all sixteen recorded route shells fit the page width. Rechecked the map, calendar, crew, garage, reports and events at 320 px. Map initialization must finish before recording width: an early transient shell was wider; settled map width was 320 px with 579 px map height. At 760 × 390, the map had 229 px height. At 1280 × 900, desktop tabs/language returned; calendar settings, filters and insights returned to the main container with no mobile disclosures.

Local evidence is in `reviews/mobile-20261117/` (screenshots and viewport measurements; not operational customer records). No real user, course, ticket, GPS permission, email or financial record was changed during this review.

## Validation and remaining checks

- Full existing build and 286 automated tests passed. New and changed navigation scripts pass syntax checks.
- Desktop-to-phone-to-desktop restoration was checked in the browser.
- Still required on the owner's physical iPhone / Chrome: continuous one-finger panning, simultaneous two-finger pinch, browser address-bar expansion/collapse, keyboard opening during edits, and weak-signal on-course use. Browser viewport checks cannot establish these touch behaviors or GPS accuracy.
- Private account/owner-administration screens were not exercised with real credentials in this pass. Shared phone form constraints apply there, but this is not a claim that every role, dialog, device or data-dependent screen has been certified.
- Dense report tables intentionally scroll within their labeled table region; the page itself stays within phone width.

## Rollback

Baseline: commit `7e353c2` (reports release). This change is an isolated presentation release with no data migration. Revert this release commit to restore the prior layout; map geometry and stored operational edits are unaffected. Review dependencies before reverting if later work builds on these controls.
