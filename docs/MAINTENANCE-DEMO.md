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
