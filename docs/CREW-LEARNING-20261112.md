# Crew titles, qualifications and learning libraries — November 12, 2026

## Delivered experience

Crew profiles offer 44 common title choices plus a custom title. Spray Technician and Spray Tech are both available. Names cover leadership, turf and course care, operators, irrigation, pump/equipment staff, horticulture and seasonal staff. These are reference choices, not a universal industry taxonomy. The existing authorization rule is unchanged: only the exact Assistant Superintendent title delegates crew management; administrator and superintendent course access remain independently authorized. Other job titles and qualification badges never grant permissions.

An existing worker profile now includes Attach a credential badge. The catalog has 39 reference types, distinguished as licenses/endorsements, professional certifications, certificate programs, education or employer training records. Ten original GolfOptix vector icons cover spray, water, leaf, graduation, gear, aid, shield, vehicle, tree and sun. They are not issuing-body seals. Custom records are allowed. Issuer, jurisdiction/machine/scope, private reference/number, issue date, expiry mode, notes and review information remain in private course Crew storage. Unknown expiry, dated expiry and issuer-declared no expiry are distinct. Expired and 30-day renewal statuses are visible. Course-reviewed requires issuer, scope and evidence reference; it never claims issuing-authority verification. File uploads, issuer verification and automatic qualification-based dispatch blocking are not implemented by this release. Operators still check actual scope, law, training and local authorization.

Ordinary profile edits preserve credential records. Updates, archive and restore retain history and actor information. Personnel/credential records do not enter public catalogs or ordinary-worker projections. Course managers can record qualifications for supervisor roster members as well as workers; accounts not yet in the roster need a roster record first.

## Learn

A same-sized Learn function tab opens two libraries after login; fictional versions are in `/test-drive/learn/`. Worker navigation exposes Crew and Learn, with role-filtered guides. No customer instructions or personnel are embedded in static guide files.

- **Support Library:** 33 searchable guides across every major delivered workspace, with worked examples, cautions, role context, related-workspace links and numbered actions.
- **Course Library:** 12 superintendent-led classes with practical examples, understanding questions and facilitator answer keys. Lead this class presents one visual step at a time with previous/next controls. Print / Save PDF always returns from presentation to the complete handout; the answer key is hidden in print.
- **Visuals:** 183 action illustrations, in English and Spanish (366 original vector files), explicitly labeled as illustrative examples. Two real, sanitized fictional-demo screenshots supplement the profile/credential guides. They are not screenshots of Kings or private personnel. All images have text alternatives.
- **Course lessons:** managers can create text-based local lessons (1–20 steps), keep drafts private, publish reviewed instructions to this course's crew, edit/archive/restore them and choose English or Spanish. Custom steps receive an automatic visual layout. Custom private text is retained in its original language; this is not an automatic safety translation service. Image/file uploads for custom lessons are not part of this release.
- **Class records:** after teaching, a manager can record actual date, facilitator, attendees and follow-up. A snapshot of the taught lesson version is retained even if the lesson is edited or archived later. Attendance does not create a credential, change access or certify competence. Attendance and draft edit history stay private to managers. Attendance records are append-only in this release.

The ordinary-worker API projection includes only published, unarchived course lessons and excludes draft/history/attendance/personnel data. The existing course-scoped, revision-checked Crew service provides persistence, conflict protection and retention through full-record recovery. The learning page itself also has server-enforced sign-in routing. Generic product help and fictional illustrations are public static resources; that is not where customer lessons are stored.

The public demo walkthrough now explains title/access distinctions, credential records and both libraries. All new tour instructions have local Spanish translations. Account-specific language preference changes notify the learning reader; the current guide and its images switch editions together.

## Sources and limits

Reference research (not legal determinations):

- GCSAA workforce development and job descriptions: https://www.gcsaa.org/career/workforce-development
- GCSAA certifications, certificates, Greenkeeper program and IPM exam: https://www.gcsaa.org/career/certifications-exams
- Equipment Management Certificate Program: https://www.gcsaa.org/career/certifications-exams/equipment-management-certificate-program
- Irrigation Association credentials: https://www.irrigation.org/ia/Certification/New_2026_structure/Choose-your-certification.aspx
- EPA applicator standards: https://www.epa.gov/pesticide-worker-safety/federal-certification-standards-pesticide-applicators
- Florida licensing: https://www.fdacs.gov/Business-Services/Pesticide-Licensing/Pesticide-Applicator-Licenses
- OSHA Outreach: https://www.osha.gov/training/outreach (completion cards, not professional certification)
- OSHA PIT operator training/evaluation: https://www.osha.gov/etools/powered-industrial-trucks/training
- WPS training applicability: https://www.epa.gov/pesticide-worker-safety/worker-protection-standard-training-programs-submission-process-and (not assumed applicable to every golf-course worker)
- ISA: https://www.isa-arbor.com/Credentials/Overview
- Red Cross: https://www.redcross.org/take-a-class/aed/aed-training/aed-certification

No catalog can enumerate every country's or jurisdiction's titles and credentials. Custom entries preserve that flexibility; the reference catalog does not say all entries are required at each course. The libraries teach GolfOptix and facilitate local team discussions; they do not replace qualified equipment instruction, labels/SDS, legal licensing, official safety training or field competency evaluation. Specialized official courseware is linked as reference rather than copied.

## Validation

All 205 automated checks pass. Automated checks cover preserved credentials, evidence/expiry/version validation, permission boundaries, reversibility and history, safe worker projections, publication/draft rules, attendance dates/course-worker scope, retained taught snapshots, malformed recovery data and all bilingual illustration references. Existing account, recovery, work-order, chemistry and tour checks remain in the full build.

Browser QA uses only the fictional demo: title selection, recorded/expired badge, profile scroll position, catalog preview, searching a guide, class step navigation, temporary attendance, published custom lesson visible in read-only crew preview, hidden manager authoring/attendance controls, Spanish reader/images and phone width. No real account, mail or Kings record was changed. Physical printers, issuer verification and field competency are not claimed as tested.

Authoring: edit the stable IDs and English/Spanish step records in public/assets/learning-catalog.json, then run scripts/build-learning-illustrations.py. The reference catalogs contain no customer personnel. Keep screenshots fictional and update the edition/version when a workflow changes.
