# My Day sign-in landing — 19 November 2026

Baseline: 97821bb7bdbecbf296018cd5618dfd0b7d93de9c.

Approved real-course sign-in now opens /crew/?course=<authorized-track>&view=day&person=me for both Crew and Super. Course links in My account use the same landing. The public demo selected at sign-in opens its personal day; direct Test Drive marketing links remain course previews. Normal authentication callbacks and completed password setup consult /api/session and use an approved track or My account if none is approved. Required invitation/password setup is retained.

Direct ticket and workspace deep links are unchanged. My Day keeps each worker's own data projection. A manager without a linked crew profile sees the existing honest empty-state explanation and may open the team view.

The existing authorized course-map link is promoted to Open Course Map below the My Day work list. Real Crew map access remains blocked by the previous server permissions. The owner has authorized Crew viewing and issue reporting, but those map/reporting permissions require a separate implementation; this landing release does not grant map editing or widen other rights.

The sign-in destination is constructed from the approved course ID, never an arbitrary course URL. Tests cover both access levels, encoded IDs and denial for unapproved tracks. Existing operational regressions remain required. Browser checks use fictional demo views; no live records, credentials or emails are changed.

Undo by reverting this release and redeploying. No operational data or schema changes.
