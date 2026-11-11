# GolfOptix production support runbook

1. Check /api/health for release/liveness. A 200 response is not proof that Identity, private stores or mail delivery work.
2. Ask for course/track, affected record ID, time, browser/device and reproduction steps; never request passwords. Use Daily work → Support to record impact and status. The record is private to that course; saving does not notify a support team automatically.
3. Confirm the user has the approved course role or manager-written worker/technician grant. Check signed-out and cross-course denial before diagnosing missing records as data loss.
4. For a save conflict, preserve the draft, refresh, inspect the latest record and deliberately reapply. Never force-write over another editor. Offline work-log drafts require explicit review and exact-version checking; do not delete a draft until the command is confirmed online.
5. Inspect Netlify function/deploy logs and provider dashboards with authorized access. Do not paste secrets or personnel data into public issues. Internal support case references should be identifiers, not full records.
6. Before broad repair changes, create a full recovery point. Test restoration into the existing isolated recovery environment. Confirm checksum/record comparisons and that no emails can leave the test copy. Keep the downloaded archive in protected business storage.
7. A map-version rollback is geometry only and preserves current approvals. A full-record restoration requires the controlled recovery procedure and review; never improvise a live store replacement.
8. Reproduce fixes in the fictional demo and isolated tests, deploy, then read back the affected public release and authenticated function result. Mark support resolved only after the actual workflow is verified.
9. Mail queue status is not delivery proof. Check provider result and recipient junk folders; do not repeatedly reissue a welcome password without coordinating with the user.
10. Add independent external uptime/error monitoring and a staffed support schedule before selling an SLA. Those services are not connected by this release.
