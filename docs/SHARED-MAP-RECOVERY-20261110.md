# Shared map storage and recovery — November 10, 2026

## What changes

Authenticated Kings Course map edits now save to the private online course store. Labels, feature positions and sizes, reversible removals, additions, pipe connections and sprinkler coverage settings use one revisioned map. Source SVG geometry remains pinned and unchanged. Repair work orders remain in the existing online Crew store; map rollback cannot roll back ticket approvals.

A save reports success only after conditional storage and readback. Another editor’s revision rejects a stale save. The rejected draft is retained on that device and can be downloaded; refresh then review and reapply individual intended changes. Idle views poll every ten seconds, avoiding open forms and active map interactions. This is conflict rejection, not automatic merging or offline editing.

Every map save first writes and verifies a private safety version. The recovery center lists the latest 100 versions. Restoring geometry creates another safety version and preserves current work orders, approvals and calendar records. Old versions remain in storage; listing is bounded.

## Existing browser edits

Before replacing the local cache, the client preserves existing browser state under the account-specific `:legacy-preserved` key. Review previous browser edits opens a download/import screen. Import is explicit and allowed only before shared map feature records exist. Once colleagues have saved, use the download for review and apply changes individually. Legacy history is labeled unverified; server history records the authenticated actor. Original local IndexedDB archives remain available as legacy downloads; they cannot silently replace online geometry or current approvals.

## Recovery points

From the real course overview choose **Shared map & recovery**, name a point, and choose **Create full recovery point**. This captures a stable overlapping read of map, Crew and maintenance-calendar stores; it retries while records change. Recovery includes 38 pinned source files, all map overlay data, personnel, tickets, work-order approvals/history, email queue records and calendar plans. Downloads contain private course/personnel information: keep them in protected business storage.

Choose **Test restore in isolation**. Components are written only to a separate recovery-drill store, then read back and compared by checksum. That store has no email dispatcher. No live records, Identity accounts, approvals or messages are modified. Test copies of actual recovery points are private and available only through authorized recovery operations; no public demo/customer lists read this store.

Choose **Download recovery archive** to retain an independent copy. Local verification and restoration into a new directory:

```
node scripts/recovery-drill.mjs /protected/path/recovery.json.gz /new/empty/recovery-directory
```

The tool refuses an existing target, checks source files and all record checksums, and writes map.json, crew.json, calendar.json, source-maps and RECOVERY-VERIFIED.json. It cannot contact production or send email.

## Recovery boundaries and remaining work

Full points are manually requested; only map safety versions are automatic. Schedule automated full snapshots and independent off-provider copies in a later production-support phase. Netlify Identity accounts/passwords and hosting/email configuration are managed separately and are not included. There is no customer-facing wholesale production Crew/calendar overwrite button: disaster replacement must follow a controlled maintenance procedure that first preserves current records, reconciles newer approvals and handles queued-email idempotency. Isolated recovery is tested; a complete provider-outage production rebuild is not yet certified. Very large single archive downloads may exceed the function response limit and are refused honestly, without deleting the stored point.

## Validation

108 automated checks passed, including concurrent saves, identity/course/origin access enforcement, damaged/wrong-course archives, isolated reconstruction of approved tickets with eight history events, 38 source files and an offline restore refusing overwrite. Browser checks with separate synthetic Alice/Bob clients verified online acknowledgement, stale-edit rejection, retained draft, refresh to the winning revision, a fresh third view loading the shared label, full-point creation and isolated recovery. All synthetic operational records used loopback-only memory storage, never production. Browser phone viewport override was ineffective in this environment; physical phone validation remains outstanding. Existing automated gesture regressions passed.

## Deferred readiness checks

Customer onboarding and cross-customer provisioning; payment-provider test-mode lifecycle; broader monitoring/support exercises; inventory baselines and maintenance triggers; manufacturer-supported parts compatibility; failure count/chart validation. Missing compatibility documentation must remain unverified.
