import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

function parseEnvFile(content) {
  return Object.fromEntries(
    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const equalsIndex = line.indexOf('=')
        const key = line.slice(0, equalsIndex)
        const value = line.slice(equalsIndex + 1)
        return [key, value]
      })
  )
}

function getEnvValue(env, key) {
  return process.env[key] ?? env[key] ?? ''
}

async function main() {
  const envFile = await readFile(path.join(rootDir, '.env.local'), 'utf8')
  const env = parseEnvFile(envFile)
  const url = getEnvValue(env, 'NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getEnvValue(env, 'SUPABASE_SERVICE_ROLE_KEY')

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase URL or service role key is missing in .env.local')
  }

  const raw = await readFile(path.join(rootDir, 'data', 'records.json'), 'utf8')
  const data = JSON.parse(raw)
  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const deleteAll = async (table, column = 'id') => {
    const { error } = await supabase.from(table).delete().not(column, 'is', null)
    if (error) {
      throw error
    }
  }

  await deleteAll('expenses')
  await deleteAll('invoices')
  await deleteAll('projects')
  await deleteAll('clients')

  const clients = data.clients.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    created_at: client.createdAt,
  }))

  const projects = data.projects.map((project) => ({
    id: project.id,
    name: project.name,
    client_id: project.clientId,
    status: project.status,
    budget: project.budget,
    spent: project.spent,
    progress: project.progress,
    start_date: project.startDate,
    end_date: project.endDate,
    created_at: project.createdAt,
  }))

  const expenses = data.expenses.map((expense) => ({
    id: expense.id,
    project_id: expense.projectId,
    category: expense.category,
    description: expense.description,
    amount: expense.amount,
    date: expense.date,
    receipt: expense.receipt,
    created_at: expense.createdAt,
  }))

  const invoices = data.invoices.map((invoice) => ({
    id: invoice.id,
    project_id: invoice.projectId,
    client_id: invoice.clientId,
    amount: invoice.amount,
    status: invoice.status,
    issued_date: invoice.issuedDate,
    due_date: invoice.dueDate,
    paid_date: invoice.paidDate,
    created_at: invoice.createdAt,
  }))

  for (const [table, rows] of [
    ['clients', clients],
    ['projects', projects],
    ['expenses', expenses],
    ['invoices', invoices],
  ]) {
    if (!rows.length) {
      continue
    }

    const { error } = await supabase.from(table).insert(rows)
    if (error) {
      throw error
    }
  }

  console.log('Local JSON data synced to Supabase.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
