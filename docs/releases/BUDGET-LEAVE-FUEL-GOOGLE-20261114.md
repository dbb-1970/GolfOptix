# Budgets, receipts, crew availability, fuel and Google Calendar
November 14, 2026

## Included management access
The public offer, calculator and shared quote now include up to ten management users at $225/month or $2,250/year. Ordinary crew remains included. Additional management users above ten remain $25/month. Existing individual pilot agreement price snapshots are retained; the new standard allowance does not rewrite negotiated financial terms.

## Where to find the tools
Maintenance → Daily work → More tools: Budgets; Expenses / receipts; Fuel; Time off; Google Calendar. Crew has a time-off link. The Calendar shows approved/pending absences and planned fuel refills. Manager work tickets show attributed spending and a budget link. The public Test Drive contains fictional starter business records only.

## Budget convention
Course-wide or project-specific nonoverlapping date ranges; full annual allowance or remaining allowance at a midyear cutoff. Dashboard: allowance, posted spend, remaining, unspent work commitments and available after commitments. Work plans store a project and total expected budget spend. Actual attributed spending reduces remaining commitments; completed/cancelled work stops reserving a commitment. Unpriced labor/product purchases are explicitly incomplete. CSV export has formula-safe cells.

Budgets count purchased parts, purchased chemicals, actual fuel deliveries, confirmed manual expenses and costed work logs. Consumption of previously purchased stock is not counted again. Fuel and chemical opening balances do not count as new purchases. Parts receipts from the existing stock module count as purchases. Positive stock adjustments are not automatically assumed to be supplier purchases. This is operational budget tracking, not general-ledger accounting, bank reconciliation or payroll processing.

A work-order estimate must reflect expected budget spending, avoiding a second allowance for already purchased inventory. Parts and fuel consumption costs are separately visible in work-order budget reporting. Labor rates are private manager-set snapshots, not paid payroll deductions.

## Receipt safeguards
Camera/file chooser → resize → private image archive → optional OCR → manager review → project/task attribution. JPEG/PNG/WebP; stored JPEG from browser, max 1600px and 2 MB. Manager-only upload/download and origin-checked writes. SHA-256 image IDs detect reuse. Link a receipt to an existing recorded purchase to avoid a duplicate expense. Linked totals must match the source when priced. Voids retain history; voiding a linked receipt does not erase the source purchase. Receipt history images are included in shared recovery bundles with integrity checks; more than 30 MB requires segmented support rather than a false complete-archive claim.

OCR is optional Google Cloud Vision, disabled until GOOGLE_VISION_API_KEY is configured. Images are sent only on explicit extraction request. OCR failures leave manual review available; no extracted expense posts automatically. The backend receipt service has authenticated byte-storage tests. Native mobile camera behavior and end-to-end browser image selection still require field-device verification; the automated browser file chooser stalled during local review. No real receipts were used.

## Crew availability
Workers submit/cancel only their own requests. Managers approve/decline and record sick calls. All-day end dates are exclusive; partial-day ranges supported. Approved absences block newly created/moved assignments and flag existing work for reassignment. Existing overlap approval needs explicit coverage acknowledgement. Calendar markers and Google exports say unavailable without medical reason/private notes. No PTO accrual balances, payroll deductions or shift exchange are claimed.

## Fuel
Configurable US-gallon/liter tanks, capacity, current unit price, measured opening balance, deliveries, equipment/task issues and measured corrections. Weighted-average inventory costs; immutable movement ledger; no overdrafts or overcapacity. User-defined low threshold, target fill and lead hours. Hourly scheduled check creates one pending refill task per tank; manual threshold check also available. Pending refill costs are course-level commitments. Receiving an actual delivery closes the refill and posts spending once. Tasks appear in Calendar. This schedules a human refill task; it does not place a supplier order, charge money or operate a tank/controller.

## Google connection status and boundaries
Server-side OAuth code flow with PKCE, expiring browser-bound state and one-use callback. Tokens encrypted with AES-256-GCM in a separate server store; no tokens in course exports or browser responses. Each manager has a per-course connection and writable-calendar selection. Current manager permission is checked on scheduled runs. No unrelated Google events imported. Up to 100 explicitly selected course items per connection; dated window 30 days past/335 days future. Jobs, course events, approved absences and individual recurring plan occurrences supported. Only selected items sync. Automatic checks every five minutes plus Sync now.

Concurrent sync lease, local source versions and Google event ETags prevent silent overwrites. Simultaneous edits produce review conflicts. Started/chemical/pin work and unsupported recurring-series edits remain protected. Google deletion is held for review. Deselect/disconnect retains existing remote copies. Switching calendars requires deselection. A Google Cloud project, production consent/verification, OAuth credentials and live round-trip test remain required before this can be described as a working customer integration. No Google account was connected and no customer calendar events were created during implementation.

## Validation
Full build passed 265 checks before final packaging. New coverage: budget/remaining-date logic; linked receipt deduplication; fuel purchasing/usage/overdraw/refill commitments; worker financial privacy and own-request restrictions; absence coverage and blocking; OCR draft parsing; receipt authorization/byte storage and unconfigured fallback; token encryption; OAuth state/PKCE; selected sync idempotency, Google time import and simultaneous-edit conflicts. Local browser confirmed budget save and manual expense posting. Live Google/Vision integration and actual phone camera behavior remain unverified until external setup/device testing.

Owner setup instructions: ../GOOGLE-CLOUD-SETUP.md
