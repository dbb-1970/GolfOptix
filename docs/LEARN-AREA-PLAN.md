# GolfOptix Learn — proposed illustrated instruction library

Recorded November 11, 2026. This is an implementation outline, not a claim that the full library has shipped.

## Placement

A Learn button in the signed-in workspace's top-right navigation, sized consistently with adjacent navigation buttons. Keep the home page focused on product introduction. The public superintendent walkthrough remains a short guided introduction, with deeper illustrated guides available after sign-in. Public demo guides can link to a sanitized subset later.

## How people find instructions

- Search a task in everyday language: “move a pin”, “assign cup cutting”, “approve a repair”, “add a mower”.
- Browse by Maps & irrigation, Landscape, Pin placements & cup cutting, Calendar, Crew, Garage, Pump stations, Chemicals, Turf guidance, Backups & recovery, Accounts, and Troubleshooting.
- Open a relevant guide from a small “Show me how” link beside the feature being used; return to the same working screen without losing the user's form.
- Filter instructions to the signed-in person's role. Workers see their own work and closure-request instructions; manager-only actions are clearly marked.
- Offer English and Spanish, including the images' callouts and captions. Course-entered notes remain original or explicitly reviewed translations.

## Each guide follows one familiar pattern

1. A specific task title and the result it achieves.
2. Who can do it, required information, and where to start.
3. Short numbered steps, one action per step, with an annotated screenshot beside each relevant action.
4. The exact button names currently shown in GolfOptix.
5. What a successful save looks like, whether it is shared, and who can see it.
6. How to edit, cancel, undo or recover, and what history remains.
7. Common errors with precise next actions.
8. An optional printable checklist and a short video only where motion adds value.

## Compilation and upkeep

Create a feature-to-guide registry, reusing walkthrough topics and screenshots from the fictional course. Never capture customer personnel, email addresses, sensitive plans or live work records for public instructions. Assign a stable guide ID to each task, a role, related screen, revision/release, verified date and image descriptions. Store text and annotated images alongside the app source so changes can be reviewed together. Keep user-facing guides free of implementation details.

First build a small complete slice: calculate a pin rotation → print a sheet → assign a route → record the combined cup-cutting/pin-placement work → request closure → approve. Then extend the same format to every delivered feature. Add a release checklist requiring guide and screenshot review when button names or behavior change; older screenshots should not silently describe a newer workflow.

## Accessibility and navigation

Responsive text/image layouts, readable captions, keyboard navigation, high contrast, searchable transcripts for videos, alternative text for illustrations, and printable views. Keep Back to workspace visible. Avoid an initial wall of documentation or blocking the task with instructions.

## Next decision

Review a sample guide and Learn landing-page mockup before building the complete library. No dead Learn button is added before a usable destination exists.
