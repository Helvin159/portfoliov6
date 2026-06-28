# Deployment and Operations Runbook

This runbook covers the Portfolio V7 deployment shape: Next.js App Router, Payload CMS,
MongoDB Atlas for CMS data, and Firebase Storage for project media.

## Hosting Assumptions

- The app runs as a Node.js Next.js application. The Payload admin and API routes require a
  server runtime, so static-only hosting is not sufficient.
- Production should use one canonical application URL for the public site, Payload admin, and API.
- MongoDB stores structured Payload records only. Images, videos, and posters stay in Firebase
  Storage.
- Firebase uploads are direct browser-to-Storage uploads from the Payload admin UI. The app only
  issues short-lived Firebase custom tokens from `POST /api/firebase/upload-token`.
- Use `pnpm` for all local and CI commands. Do not mix `npm`, `yarn`, and `pnpm` lockfiles.

## Required Environment Variables

Copy `.env.example` into the target hosting environment and set the values below.

| Variable | Runtime | Required | Notes |
| --- | --- | --- | --- |
| `DATABASE_URI` | Server | Yes | MongoDB Atlas connection string for the Payload database. |
| `PAYLOAD_SECRET` | Server | Yes | Long random secret used by Payload. Rotate by coordinating a controlled deployment. |
| `NEXT_PUBLIC_SERVER_URL` | Server/client | Recommended | Canonical app URL, for example `https://example.com`. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Client | Required for footer contact form | EmailJS service ID used by the public footer form. |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Client | Required for footer contact form | EmailJS template ID used by the public footer form. |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Client | Required for footer contact form | EmailJS browser public key used by the public footer form. |
| `FIREBASE_PROJECT_ID` | Server | Required for uploads | Firebase Admin project ID. |
| `FIREBASE_CLIENT_EMAIL` | Server | Required for uploads | Service account client email. |
| `FIREBASE_PRIVATE_KEY` | Server | Required for uploads | Service account private key. Keep escaped newlines as `\n` when the host requires one-line values. |
| `FIREBASE_STORAGE_BUCKET` | Server | Required for uploads | Firebase Storage bucket used by Admin SDK token responses. |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client | Required for uploads and migration export | Firebase web app API key. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Client | Required for uploads and migration export | Firebase web app auth domain. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Client | Required for uploads and migration export | Firebase web app project ID. |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Client | Required for uploads and migration export | Firebase web app storage bucket. |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client | Required for uploads and migration export | Firebase web app sender ID. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Client | Required for uploads and migration export | Firebase web app app ID. |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Client | Optional | Analytics measurement ID. |

Local type generation can run without production secrets because the scripts set
`PAYLOAD_SKIP_ENV_VALIDATION=true`.

## MongoDB Atlas Setup

1. Create or select a MongoDB Atlas project.
2. Create a free shared cluster if this is the production budget target.
3. Create a database user with read/write access for this app database.
4. Add the production host's outbound IPs to the Atlas network access list. If the host does not
   provide stable outbound IPs, use the narrowest supported hosting integration or documented
   allowlist pattern for that host.
5. Copy the Atlas SRV connection string and set it as `DATABASE_URI`.
6. Use a database name that is specific to this app and environment, for example
   `portfoliov6-production` or `portfoliov6-staging`.

Do not store Firebase media files or large binary data in MongoDB. Payload records should only keep
media metadata such as URL, Storage path, content type, file size, dimensions, alt text, captions,
and sort order.

## Firebase Setup

1. Create or select the Firebase project that owns the existing media.
2. Confirm Firebase Storage is enabled and the target bucket matches `FIREBASE_STORAGE_BUCKET`.
3. Create a Firebase web app and copy its config into the `NEXT_PUBLIC_FIREBASE_*` variables.
4. Create a service account key for server-side custom-token creation.
5. Store the service account values in the server-only variables:
   `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`.
6. Deploy the checked-in Storage rules:

```sh
firebase deploy --only storage
```

The checked-in `storage.rules` file allows public reads and restricts writes to authenticated
Firebase users whose token contains:

- `payloadAdmin: true`
- `allowedPathPrefix` equal to the exact upload path prefix for the current project asset

Current upload limits are:

| Asset | Path | Max size | Content type |
| --- | --- | ---: | --- |
| Screenshot | `projects/{slug}/screenshots/{landscape|portrait}/{fileName}` | 20 MB | `image/*` |
| Poster | `projects/{slug}/posters/{fileName}` | 20 MB | `image/*` |
| Video | `projects/{slug}/videos/{fileName}` | 250 MB | `video/*` |

## Build and Release Checklist

Run the checklist from a clean branch before production deployment:

```sh
pnpm install
pnpm generate:types
pnpm generate:importmap
pnpm typecheck
pnpm test
pnpm build
```

Then verify:

- `/` renders public content.
- `/about`, `/featured`, `/featured/[slug]`, and `/contact` render without server errors.
- `/admin` loads over HTTPS in production.
- An admin can log in and edit `siteSettings`.
- A project screenshot upload succeeds from the Payload admin UI.
- A project video upload either succeeds or fails with a clear validation error for size/type.
- Existing Firebase media URLs still load.

## Migration and Admin Workflow

Use the migration scripts before the first production content cutover:

```sh
pnpm migration:export:firestore
pnpm migration:validate
pnpm migration:import -- --dry-run
pnpm migration:import
```

The default Firestore export path is:

```text
src/modules/migration/data/firestore-export.json
```

After import:

1. Open `/admin`.
2. Create the initial Payload admin account if the database is empty, or log in with an existing
   admin account.
3. Review `siteSettings`.
4. Review all `projects`, especially slugs, featured flags, sort order, screenshots, videos, and
   legacy Firebase URLs.
5. Review `employmentHistory` and `educationHistory`.
6. Publish drafts that are ready for public display.

For ongoing edits, use Payload as the source of truth for structured content. Use the custom project
media UI in the Payload admin for screenshots, posters, and videos so Firebase metadata remains
attached to each project record.

## Rollback and Export Steps

Before a production migration or large admin content change:

1. Export or snapshot the MongoDB Atlas database.
2. Keep a copy of `src/modules/migration/data/firestore-export.json` from the cutover.
3. Keep the previous deployed app version available in the hosting provider.
4. Do not delete legacy Firebase media during cutover.

If rollback is required:

1. Repoint traffic to the previous deployment.
2. Restore the previous MongoDB Atlas snapshot if Payload content changes must be undone.
3. Redeploy the previous `storage.rules` only if the current rules block a required legacy admin
   workflow.
4. Re-run the smoke checks for public routes and existing Firebase media URLs.

For a manual Payload content export, use the hosting provider's database backup tooling or MongoDB
Atlas export/snapshot features. The app does not currently include a dedicated Payload export script.

## Sources

- [Payload production deployment docs](https://payloadcms.com/docs/production/deployment) informed
  the server-runtime and environment setup assumptions.
- [Payload database adapter docs](https://payloadcms.com/docs/database/overview) informed the
  MongoDB adapter deployment notes.
- [Firebase custom token docs](https://firebase.google.com/docs/auth/admin/create-custom-tokens)
  informed the upload-token bridge notes.
- [Firebase Storage security rules docs](https://firebase.google.com/docs/storage/security) and
  [rules conditions docs](https://firebase.google.com/docs/storage/security/rules-conditions)
  informed the Storage rule deployment and claim checks.
- [Firebase CLI deploy docs](https://firebase.google.com/docs/cli) informed the
  `firebase deploy --only storage` command.
- [MongoDB Atlas free cluster limits](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/)
  informed the free-tier hosting assumption.
- [Vercel environment variable docs](https://vercel.com/docs/environment-variables) informed the
  hosting environment variable guidance.
