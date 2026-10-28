# Superintendent maintenance showcase

The owner requested a demonstration, with the superintendent as the only app user and workers receiving printed work orders. Mock sign-in is retained. No new roles, accounts or server data service are introduced.

Open a hole and click a sprinkler, valve, water branch, bunker, green or water hazard. The details panel supports repair notes, work assignment text, updates, completion notes and retained maintenance/position history. Open repairs turn the asset red and show an exclamation marker. Completion clears the alert once every open repair on that asset is closed.

Choose Move this feature and drag it. A modal warns that the full course map and every hole view will change. OK applies the adjustment across all runtime views; Cancel restores the prior position. Restoring a source position uses the same confirmation. The atlas and delivered SVG source files remain unchanged; the application stores a separate overlay in original master-coordinate units and applies each view's original transform.

No private source-ledger connectivity is published. The owner explicitly requested automatic line-following with no connection controls or questions. The demo now uses existing public SVG geometry at the sprinkler's original position to attach the blue line automatically; all existing lines meeting at a junction follow. Sprinklers use their existing rendered hole group to avoid connecting to independent neighboring groups. A head sitting between vertices adds a local bend point to the existing line. Its exact center and connected pipe point then move together while other pipe vertices stay fixed, during dragging and across confirmed overview, hole and print views. Existing browser-saved bindings are retained. This is a geometric demonstration, not a field-verified hydraulic topology model.

Print work order prepares the approved portrait hole card with current position/line overlays, red repairs and active notes, reported-by names, assignments and updates below the map. Completed repairs remain in history and are excluded from active work orders. Large work lists continue onto additional printed pages.

Demo state is browser-local localStorage under golfoptix-maintenance-demo-v1. It persists on reload and across views and same-origin tabs. It does not synchronize between devices, browsers or different hostnames. Export backup downloads JSON. Source revision is pinned to r007; revision migration is not implemented. No operational data is uploaded to GitHub or Netlify.

Validation: nine model tests cover lifecycle, repeated-label identity, multiple open issues, invalid input, connected pipe deformation/loop closure and selected valve connections. Browser checks cover reporting/red flags, printed notes with 78 retained valve elements, movement confirmation, shared overview offsets and closing a repair with retained history. Mobile-specific emulation was unavailable in this browser session; responsive styles are included but a handset interaction pass remains useful.

## Removal, label correction and session undo

Sprinklers, irrigation lines and valves have a reversible Remove from map action with an in-page confirmation. Symbols, hit targets, matching labels, pipe casings and repair markers are hidden consistently from overview, hole views and prints. Removed irrigation items in the sidebar opens their retained history and Restore action. Removing an item does not remove other irrigation items or erase repair history.

Sprinklers have a label field and Save label button. Corrections use stable asset IDs, so repeated source labels remain distinct. Corrected labels appear on the map, in search, repair lists, history and printed notes; original source labels remain recorded. The source SVGs and authoritative atlas are unchanged.

Undo map edit reverses up to 50 moves, label corrections, removals and restores in the current tab's session, including across map navigation and reload. Ctrl/Cmd+Z also works outside text-entry fields. Undo restores the exact prior geometry/pipe bindings and label/removal state while retaining all repair notes and history, including repair changes entered after the map edit. Updates from another tab clear the local undo stack to avoid applying stale snapshots. Browser-local demo storage remains in place.

Thirteen model tests pass. Browser checks verified rename, removal confirmation, undo removal, undo label change and corrected overview labels. The browser-native confirmation stalled in Chrome during testing, so removal now uses an in-page dialog instead.

## Adding irrigation assets

The add toolbar supports sprinklers, valves and water lines. Choose the hole and optionally enter a label, then place the point on the map. A line starts by clicking a sprinkler/valve or a map point; intermediate clicks add bends. Clicking a destination sprinkler/valve finishes it automatically, or Finish line completes two or more free points. Every addition previews as an unsaved draft, then uses the same full-map OK/Cancel warning as a move. Escape or Cancel addition discards the draft. No record is created before OK.

New geometry has USER-prefixed stable IDs, its own history and a distinct user-created overlay, not source attribution. It is stored in master coordinates and transformed consistently into overview, hole views and portrait prints. User labels remain upright; the original card crop clips additions and repair markers to the map area. New points can be moved, renamed (sprinklers), removed, restored and flagged for repair. New lines support repair notes and removal. Session undo of an addition hides the new item while retaining its geometry/history for restoration.

Line endpoints explicitly attached by clicking a sprinkler or valve remember that stable ID and its position at creation. Future endpoint moves update the line in every map view and print. Intermediate bends stay fixed. Existing endpoint offsets at creation are subtracted so moved source features do not displace the new line twice. Custom points attached to new lines do not pull unrelated source branches.

Seventeen model tests pass, including creation, invalid/zero-length geometry, endpoint following and undo-addition history retention. Browser checks placed a sprinkler and valve, drew a line between them, moved its sprinkler endpoint, and verified all three additions and their labels in the overview.

## Full-course backups and page responsibilities

BACKUP is on the course overview only. Its manager explains creating a full snapshot, replacing the current course with an older snapshot, deleting obsolete backups and downloading/importing copies. User names get the suffix MM-DD-YYYY HH:MM:SS in the browser's local timezone; timestamps, timezone and stable IDs are also stored separately. Names created in the same second do not overwrite one another.

A full package contains the clean overview SVG, all 18 hole SVGs, all 18 portrait-card SVGs, the map manifest and the entire user-edit/maintenance state. SHA-256 checksums verify the 38 baseline files. Backups and restored baseline files use IndexedDB rather than small localStorage capacity; overlays continue using localStorage. Backups are local to this browser/origin, not cloud storage. Download and import support moving a saved copy to another browser. Imports are validated for course ID, source revision, completeness, checksums and safe SVG/overlay content. Current product scope remains Kings Course; the backup store is course-keyed and prevents a different course from overwriting it.

Restoring replaces all map data and repair history with the selected snapshot, clears session undo and reloads the overview/hole renderer against the snapshot's baseline files. Printing uses those same restored files. A complete Before restore safety backup is saved first; if it cannot be saved, restoration does not proceed. Deleting a saved backup does not modify the active map, even when that saved copy was used to restore it.

Adding, removing and restoring individual irrigation features are restricted to hole pages. The add toolbar is hidden on the overview, and event handlers also enforce the hole-level restriction. The hole assignment is taken from the active hole rather than a second selector. Addition/removal undo likewise requires a hole page. Hole edits still appear on the overview and printed maps. Mobile toolbar labels wrap and unused cancel controls stay hidden.

Validation: 22 model tests pass. Browser checks created an 8.8 MB named full backup, changed a source-head label, restored the earlier snapshot, verified the original label and automatic safety copy, then deleted the test snapshot without changing the active map. A subsequent tab retained the backups and restored map. At 390 px viewport width, the hole controls and overview fit without horizontal overflow; the backup dialog measured 362 px with no internal horizontal overflow. Main-map BACKUP visibility and hole-only add/remove controls were verified.
