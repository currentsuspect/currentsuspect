# Construction Records

A client & project management system for construction companies.

## Features

- 📋 **Project Management** - Track multiple construction projects with budgets, timelines, and progress
- 👥 **Client Database** - Manage client information and project history
- 💰 **Expense Tracking** - Record and categorize project expenses with receipt uploads
- 📄 **Invoice Generation** - Create and track invoices with automatic PDF generation
- 📊 **Reports & Analytics** - View revenue, expenses, and project profitability
- ☁️ **Google Drive Integration** - Automatic backups and document storage

## Tech Stack

- **Frontend:** Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** (To be configured - Firebase/Supabase recommended)
- **Storage:** Google Drive API
- **Auth:** Google OAuth

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Google OAuth Setup

Create a `.env.local` file with:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_EMAILS=tilistherconstructionandservic@gmail.com,makoridylan@gmail.com,faithkmutwota@gmail.com
```

In Google Cloud Console, add this redirect URI to the OAuth client:

```text
http://localhost:3000/api/auth/callback/google
```

For deployment, replace `NEXTAUTH_URL` and the redirect URI host with the production domain.

## Data Persistence

The app now persists projects, clients, expenses, and invoices through internal API routes backed by a local JSON store at `data/records.json`.

- First run seeds the file with the current sample data.
- After that, all dashboard CRUD actions write to the server-backed store and survive reloads.
- Writes are serialized through a lock file and committed via atomic rename so concurrent requests do not trample each other.
- The data files are local to this environment and are ignored by git.

## Supabase Setup

The app now supports `DATA_PROVIDER=auto`, which works like this:

- If Supabase credentials exist and the tables are present, the API uses Supabase.
- If Supabase is not ready yet, it falls back to the local JSON store so development does not break.
- If you want to force Supabase only, set `DATA_PROVIDER=supabase`.

Create the tables first:

1. Open the Supabase SQL Editor.
2. Paste and run [`supabase/schema.sql`](./supabase/schema.sql).

Then sync the current local records into Supabase:

```bash
npm run supabase:sync
```

After the schema exists, new CRUD actions will read and write through Supabase automatically while `DATA_PROVIDER=auto` is enabled.

Note: the current backup section is still a plan, not an implemented Google Drive integration yet.

## Project Structure

```
app/              # Next.js app router
components/       # Reusable UI components
lib/              # Utility functions and API clients
types/            # TypeScript type definitions
utils/            # Helper functions
```

## Google Drive Integration Setup

1. Create a Google Cloud project
2. Enable Google Drive API
3. Create OAuth 2.0 credentials
4. Add credentials to `.env.local`

## License

Private - For client use only
