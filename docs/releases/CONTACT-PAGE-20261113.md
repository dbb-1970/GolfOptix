# Contact page and General Inquiries — 13 November 2026

Replaced incomplete workspace-style contact page with a standalone public layout: branded dark header, contour / red-flag hero, contact-option links, General Inquiries form, separate pilot CTA, existing-customer support and published site-visit pricing. Narrow screens stack without horizontal overflow. Existing brand geometry/artwork retained.

The form requires name, email, topic, 10–4,000-character message and contact consent. Phone and course are optional. Support link preselects its topic without changing form entries. No attachments, passwords, account creation or payments. Messages stay in page memory until submitted; failed requests preserve input.

The contact-inquiry function reuses the pilot handler's bounded JSON/origin/honeypot/rate-limit/storage protections, with a dedicated validator and INQUIRY prefix. Private owner inbox events retain the original multiline message and whitelist fields. Idempotent normalized daily retries do not duplicate notifications. Admin-only inquiry details and the existing retryable owner notification queue route messages to db@golfoptix.com. No applicant acknowledgement email is sent automatically. The UI confirms storage, not email delivery.

Added English / Spanish labels to the existing local dictionary. Privacy disclosure covers inquiry records. Browser checks and in-memory tests create no live contacts or emails. Existing pending GPS changes are excluded.
