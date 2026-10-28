# Superintendent maintenance showcase

The owner requested a demonstration, with the superintendent as the only app user and workers receiving printed work orders. Mock sign-in is retained. No new roles, accounts or server data service are introduced.

Open a hole and click a sprinkler, valve, water branch, bunker, green or water hazard. The details panel supports repair notes, work assignment text, updates, completion notes and retained maintenance/position history. Open repairs turn the asset red and show an exclamation marker. Completion clears the alert once every open repair on that asset is closed.

Choose Move this feature and drag it. A modal warns that the full course map and every hole view will change. OK applies the adjustment across all runtime views; Cancel restores the prior position. Restoring a source position uses the same confirmation. The atlas and delivered SVG source files remain unchanged; the application stores a separate overlay in original master-coordinate units and applies each view's original transform.

No private source-ledger connectivity is published. Before moving a sprinkler or valve, the superintendent selects the connected line(s) from the currently loaded map, or explicitly marks that no connected line is shown. The demo adjusts the nearest existing vertex of each explicitly selected line by the feature's displacement and leaves its other vertices fixed. Repeated loop start/end coordinates move together. These choices persist only in browser-local demo state and are not field verification or a hydraulic topology model.

Print work order prepares the approved portrait hole card with current position/line overlays, red repairs and active notes, reported-by names, assignments and updates below the map. Completed repairs remain in history and are excluded from active work orders. Large work lists continue onto additional printed pages.

Demo state is browser-local localStorage under golfoptix-maintenance-demo-v1. It persists on reload and across views and same-origin tabs. It does not synchronize between devices, browsers or different hostnames. Export backup downloads JSON. Source revision is pinned to r007; revision migration is not implemented. No operational data is uploaded to GitHub or Netlify.

Validation: six model tests cover lifecycle, repeated-label identity, multiple open issues, invalid input, connected pipe deformation/loop closure and selected valve connections. Browser checks cover reporting/red flags, printed notes with 78 retained valve elements, movement confirmation, shared overview offsets and closing a repair with retained history. Mobile-specific emulation was unavailable in this browser session; responsive styles are included but a handset interaction pass remains useful.
