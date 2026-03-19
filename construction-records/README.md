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