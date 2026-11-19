# Profile avatars and My Day crew navigation

Baseline: 168a00f56917549e2029df52037d728ed01cc182.

Every signed-in account has a circular avatar beside the language picker. My Day repeats it in the upper-right action area. Supers retain a working Manage Crew link below it; Crew sees only the avatar. The worker-profile roster stays on the Crew team page rather than My Day.

The avatar menu opens personal profile, password and sign-out options. Its editor offers a neutral, featureless maintenance-worker icon or a face photo. Photos are cropped locally with zoom and positioning sliders, normalized to a 256 × 256 JPEG and then saved explicitly. The private /api/avatar endpoint keys records from the authenticated user ID, ignores user-supplied roles, refuses external/executable image formats and EXIF-bearing uploads, uses same-origin and conditional-write checks, and serves private/no-store responses. It cannot retrieve another user's image by URL parameters. Avatar changes grant no Crew/Super permissions.

Profile images are personal-account records, separate from course operational snapshots. Identity/profile/password behavior is unchanged. Anonymous pages show no avatar. The public demo offers a page-local avatar preview only; it never stores a real photo online or changes a password.

Manage Crew was a non-interactive status badge. It is now an actual authorized-team link. Personal My Day hides the worker-profile roster; the team Crew page retains profiles, invitations and scheduling.

Verification: security/unit regressions, a synthetic browser photo crop accepted by server validation, both avatar locations updating together, Crew/Super visibility, the team link, and phone widths 420 and 320 without horizontal overflow. Original atlas and customer records are untouched.

Rollback: revert this release and redeploy. No operational schema or permission migration. Existing private avatar records are ignored by the old UI; account-data deletion requests must include the separate golfoptix-private-avatars-v1 store.
