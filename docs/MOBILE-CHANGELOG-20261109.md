# Mobile workspace update — November 9, 2026

## Recovery point

Previous production commit: `95b0f8626044d23e411fcd586f67b8aa2b749fb4`.
Local pre-change files and their list: `reviews/mobile-before-20261109/BASELINE.json`.
The mobile update is published as one commit, making it possible to revert the release without resetting other work. A `git revert` of that commit restores prior application behavior and removes its new files. Do not hard-reset the branch or erase customer browser storage. No course state schema, account permission, source atlas or map SVG changes are part of this release.

## Changes

- `public/assets/map-gestures.js`: tested viewport mathematics for pan and focal-point zoom, accounting for SVG letterboxing and zoom limits.
- `public/assets/course.js`: pointer tracking for one-finger pan and two-finger pan/pinch; pan begins over mapped features as well as blank areas; movement threshold suppresses accidental taps; zoom follows pointer/finger midpoint. Explicit desktop move mode still uses the prior feature drag mechanism. Addition mode permits a two-finger gesture without turning a one-finger tap into a pan. Blur, cancellation and mode transitions clear gesture state. The last view of each hole is remembered for the lifetime of the page; Fit restores the base view. Phone demo maps use their map crop rather than redundant title/footer furniture. Geographic feature geometry is unchanged.
- `public/assets/maintenance.js`: phone selection opens a bottom sheet; Move starts crosshair placement with directional fine adjustment and the existing full-map confirmation. Cancel does not save a position. Undo remains the existing operation and history system. Closely packed sprinkler/valve taps offer a feature chooser. Terrain headings use readable names rather than source metadata; stable IDs and source records are retained. Desktop drag editing remains available.
- `public/assets/mobile-workspace.js` and `.css`: map-first phone layout, compact header, persistent Holes/Search/Layers/Repairs/More navigation, drawer-based tools, larger controls and inputs, feature bottom sheet with Move/Size/Repair shortcuts, explicit Edit/Done controls, accessible save status, keyboard-aware viewport sizing, safe-area padding and coarse-pointer landscape layout. Privacy/hosting links remain reachable in More. Existing controls are moved/wrapped rather than duplicated with separate event handlers. Desktop presentation retains its sidebar and editing toolbar.
- `public/course/index.html`, `public/test-drive/index.html`, `public/assets/course-auth.js`, `public/assets/play-start.js`: load new code/styles with the `mobile1` release version.
- `tests/map-gestures.test.cjs`: focal preservation under simultaneous pan/zoom, portrait/landscape letterboxing, zoom bounds and two-pointer geometry.

## Validation

39 automated checks pass, covering existing access, backups, maintenance, landscape edits and demo expiry, plus new map math.
Browser checks at 390×844: map starts approximately 147 px from the top (previously ~1,451); panning across features changes the viewport without opening details; ordinary taps select; drawers and six-column hole navigation operate; a hole's zoom survives leaving and returning; existing feature placement Save/Cancel and Undo work; adding a shrub through Edit tools works; refresh resets Test Drive additions. Phone backup access was also verified on an isolated Kings workspace. No browser errors observed.
Desktop at 1440×1000: original 235 px sidebar retained, mobile navigation/actions hidden, drag movement and Cancel still work. No source data or customer account state was modified during testing; browser edits were in the isolated Test Drive.

## Limits and follow-up

Pinch geometry is covered by automated checks and event handling is implemented, but this environment has not performed a physical two-finger test on an iPhone or Android device. Device testing should include transition between one and two fingers, virtual keyboard appearance, orientation changes, browser chrome and safe areas. Normal course edits remain account-scoped in the current browser and backups; Test Drive remains temporary. Shared cloud/offline synchronization is separate work.

## If something feels wrong

Record phone model/browser, hole number, whether in Test Drive or a real course, the action taken and expected result. Use Fit to recover a lost view; Cancel or Undo to reverse edits. Keep existing data/backups while diagnosing. The whole mobile release can be reverted, or individual gesture, phone-layout and feature-placement changes can be adjusted independently using this file's inventory.
