# Daily navigation and personal Google Calendar access
November 14, 2026

Main destinations: Today, Calendar, Crew, Course Map, Equipment, Budget. More retains specialist tools, account links and learning. Old URLs continue working. Course selection is preserved. Course-only staff do not get map rights from navigation links; crew see their own weekly schedule from Calendar, and equipment/budget links remain permission-dependent.

Calendar now has Connect Google Calendar in the page itself, including a direct callback return to its connection panel for course managers. Crew has its own Connect Google Calendar link. The old Operations → Google URL is retained. The Maintenance landing page has prominent daily-process shortcuts.

Approved crew can create their own per-course Google connection and select only their assignments/repairs and approved time off. Course events, other workers and maintenance-plan series are excluded server-side. Reassignment removes future access to the item. Authorization is checked on callback, API calls and scheduled runs. Ordinary crew cannot change course schedules through Google: external edits are held for review with an instruction to ask the manager, and Keep GolfOptix restores the approved schedule. Managers retain guarded two-way synchronization and explicit conflict resolution. Private absence details and finance records are never exported.

Public access still depends on Google OAuth production status and verification. The Google project was observed in Testing with Publish disabled due to missing branding URLs. The homepage and privacy links were completed; no OAuth app publication or user authorization is implied by that metadata update. Separate owner approval and Google verification may remain necessary. Never claim that code deployment alone removes Google's test-user restriction.

Validation: 267 build checks passed, including new crew candidate-filtering, attempted cross-worker selection, denied crew schedule mutation and reassignment privacy tests. Browser preview confirmed main navigation and embedded Calendar connection. No real customer events were created as part of this release.
