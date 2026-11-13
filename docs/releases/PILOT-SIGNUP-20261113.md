# Public pilot / waitlist signup — 13 November 2026

Public URL: https://golfoptix.com/pilot/

Three steps: contact name/email/phone; course name/address/phone; current software (multi-select dropdown with removable selections, Other entry, spreadsheets/paper and None). Back retains entries in page memory. Required fields and explicit follow-up consent are checked by browser and server. No payment, account creation, access grants, or subscription activation.

Nine substantial feature highlights use captured screenshots of the released fictional Test Drive, not generated UI illustrations. Screenshots can be enlarged; application planning includes calendar/weather and application-record views. All people, inventory, work and weather pictured are demonstration data. No private customer records or unfinished GPS UI are shown. Weather copy describes available forecast context and entered actual observations; it does not claim automatic spray authorization or a connected paid provider. Screenshot sources: public demo captured 13 November 2026; static dates are examples.

POST /.netlify/functions/pilot-signup accepts same-origin production requests only, validates a bounded whitelist and explicit contact consent, rejects honeypot entries and oversized payloads, and rate-limits the trusted Netlify connection IP to 20/hour in a separate private hashed counter store. Equivalent daily submissions deduplicate by their normalized payload. Storage errors cannot display success. No form values are put in URLs, analytics or browser storage.

Applications are stored in the existing private admin-only owner inbox (`golfoptix-owner-alerts-v1`, owner/inbox) as pilot_application events. The existing scheduled owner dispatcher sends pending events to the verified owner recipient with contact, address, course phone and current-system details. Provider acceptance is not proof of delivery. The Admin notification panel exposes expandable application details and reference. No applicant email or SMS is sent automatically. The page confirms storage, not email delivery or acceptance into the pilot.

Entry points: homepage navigation and founding-course pricing block, plus Contact. Sitemap now includes home, Contact, Privacy and Pilot only. Operational pages stay private/noindex.

Validation: private in-memory integration tests cover validation, origin/method/body failures, storage outage, atomic throttling, deduplication, owner queue and notification contents. Browser tests use synthetic inputs in an isolated memory-only preview; no production application or notification is created. Desktop/mobile layout, back/next retention, multi-select/Other, enlarged screenshots and Escape dismissal are checked. Existing GPS work remains unrelated and excluded from publication.

Current-system references checked: ASB taskTracker https://asbtasktracker.com/ ; Nuturf (taskTracker / SPaRKS / Playbooks) https://nuturf.com.au/tasktracker ; Toro supported tools https://www.toro.com/en/product/IntelliDash ; GreenKeeper https://www.greenkeeperapp.com/marketing/index.php/about/ ; TurfCloud https://www.greensightag.com/turf/turfcloud ; SkimTurf https://skimturf.com/ . This is a selection list, not a claim of integrations or exhaustive vendor coverage.
