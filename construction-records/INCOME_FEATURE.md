# Income Tracking for Construction Records
Date: 2026-04-14

## Context
The VA logs income from the boss without always specifying where it came from. She needs to:
1. Log income entries (amount, date, optional source/notes)
2. Allocate income to specific projects (subsidize)
3. Track total income vs allocated income

## Data Model

### IncomeRecord
```typescript
{
  id: number
  amount: number          // Amount received
  date: string            // Date received
  source: string          // Optional — "Boss", "Client Payment", "Loan", etc.
  notes: string           // Optional — description
  allocatedTo: number | null  // Project ID if allocated, null if unallocated
  createdAt: string
}
```

### Key Fields
- `source`: defaults to "Unspecified" if blank — VA doesn't always know where money came from
- `allocatedTo`: project ID if this income was earmarked for a specific project
- Unallocated income shows as "Available" balance

## UI Changes

### Main Page
Add "Income" tab alongside Projects, Clients, Expenses, Invoices:
- Table: Date | Source | Amount | Allocated To | Notes
- Quick-add: "Log Income" button with amount, date, source fields
- Summary: Total income | Allocated | Available

### Projects
When viewing a project, show:
- Income allocated to this project
- Budget vs Income allocated

## API Routes

### GET /api/incomes
Returns all income records, formatted with project names

### POST /api/incomes
Creates a new income entry:
```json
{
  "amount": 50000,
  "date": "2026-04-14",
  "source": "Boss",
  "notes": "Weekly cash",
  "allocatedTo": null
}
```

### PATCH /api/incomes/[id]
Update income (e.g., allocate to project later):
```json
{
  "allocatedTo": 3
}
```

### DELETE /api/incomes/[id]
Remove income entry

## Files to Change
1. `types/index.ts` — add Income interface
2. `lib/data-store.ts` — add IncomeRecord, seed data, formatIncomes
3. `app/api/incomes/route.ts` — GET/POST
4. `app/api/incomes/[id]/route.ts` — PATCH/DELETE
5. `app/page.tsx` — add Income tab and table
