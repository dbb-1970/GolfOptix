# Managed authentication — October 29, 2026

Netlify Identity 2.0.0, email confirmation required, external providers disabled. New signup starts with course name. No course access derives from user-editable metadata. Reserved initial email identities receive their specified roles only on confirmed signup: administrator for owner, Kings member for Jake. Source stores hashes of these email identifiers, not a plaintext credential list; no passwords in source.

Role-conditioned Netlify redirects protect /course/, /course-preview/ and /admin/. Session and admin APIs verify managed Identity users server-side. Admin endpoints require administrator role, same-origin mutation requests and verified target accounts. Kings membership is reserved for the assigned identity. Administrator can access every current/future course through canCourse; only Kings is provisioned today. New-course approvals record access metadata but do not create maps for unprovisioned courses.

Profile: name, requested course, job title and optional phone. Requested-course changes never alter access. Password changes require current-password reauthentication; recovery and email confirmation use managed Identity tokens. Owner sets their own password through invitation/signup; do not write it into code. Existing local course edits stay separate from authentication. New local state/backup keys are partitioned by user ID; legacy demo data is preserved but not automatically imported into another account.

Session cookies and provider-managed browser session support login. App API responses and protected map assets use no-store. Signout ends managed session; local edits/backups remain until browser site data is cleared. Old previously public demo map copies cannot be recalled. Source map geometry is untouched.

Pending users can access account/profile but no course map. Admin list paginates 50 users at a time; approvals are explicit. Roles in existing JWTs update on next login or refresh; permissions are not instant revocation of previously downloaded files. Admin audit metadata records who last changed access and when. Course edit/repair data and backups remain browser-local, not cloud synchronized.

Before storing sensitive operational data: review provider session lifetime/abuse controls, MFA requirements, account recovery operations and course-data backups. Initial named accounts still require their email owners to complete confirmation/password setup. Never disable email verification to bypass that step.
