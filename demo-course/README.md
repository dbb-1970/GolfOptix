# Juniper Cove Golf Club (DEMO COURSE)

Public showcase: /test-drive/, exposed in the login course selector and homepage Test Drive links. Lakes Course has 18 holes, 472 simulated head symbols, 54 simulated valve marks and 54 illustrative water branches.

The landscape uses the public OpenStreetMap terrain from the earlier Augusta study (ODbL 1.0), retaining attribution. This is a fictional product environment: its irrigation is entirely invented for demonstration and must never be represented as Augusta National infrastructure or an engineering design. No private Kings source drawings, engineering ledger, aerial photographs or customer edit records are included.

Generator: build_showcase.py. Final SVG assets live under public/test-drive-assets/. Hole and print views inherit the overview geometry with the same IDs and tee-to-green rotation. The customer master is untouched.

Session contract: edit/maintenance state and undo history use a page-scoped in-memory store only. No localStorage, sessionStorage, IndexedDB or backend mutation is used by the demo. Reload, navigation away, explicit End Test Drive and Reset Test Drive clear the session. Idle limit is 15 minutes; hard limit is one hour. Expiry is checked every 5 seconds and on return to the page. Back/forward cached pages reload before reuse. Each tab has isolated edits. Downloaded/printed copies remain with the visitor, and normal host request logs still apply.

All editing features use the same application code as customer workspaces. A demo-only map archive adapter reads only the fictional assets; persistent customer backup code is not loaded. The reset button replaces the persistent backup manager in this environment. Protected customer routes and course membership rules remain unchanged; the demo catalog entry is excluded from private account memberships.

Validation: session isolation/end/idle/hard-expiry tests, all existing model/access/backup tests, browser repair marking on hole and overview, reload reset, and login selector navigation without credentials.
