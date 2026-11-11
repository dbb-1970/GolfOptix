# Operations release — November 11, 2026

## Authorized decisions

Implement the competitive recommendations; preserve Kings terms; manual billing (no Stripe); research paid chemical/weather providers before any connection or purchase; provide English/Spanish interface controls and keep the demo walkthrough current. No real course work orders, inventory or workers are created by this release.

## Implemented scope

- Daily work: dated dispatch board, signed-in crew-screen mode, direct assigned-ticket workflow; reusable templates and reviewed bilingual job instructions.
- Actual minutes are additive work-log entries. Manager-only USD loaded rates snapshot at entry time. Staff projections omit rates and costs.
- Explicit manager-written technician access enables equipment, service and parts without personnel management or closure approval. Job-title text or user metadata cannot grant this access.
- Garage/pump QR labels generated locally with qrcode-generator 1.4.4 (MIT). Codes contain the authenticated course/equipment URL, not serials, passwords or access tokens.
- Date/meter service supports opt-in hourly scheduled order creation. Idempotent dispatch, conditional writes, no duplicate open service and required work instructions. Missed date occurrences catch up seven days; meter service awaits approval and next-threshold advancement.
- Parts references, receipts, FIFO allocations, issues against open tickets, audited full-issue reversals, low-stock display, private cost reporting. Manufacturer-documentation status is user-supplied evidence, not independent fitment certification.
- Reports: planned/emergency/unclassified counts, recorded actual time and cost, parts cost, open breakdowns, explicit out-of-service duration from condition transitions, confirmed replacement quantities by manufacturer/part number. Replacement counts are not population/exposure-based failure rates or proven causality.
- CSV equipment/template model imports and unused-import rollback; equipment export and full operational JSON. Calendar CSV imports and unused-import rollback. All operations retain course scope and shared revision conflict protection.
- Offline draft notebook caches only a generic shell, never private API responses. Notes are account/course scoped in sessionStorage and expire within 12 hours; demo drafts reset sooner with the demo. Explicit review/send rejects changed ticket versions and retains the draft; replayed command IDs avoid duplicate work logs. This is not general offline map editing or background synchronization.
- Readiness checklist, acceptance/start dates, Day 15/30 dates, implementation gate and manual billing terms. Kings implementation-only billing and Ridge waiver remain explicit. No payments collected or contracts silently revised.
- English/Español local interface dictionary and complete walkthrough translations. No external translation service receives private page contents. Original notes, IDs and manufacturer names remain as entered; bilingual work instructions require manager review. Remaining untranslated descriptive/product text must be captured during language QA; no regulatory document translation is certified.
- Short overview, full guided journey and chapter entry points; operations, technician, QR and work-time steps added. All walkthrough samples avoid real saves/printing/email.
- Health endpoint reports liveness without customer information; internal course support cases record impact, reproduction steps and status. No external monitoring or support-email delivery is claimed.

## Deliberate external boundaries

No weather feed, radar tiles, machine/sprayer API, chemical database, translation service or payment provider was connected. Provider licensing/cost and chemical requirements are researched separately, as requested. GPS/survey accuracy, manufacturer parts applicability, agronomic models and compliance remain evidence-gated.

The existing operational APIs remain limited to enabled course catalog entries. The readiness workflow makes onboarding repeatable for configured courses; provisioning new real tracks and their source maps remains an administrator-controlled setup step. No invented course map or fake cross-customer onboarding is presented as complete.

## Release validation

Run the repository build, new operations/concurrency/privacy/CSV/offline tests, isolated full-record recovery tests and browser checks. Use only the fictional demo and synthetic in-memory records. Test Spanish controls without allowing translated captions to break stable selectors. Re-run the competitive comparison after verification; retain limitations in the sales description.

### Completed local release checks

- Build completed with **143 passing tests**, including concurrency, role separation, historical part identity, retained pilot start, reviewed repair translations and assigned-worker weather holds.
- Browser checks used only the fictitious Test Drive: 25-minute work log/report, spring stock 8 → 7, equipment QR, weather hold carried to calendar, translated guide chapters and ordinary-worker Spanish ticket/work-log flow. A language change retained typed notes. Phone-sized checks used a 390 × 844 browser viewport, not a physical-device certification.
- All long static page copy and the complete 68-step guide have local Spanish entries. Dynamic labels and messages have broad coverage; capture remaining combinations during field QA. Native browser prompts, personal/custom notes and manufacturer documents are not automatically translated.
- Language controls remain accessible inside native modal tickets. Each signed-in account has a separate choice on that device; it is not a cloud-synchronized preference.
- Privacy wording now reflects shared operational storage, temporary demo tab storage and local note drafts. No new external data processor was connected.
- Atlas/master and pinned map geometry were unchanged. No production customer record was created or edited by these checks.
