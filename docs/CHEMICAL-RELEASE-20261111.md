# Chemical Management and commercial presentation — November 11, 2026

## Scope and limits

This release implements course-owned chemical references, inventory, measured treatment areas, recipes, application planning, actual records, manager approval, reports, immutable PDF archives and sourced turf-model calculations. It also adds Contact, graphical open pricing and private owner signup/course-request notifications. Existing map geometry and source evidence are unchanged. No real Kings course worker, product, application, stock or weather record was created during development.

No weather subscription, radar service, chemical database license, agronomic service or billing provider was connected or purchased. Billing remains manual. Exact product data, use conditions and recordkeeping requirements require course review. This is not certified SPaRKS parity, an independently verified chemical database or universal regulatory compliance. The public showcase uses explicitly fictional products and synthetic observations.

## Core workflow

1. Add a reference for the exact formulation, manufacturer, registration/applicability, source, label and SDS revision. Browsing/adding references creates no stock. Course-manager evidence review is explicit.
2. Archive exact PDFs privately, or retain external source links. Links alone can change; a link is not an archived file. Uploaded PDFs are limited to 2 MB and delivered as authenticated attachments, not executed or publicly hosted. Only managers upload; ordinary workers download documents attached to their assigned applications. Files are content-addressed, immutable and verified by SHA-256.
3. Confirm opening stock with current quantities, units, lot, location, count evidence and cost if known. Subsequent receipts and adjustments are separate ledger entries. Unknown cost remains unknown. Expired lots cannot be dispatched for application; documented waste may remove them.
4. Confirm treatment size from a measured source. The illustrated atlas is not used to infer treated area. Quantities convert explicitly within mass or volume; liquid weight-based analyses require documented density.
5. Enter applicable rates for a measured area. Spray and granular modes calculate product totals and tank/hopper loads. Recipes retain entered rates and instructions; each application needs its own review. Copy-forward supports up to 52 distinct dates and clears instruction confirmation.
6. Dispatch assigns an operator, checks bookings and stock, and creates a linked Crew ticket. Stock is reserved rather than consumed.
7. The assigned operator records actual quantities, treated area, mixture amount, start/finish dates and times, wind, temperature, observation source, conditions, calibration and safety checks. Signed-in recorder and assigned operator are distinct when a manager enters work on their behalf.
8. Manager approval posts actual inventory once and closes the linked Crew ticket. Generic Crew closure cannot bypass chemical review. Corrections retain earlier approved records, reverse their ledger posting and post the corrected quantities atomically. An application with recorded work cannot simply be cancelled as unperformed.

## Reporting and portability

Application CSV includes product and document revisions, registration, operator/credential evidence, target, area, actual amounts/units, times, conditions and approval. Reports separate planned stock-cost estimates from approved actual use. Nutrient and active-ingredient quantities use entered documented weight analyses; missing analysis, density or prices are explicit. Micronutrient analysis entries are supported; absent constituents are not inferred.

Reference CSV imports are previewed, logged and limited to 100 rows. Imported products stay unreviewed and areas unconfirmed. Unused, unedited references can be archived through guarded import rollback; used records retain history. Complete chemical JSON retains all records and revisions; it is not by itself a PDF download bundle. Original PDFs are included in protected full-course recovery points and their isolated verification.

Current PDF recovery collection limit is 30 MB. Larger sets require a segmented-export enhancement; the system refuses to claim a complete point if the limit is exceeded. Existing downloadable archive response-size limits still apply, and may require separate export even when a stored point is intact. Do not advertise unlimited recovery archive size.

## Turf guidance

- Simple GDD: daily mean of minimum/maximum Celsius, lower base, no upper cap, explicit reset date and local threshold. It is not a product-specific PGR response curve.
- Simplified root-zone water bucket: sourced daily reference ET0 × reviewed coefficient, effective rainfall and area-specific irrigation; water capacity, initial deficit and efficiency are configured. It is not measured soil moisture or an automatic watering prescription.
- Smith–Kerns dollar-spot calculation: five complete observed daily mean temperature/humidity values, published logistic coefficients, documented 10–35 °C mean-temperature bounds, locally chosen review threshold and explicit enablement.

Forecasts never fill actual gaps. Missing observations suppress the relevant result instead of inventing weather. Observations retain immutable versions; model runs retain profile, model version and input-version references. Optional daily refresh uses entered previous-day data only. Thresholds can create explicit inspection tickets, never product/dose prescriptions or automatic applications. There is no regional radar or field-validated model deployment yet.

Sources: [Cornell PGR/GDD guidance](https://turf.cals.cornell.edu/pests-and-weeds/plant-growth-regulators/), [FAO water use](https://www.fao.org/4/x0490e/x0490e0a.htm), [Smith et al. 2018](https://doi.org/10.1371/journal.pone.0194216), [University of Delaware equation and temperature limits](https://www.udel.edu/academics/colleges/canr/cooperative-extension/fact-sheets/dollar-spot/).

## Owner notifications

Identity validation records a submitted signup request, before verification; the completed-signup event records completion, and profile events detect submitted course/track changes. A selector click alone is not collected as a lead. Crew-manager-created accounts are excluded from public acquisition alerts. Requests do not grant access.

Only selected name, email, requested course/track and verification state enter the private inbox; passwords never do. Delivery targets the verified site-owner/admin account from Identity, not an address supplied by the visitor. Pending messages use the existing Resend connection, in batches checked every five minutes offset from Crew mail. Conditional leases and a stable provider delivery key protect concurrent dispatch and uncertain retries. Unconfirmed delivery older than 23 hours or a changed owner recipient requires review; email acceptance is not inbox delivery.

The private Admin page shows recipient, connection and event delivery status. No real signup or test email was generated during validation. Identity-event storage failure is logged without private data and does not block registration. Scheduled reconciliation catches later account creation and changed requests missed by a hook. Its first scan starts with a ten-minute creation window and silently baselines older requests, avoiding a flood of historical signup mail. Subsequent scans resume from the last confirmed scan.

## Pricing and Contact

The owner requested the exact headline “less than your next foursome”. A supporting example compares four $60 rounds ($240) to the current $225 monthly service and identifies the visit separately. Current agreed rates remain: $225 monthly / $2,250 annual, three management users plus ordinary crew, first 18 holes; +$25 management user, +$75 monthly / $750 annual for another 18 at the same property; $500 site inspection and superintendent meeting by agreed scope; founding pilots by agreement. No existing contract or waiver is revised.

Contact is available in the footer and home navigation with info@golfoptix.com, site-visit information, public prices and support guidance. No new contact form, advertising pixel or gated-price collection was added. Pricing alternatives are a separate private decision paper, not live prices.

## Remaining dependencies before broader claims

- Maintained authoritative product/label/SDS data and integration rights; local product fields alone do not replicate SPaRKS' supplied library.
- Jurisdiction-specific review, exports and inspection acceptance; automatic label/rate/seasonal-use enforcement is not implemented.
- Local agronomic parameter validation with Jake, verified station data and a commercial weather/map agreement before live feeds or radar.
- Multi-customer scale, larger PDF archive export and operational monitoring/support exercises.
- Proprietary sprayer imports, advanced mix compatibility and product-specific agronomic response models need separate authoritative specifications.

## Validation

All 168 automated checks passed. Browser validation used only fictional demonstration records: an actual 1.2 kg application reduced stock from 20 kg to 18.8 kg after manager approval, recorded $12 cost and 0.120 kg nitrogen, and retained approval history. Spanish worker projection, demo guide chemical steps, Contact, and 390-pixel phone pricing/navigation were checked. No live customer data or test signup email was generated. Live email inbox delivery and field agronomic validation remain separate operational checks.
