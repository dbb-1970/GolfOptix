# Field interface — 18 November 2026

Owner authorized implementation and publication of the phone scope classification in MOBILE-WORKFLOW-SCOPE-20261118.md. This release is not owner sign-off on every screen: the screen-by-screen critique remains open.

## Behavior

Phones default to Today, Map, Schedule and More. Field execution remains available: tickets and approvals, one-off work, map repairs and existing feature edits, condition/meters, parts/fuel transactions, current pin jobs and events, and actual chemical records. Budget/report summaries avoid building the detailed desktop ledger. Actual chemical entry is split into three steps, preserving validation and entered values.

Small notices describe the fuller computer/tablet tools. Full tools on this device restores existing authorized setup, and Return to field view reverses it. This is presentation only, not authorization. Existing permissions and transaction/version checks remain authoritative. No course data migrations or source SVG edits.

Phone Crew and equipment pages defer optional starter catalogs. Real map backup/recovery UI loads when full tools are requested. Shared operational snapshots and required model dependencies are retained for consistency; this release does not claim to shrink every data transfer.

## Undo

Baseline: 2a48bc32e5a8208d235ebf62f0ec849ab514a2cd.

1. Individual: select Full tools, or open the workspace with `?interface=full` (append `&interface=full` if it already has parameters). The session preference only affects presentation.
2. Global presentation rollback: set `window.GOLF_FIELD_MODE_ENABLED = false` in public/assets/field-mode-config.js, bump its HTML cache version and redeploy. This disables field-only rendering and restores the existing phone layout. No operational records are changed.
3. Full code rollback: revert this release commit against the baseline and redeploy. Do not reset operational data or restore a course backup to undo a UI release.

## Validation

Automated regression suite and syntax checks, plus fixed 420 × 800 demo browser checks. Browser checks use fictional records, not live course changes. Physical iPhone Air/Chrome touch, keyboard, GPS and outdoor use still require owner field verification. Desktop/full-tools fallback and Spanish labels are included in release checks.

Verification result: 291 automated checks passed. Browser checks confirmed field/full reversibility, calendar navigation, selected-hole map space, compact budget/reports, chemical form step validation and value retention, equipment condition saving against fictional inventory without changing baseline, pin setup fallback, events/learning navigation, Spanish notices, and intact desktop Add equipment controls. No real course data was edited. Demo session condition changes are temporary. Owner iPhone field acceptance remains pending.
