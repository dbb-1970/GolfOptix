# Superintendent landscape editing — November 9, 2026

On a hole page, choose Tree, Shrub, Flower bed, Sand trap or Pond / water under Landscape feature, enter an optional name, and click Add landscape. Click the map, then confirm the full-course update. Open the new item to edit its width, length, rotation and outline; Save size & shape requires the same full-course confirmation. Move this feature enables dragging at the current zoom level. Names, repair notes and edit history use the existing stable asset records. Remove, restore and undo retain the item's history.

Added landscapes use master coordinates and the existing portrait transform. The same overlay state is applied to overview, hole maps, printable work orders and full backups. Irrigation is redrawn above landscape fills so ponds and planting never obscure pipes, head symbols or valves. Source atlas geometry and original source layers are not rewritten.

Normal customer edits persist in the current browser under the authenticated user's account key. They survive refresh and signing back in on that browser, and full backups include them. Clearing browser storage loses local edits unless restored from a backup. Shared server storage and cross-device collaboration are not implemented by this change. The public Test Drive intentionally remains page-memory-only and resets on exit, refresh or expiry.

Dimensions are approximate map metres, intended for visual fitting rather than surveying or construction. Shape choices are oval, natural outline and rounded rectangle. Existing source-backed terrain is not silently converted into user-added geometry.

Validation: 33 automated checks pass, including old irrigation edits/repairs/backups, new landscape serialization, resizing, rotation, undo, removal, restore and invalid import rejection. Local browser checks cover adding, sizing, moving, overview consistency and refresh persistence on an isolated Kings fixture. Production customer state is not modified by QA.

## Existing features
Existing mapped trees/tree groups, shrubs, flower beds, bunkers, water, streams, greens, fairways, tees, paths, buildings and range areas are selectable. Existing shapes retain their original outline; width, length and rotation are saved as a separate source-size overlay. Restore original size resets those values; the existing position reset and Undo controls remain available. Kings canopy groups keep their stable canopy IDs. Pond shoreline decoration follows its source pond. Infrastructure is redrawn above edited terrain, without changing engineering coordinates.

Additional validation covers repeated original-feature resizing, persisted bounds, first-resize undo and invalid source-size imports. 35 automated checks pass. Browser comparison confirms the same bunker transform on hole and overview, original-size restoration, and tree selection.
