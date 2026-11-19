# Quick Start — 19 November 2026

Owner authorization: build the superintendent Quick Start agreed in the onboarding draft. Kings Course remains the only active Kings Ridge track. No atlas or engineering geometry changes.

## Delivered flow

Eight resumable steps: course/tracks; per-resource sharing; known remaining budget; Crew/Super access and working hours; reference/custom equipment with honest starting meters; chemical/seed/material/part/fuel opening stock and facility names; first scheduled work; review/publish. Saving a draft changes no operational records. Publishing holds all newly queued welcome and work messages regardless of client draft flags. Message release is a separate manager action. A matching signed-in email links the Super's own worker profile. Unknown readings and stock values remain unknown; current fuel opening confirmation requires a known unit cost. Parts with unknown opening value must have that value reviewed before costed issue.

Entry: My Day Quick Start action, computer More, phone More → Account & help. Separate /quick-start/ and fictional /test-drive/quick-start/ routes. Drafts are privately versioned online; demo drafts/records remain session-only and reset with existing demo expiry/exit behavior. The phone wizard intentionally exposes setup without requiring Full tools.

Seed/material movements have a normal Operations workspace; working hours can subsequently be edited from a worker profile. Standard forms now separate job title from access level; legacy title-based Assistant Superintendent delegation remains until an explicit access level is saved. Delegated Super map-file delivery is checked against the current roster and pinned map hashes; unrelated crew cannot retrieve those files. Explicit Super authority is resolved server-side from active records, so demotion/archive revokes delegated access on the next request. Public self-edited profile fields cannot grant access.

The My Day description now has a separate gap before its action rows. The phone-only My work / Team today switch is hidden when returning to a computer layout, avoiding duplicate unspaced controls.

## Storage and activation

Existing courses read/write their original course blob until explicit setup publication. Publication first stores and reads back a checksummed starting property snapshot. A prepared root is written with compare-and-swap, then a conditional legacy-key redirect activates it. A concurrent live write winning that last comparison leaves legacy data authoritative; an orphan prepared root is ignored, and the next review uses the latest legacy records. There is no migration on ordinary reads or draft saves.

Activated records use a single property CAS root with independently grouped resource pools and track-local work/outbox/history. The adapter supplies the ordinary Crew state to existing consumers. All normal service, email and work writes continue through that adapter. Legacy records are recoverable in the starting snapshot; the old course key becomes a redirect, not a second writable copy.

Current automatic activation is deliberately limited to an existing single-active-track property. Kings has one approved active track; Ridge is not activated. Multi-track group composition/conflicts are modeled and tested, but a real multi-track activation must be coordinated before enabling additional tracks. Splitting a populated shared group requires ownership resolution and is refused rather than copying every asset into multiple inventories. Cross-track access, evidence archives and full-property recovery must be rechecked before that migration.

Course address/setup settings are retained as confirmed metadata; saving an address never moves maps or silently geocodes a forecast location. The course's existing scheduling time zone is shown read-only. Existing weather configuration is preserved. Temperature remains Fahrenheit by default. This release does not implement a global time-zone conversion or alter historical calendars.

## Recovery

After publication, Download starting recovery copy obtains the manager-only starting JSON. The checksum is validated, and every reconstructed track is passed through Crew validation before the snapshot is claimed. The offline verifier is `scripts/verify-quick-start-recovery.mjs`; it clones/validates without live writes or email. Existing full recovery-point drills still work on the projected operational state. The starting Quick Start copy is not a one-click live restore button.

To disable onboarding UI: remove its navigation links and disable the Quick Start endpoint while retaining property-store, model and permission adapters. Do NOT revert to the pre-release crew store after any course has activated, because that version cannot follow property redirects. Recovery to a prior operational state requires a coordinated, verified property procedure; do not replace one shared category or erase event history through an ordinary track write. The pre-onboarding snapshot retains the original record history.

## Validation / boundaries

Automated tests cover draft CAS/resume, non-mutating previews, explicit publication and release, forced hold despite a forged send flag, activation races, stale records, isolated checksummed recovery, unknown baselines/value, stock overdraw, independent resource sharing, shared booking conflicts, budget deduplication, and server-derived/revocable Super authority. Existing suite runs with these checks. Browser tests use only fictional local data; no live course edits or real emails.

Manual browser proof: new crew profile + confirmed mower + assignment → review → publish; phone crew self-link + assignment → published My Day displaying the exact assigned job; phone More → Account & help → Quick Start; resume completion; 420×800 and desktop layout checks. Illustrated bilingual support guide and practice class plus demo-tour chapter are included. Physical iPhone keyboard/safe-area behavior still deserves field confirmation.
