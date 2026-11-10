# SkimTurf review and GolfOptix maintenance direction

Reviewed November 9, 2026. Public vendor information only; no account created, sales enquiry sent, or paid service purchased. Described capabilities are vendor claims, not an independent test of the software.

## Documented capabilities

| Area | Publicly described capability | Source |
| --- | --- | --- |
| Turf intelligence | Satellite imagery and AI-derived vegetation, moisture and nutrient indicators, map visualizations, alerts and recommendations. Web/iOS/Android access; cloud storage; task assignments and WhatsApp notifications are advertised. | https://www.skimturf.com/ |
| Course diary and field measurements | Configurable tables by course, hole groups or playing surfaces. Examples include height of cut, soil temperature, green speed, clipping volume, pH, applications and observations. | https://www.skimturf.com/blog/how-to-store-your-measurements-in-skim |
| Reporting | Year-over-year trends, selected time ranges, comparing indicators and weather, and reports scoped to course, holes or parts of holes. | https://www.skimturf.com/blog/reporting-gather-results-and-easily-explore-the-evolution-of-your-golf-course |
| Prescription workflow | A Prescriptions module defines zones from parameter ranges and sends maps through the John Deere Operations Center API to compatible GPS spraying equipment. This is more specific than simply recording a treatment. | https://www.skimturf.com/blog/skimturf-management-connects-with-the-john-deere-operations-center-tm |
| Soil moisture methodology | The vendor describes model-derived moisture from turf reflectance and reports using 6,785 TDR measurements in training. These are not direct readings from sensors on each customer's course. | https://www.skimturf.com/blog/new-in-skim-soil-moisture-measurements-on-the-entire-course |

## Questions still open

The homepage advertises 17 metrics, 1.5 m granularity and >80% accuracy, but those headline figures do not explain accuracy per metric, independent validation, image resolution versus analytical grid size, confidence intervals or cloud-affected delivery cadence. Some copy refers to two years of history and other copy to three. Confirm actual contract provisions and service availability; the reviewed pricing section provides an annual-subscription description without a dollar quote.

The reviewed pages do not establish the depth of fleet servicing, parts inventory, labor costing, timekeeping, payroll or offline editing. Absence from these pages is not proof the product lacks a feature. A real demo and documentation would be needed to confirm those areas.

## GolfOptix direction

Build an original workflow around the editable course map and maintenance history, rather than copying SkimTurf's interface or promising its satellite analytics. The owner selected the first workflow: a shared calendar for watering, pesticide and fertilizer schedules, including repeat plans, crew assignment records, completion history and clear in-place help. Vehicle and larger-tool service scheduling will later use the same calendar and visual conventions. Inspections, stock and broader daily-work planning are subsequent stages. Share normal-course records through authenticated course-scoped server storage; keep the public demo disposable. Record each change with actor/time, protect concurrent updates, and preserve map edits during rollout.

Later stages: richer labor planning and reporting, secure field photos, shared map-state migration, offline reconciliation, weather and licensed remote-sensing imports, and compatible equipment integrations. Satellite products require actual licensed data and validation. Spraying prescriptions require equipment compatibility and agronomic review; they must not be fabricated from illustrations or offered as unsupported dosing advice.
