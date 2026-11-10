# Maintenance workspace — November 10, 2026

## Result

A wrench icon labeled **Maintenance** on the desktop course overview and a persistent Maintenance icon in the phone's map navigation open one work-tools hub. Calendar and Repairs are grouped inside. The phone menu is now Holes, Search, Layers, Maintenance and More (five entries instead of six). The hub and calendar retain obvious routes back to the course map and account; the logo still returns home.

- Real hub: `/maintenance/?course=kings-ridge-kings`
- Real calendar: `/maintenance/calendar/?course=kings-ridge-kings`
- Public fictional hub: `/test-drive/maintenance/`
- Public fictional calendar: `/test-drive/maintenance/calendar/`
- Repairs opens the existing map with `?panel=repairs`, selecting the phone repair drawer on first map load.

The existing calendar model, records, storage keys and API are unchanged. Existing `/maintenance/` bookmarks now open the hub, from which the calendar is available. Query-string `demo=1` no longer changes a real Maintenance page into a public demonstration. Demo behavior is selected by its distinct `/test-drive/maintenance/` path. The old demo calendar query URL is retired; all current application links use the new paths.

## Access

Netlify role rules protect all `/maintenance/*` pages, including direct index/calendar HTML URLs, with the same approved admin/Kings-member roles as the real course. Unauthenticated requests redirect to login. Private/no-store headers apply. The hub additionally checks the authenticated session's course list and refuses an unapproved requested course. The shared calendar API continues to enforce server-side course membership and authenticated writes. The public Test Drive contains only fictional sample data and does not access real course calendars.

These edge role rules reflect the currently available Kings deployment. New course/member roles will require an access-rule update as courses are added; API course authorization must remain authoritative.

Map repair/edit records remain browser/account-local. Calendar plans remain shared online. This navigation change does not claim shared map repairs or a new equipment inventory system.

## Inventory/catalog requirements confirmed by David

These are the requirements for the next implementation, not deployed capabilities:

- GolfOptix's reference catalog is a selection library. Browsing/selecting a catalog entry creates no course inventory record or tracking.
- A superintendent explicitly adds an actual asset to their course inventory and provides current hours, mileage or the relevant baseline reading before tracking begins. Non-metered equipment has an explicit No meter / Not applicable selection. Preserve baseline value, unit, date and authenticated person; do not invent earlier use, service or failures.
- Any kind of custom equipment can be added, including equipment missing from the reference catalog.
- General custom model information can contribute to the common catalog. Publish only reviewed, reusable equipment metadata: manufacturer/model, generic type/specification and permitted source evidence. Keep community submissions distinct from manufacturer-verified references and reconcile duplicates.
- Private inventory fields must not propagate into the common catalog: serial numbers, hours/mileage, installation/location details, ownership, tenant/asset identifiers, staff/contact information, custom identifying nicknames, maintenance/cost history, or unrestricted notes/photos/attachments and metadata. Use an allowlist and review before sharing; omission of two named fields is insufficient anonymization.

The Equipment & parts card is plainly labeled **Next to build** with no misleading working inventory button.

## Validation and rollback

All 58 existing automated tests passed. New/changed browser scripts passed syntax checks. Desktop and 390px phone previews verified hub-to-calendar navigation, demo sample plans, hub-to-repairs opening the phone drawer, the five-item navigation and the Maintenance icon. Live checks are recorded after publication.

Rollback base: `c1aaa0ab33931aabc420d6e4ace72009df0f847f`. Revert this release's committed files through a normal Git revert and deploy. No data migration is needed because this change only reorganizes routes/navigation and strengthens page access.
