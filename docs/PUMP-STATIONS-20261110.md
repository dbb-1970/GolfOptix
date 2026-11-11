# Pump stations and landscape additions — November 10, 2026

## Use

Open Maintenance → Pump Stations, or the Pump Stations map link. Add a station, name it, set its condition and place it using the map crosshair and Save station location. Existing engineering geometry is unchanged. Station locations are explicitly superintendent-entered; the three historic source photographs did not establish a verified pump-house location. No real Kings station or pump has been invented or seeded.

Tap a station icon to open its records. Map positions are stored in the course Crew document with the station, not in the historical SVG. They share the canonical master coordinate frame across overview and hole maps. Layer visibility can be switched independently. Icon size can be changed from Edit station. Back to map retains the prior hole/view in the same browser session.

Use Add equipment / component to select a reference category/family or custom equipment. The starter reference choices cover main/jockey/booster/well pumps, motors, drives, control panels, filters, sensors, meters, valves, tanks, intakes, generators and parts/consumables. Rain Bird station and Goulds e-SV references are product-family references, not an exact-model fitment catalog. Exact configuration and parts compatibility remain unverified until documented. Custom inventory labels, serials, readings, photos, contacts and notes remain private; no automatic cross-customer catalog publication occurs.

An equipment record begins on explicit Save equipment to inventory, with a current meter baseline, Reading unknown or No meter fitted. Unknown never becomes zero. Baseline history remains intact; Record meter reading adds later readings without decreasing the meter. Replacement creates a new identity and retires the prior one. Old components, repair history and installation details remain on their original IDs; physically reused components can be explicitly reparented. A nameplate thumbnail can be uploaded, resized locally and stored privately with the asset. Full-resolution attachment libraries are outside this release.

## Maintenance and repairs

Station and equipment service can be scheduled by date (once/daily/weekly/monthly). Equipment with a known current meter supports a next-due reading and service interval. Intervals and specifications are entered from the superintendent's manufacturer documentation or procedure; none is invented by the application. Pump plans live in the shared Crew document and are projected into the existing maintenance calendar. A plan occurrence becomes a planned repair work order when Open service work order is selected; the existing occurrence is then replaced by that work order in the calendar. Pump plans are edited/archived at their station; they are not chemical application records.

Meter service becomes due on recorded meter readings, not real-time telemetry or an inferred calendar prediction. Due meter work is also visible on its equipment card and can be opened as a work order. After manager-approved service, Set next meter service explicitly advances the threshold using the current recorded reading plus the entered interval. Full-station maintenance uses date schedules. Creating a recurring plan does not autonomously dispatch future tickets or emails. Assignment of an opened ticket uses the existing email queue and Crew permissions.

Report a breakdown records Planned or Emergency, suspected/confirmed/not-diagnosed cause, date/time, instructions and optional worker. Crew handles work logs, draft closure and manager approval. Pump repairs stay visibly flagged until approved; station capacity is manually entered and never inferred from one broken component. Component return to Operating from Out of service is blocked while an emergency repair remains unapproved. Diagnosis can be updated using Edit work order. Parts and labor can be recorded in work logs; a structured parts stock ledger, certified compatibility and downtime analytics remain future work.

## Security and recovery

Pump records extend the same private course Crew document, using its revision/ETag conflict protection, authenticated actors, idempotent commands and readback confirmation. Authorized superintendent/admin and manager-written Assistant Superintendent roles can manage them. Ordinary crew receive only assigned tickets, never the pump inventory, serials or photos; they can log and request closure on their own tickets. Pump repair issues are excluded from the original map-geometry state to avoid mixing evidence or invalidating source-asset schemas.

Full course recovery points already capture the complete Crew document, so stations, components, photos, plans, work orders and histories are included automatically. Recovery reports now enumerate pump records. Map-geometry version rollback does not replace current station inventory/locations or repair approvals, because those are facility records. Use full recovery archives for facility records. Provider-independent production recovery remains the controlled procedure described in SHARED-MAP-RECOVERY-20261110.md.

## Demo and training

The demo contains a labeled fictional station and a pump with a fictional 1200-hour baseline. Changes follow the existing tab-local Test Drive and clear on refresh, external exit, inactivity or expiry; they never reach live course storage or email. The expanded tour includes Pump Stations / Pump Houses in Choose what you see and Every feature has a story, then five map/station/component/scheduling/breakdown steps with read-only previews. Existing backup/recovery steps remain.

Rock Feature uses a group of shaded rocks; Flower Feature uses a garden bed with petaled flowers. Existing Flower bed records remain supported. Both are added as movable, scalable, rotatable landscape overlays; approved engineering files and source valve/head geometry remain unchanged.

## Manufacturer reference evidence

- Rain Bird main station configurations and component options: https://www-app.rainbird.com/products/main-irrigation-pump-stations
- Goulds e-SV product codes and configurations: https://www.xylem.com/siteassets/brand/goulds-water-technology/resources/technical-brochure/e-sv-series-60hz-technical-brochure-besv60-r16.pdf

These references establish categories/families only. They do not certify any installed Kings Ridge model, service interval, replacement part or hydraulic connection.
