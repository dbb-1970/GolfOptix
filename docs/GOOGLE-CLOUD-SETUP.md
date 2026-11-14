# Connect Google to GolfOptix
Prepared November 14, 2026. You do not need to move the GolfOptix website from Netlify.

## What needs setup
Budgets, manually reviewed photo receipts, staff time off and fuel records work without Google. Google Calendar synchronization needs a Google Cloud OAuth application. Automatic receipt reading additionally needs Cloud Vision. Neither connection is enabled merely by deploying the app.

## 1. Create your project
1. Open https://console.cloud.google.com/ and sign in with the Google account that should own GolfOptix's services.
2. Open the project selector at the top, choose New Project, and name it GolfOptix Production. Record the generated project ID. Google recommends a separate project for development/testing; use a separate GolfOptix Test project for experimentation.
3. Open APIs & Services → Library and enable Google Calendar API in the selected project.

No Google password, client secret or API key belongs in chat or the public GitHub repository.

## 2. Set up the Google consent screen
Open Google Auth platform. Its current sections include Branding, Audience, Data Access and Clients.
- Branding: GolfOptix; your real monitored support/developer email; homepage https://golfoptix.com/; privacy policy https://golfoptix.com/privacy/.
- Authorized domain: golfoptix.com. Complete domain ownership verification when Google requests it.
- Audience: External, because customers may use accounts outside your organization. During testing, explicitly add the Google email addresses that will test the connection.
- Data Access: request these exact scopes:
  - https://www.googleapis.com/auth/calendar.events
  - https://www.googleapis.com/auth/calendar.calendarlist.readonly

The app lists writable calendars and synchronizes only selected GolfOptix items. The events scope is broader than those selected items at Google's permission layer; GolfOptix enforces the selection boundary in its implementation. Do not describe the OAuth permission as technically restricted by Google to selected events.

Production use may require Google's app verification. External applications left in Testing have limits, and refresh tokens for these scopes typically expire after seven days. Testing is not a permanent customer rollout configuration. Complete the production publishing/verification process that Google displays before promising persistent customer connections.

## 3. Create the OAuth client
In Clients, create an OAuth client of type Web application, named GolfOptix Website.
- Authorized redirect URI: https://golfoptix.com/api/google-calendar-callback
- If the console requests a JavaScript origin, use https://golfoptix.com. The implemented connection uses a server-side authorization-code flow.

Save the Client ID and Client Secret securely. Do not use the secret in browser code.

## 4. Connect it to Netlify
In the existing GolfOptix site/project, open Project configuration → Environment variables. Add these for production Functions (or the equivalent Functions/runtime scope in your dashboard):

| Name | Value |
|---|---|
| GOOGLE_CLIENT_ID | OAuth Client ID |
| GOOGLE_CLIENT_SECRET | OAuth Client Secret; secret value |
| GOOGLE_REDIRECT_URI | https://golfoptix.com/api/google-calendar-callback |
| GOOGLE_TOKEN_ENCRYPTION_KEY | A newly generated 32-byte random key represented as 64 hexadecimal characters; secret value |

A developer can generate the encryption key locally with Node's crypto.randomBytes(32).toString('hex') and place it directly in Netlify. Keep it backed up securely; replacing it makes stored tokens unreadable and requires users to reconnect. It must not be a phrase or copied example.

Redeploy after the variables are saved. No secrets should appear in build logs, screenshots or public files.

## 5. Test your calendar connection
1. Sign in to your approved GolfOptix course account.
2. Open Calendar → Connect Google Calendar. Crew members can use Connect Google Calendar from their own Crew schedule.
3. Choose Connect your Google account and approve the displayed scopes yourself.
4. Select a writable calendar. A dedicated GolfOptix test calendar is useful for the first test.
5. Select one future, unstarted job; save selections and sync.
6. Verify that one Google event appears. Change its time in Google and choose Sync now in GolfOptix. Confirm the course time changes.
7. Change its time in GolfOptix and sync again. Confirm Google updates without a duplicate.
8. Test simultaneous edits: the item should require review. Test an approved absence: its exported title must say unavailable, without a sick/vacation reason or private notes.
9. Disconnect and confirm further changes stop syncing. Existing Google copies are retained.

Background synchronization is scheduled every five minutes on the published production site, rather than instantaneous. Approved crew members can export only their own assigned work and approved time off; their Google edits require manager review inside GolfOptix. Managers can synchronize course schedules in both directions. Only selected items are handled. Selection currently covers work orders, course events, approved absences and individual maintenance-plan occurrences, from 30 days before today through 335 days ahead, with a maximum of 100 selections per connection. Repeating occurrences must be individually selected. Unrelated Google events are not imported. Calendar-plan title/duration edits and protected/started work are reviewed inside GolfOptix. Deleted Google copies require review rather than automatic cancellation of operational records.

## 6. Optional automatic receipt reading
1. In Google Cloud, enable Cloud Vision API. Google requires a billing account for Vision; review pricing and approve billing yourself before enabling paid usage.
2. Create a separate server API key, restricted to Cloud Vision API. It must not be placed in website files. Do not use browser/referrer restrictions for the server key. Consider stronger infrastructure restrictions if fixed outbound network addresses become available.
3. Add GOOGLE_VISION_API_KEY to Netlify's production Functions environment, as a secret, then redeploy.
4. Set a small initial usage quota and a billing budget alert appropriate to expected receipt volume. Budget alerts notify you; they are not a hard spending cap.
5. In Expenses / receipts, choose a photo and explicitly enable automatic reading. Verify the extracted vendor, date and total before confirming and posting. Test one receipt once and verify there is only one expense.

Manual photo capture remains usable without Vision. Photos are resized to a maximum dimension of 1600 pixels and stored as JPEG, up to 2 MB each. Extraction is a draft, not accounting certification. Only use course-authorized receipts.

## Sources
- Calendar project and API setup: https://developers.google.com/workspace/calendar/api/quickstart/js
- Consent configuration: https://developers.google.com/workspace/guides/configure-oauth-consent
- Server-side authorization and testing token expiry: https://developers.google.com/identity/protocols/oauth2/web-server
- Production readiness: https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance
- Vision setup: https://docs.cloud.google.com/vision/docs/setup
- Receipt text extraction API: https://docs.cloud.google.com/vision/docs/ocr
