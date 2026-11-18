# Mobile field course and walkthrough

Baseline: ff0eaccaeb7d5b38e2d9891d85008adf15d3a054.

## Entry points

- Demo walkthrough picker: Mobile-only walkthrough, its own highlighted row after the full superintendent tour. The full tour remains the default choice.
- Phone More: Mobile-only walkthrough starts directly.
- Desktop: the option opens /test-drive/mobile/ with a fixed 420 × 800 phone preview. This is a layout preview, not iOS/GPS/touch emulation.
- Learning → Course Library: GolfOptix in the field: phone essentials (class-mobile-field). The picker also links directly to the course.

The independent 17-stop walkthrough stays in phone field view. It covers navigation, hole selection, pan/zoom, layers, existing features and repairs, location accuracy, calendar/conflicts, crew and ticket approval, equipment, pumps, actual chemical records, budget summaries and Learning. Eight illustrated class steps include practical examples, checks for understanding, English/Spanish editions and a printable complete handout.

Tour progress is separate from the full superintendent tour and expires after one hour. The mobile journey does not grant roles, save records, request GPS, send email or submit applications. Ticket and equipment examples use existing unsaved preview hooks; the chemical form is read only and has disabled submission. Ending restores field view and removes owned previews. The demo's normal expiry/reset policy still applies.

## Undo

Revert this release and redeploy to the baseline; no operational data migration is involved. The existing field-interface configuration rollback remains available. Customer-authored lessons and historical attendance snapshots are untouched.

## Verification

Automated progress expiry, route scope, bilingual content, class asset and existing operational tests. Browser review follows the complete 17-stop route in a fixed phone frame, checks independent menu entry, Spanish guidance and class completion/return. Physical iPhone field acceptance remains separate.

Verification result: the 17-stop browser route reached the illustrated course in field view. Spanish instructions and the dedicated desktop picker launch were checked. No work, GPS request, stock transaction or email was submitted.
