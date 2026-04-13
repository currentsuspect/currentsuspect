import { promises as fs } from 'fs'
import path from 'path'
import { createSupabaseAdminClient, hasSupabaseConfig } from '@/lib/supabase'

type ProjectStatus = 'Planning' | 'In Progress' | 'Completed'
type InvoiceStatus = 'Pending' | 'Paid' | 'Overdue'

type ClientRecord = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
}

type ProjectRecord = {
  id: number
  name: string
  clientId: number
  status: ProjectStatus
  budget: number
  spent: number
  progress: number
  startDate: string
  endDate: string
  createdAt: string
}

type ExpenseRecord = {
  id: number
  projectId: number
  category: string
  description: string
  amount: number
  date: string
  receipt: boolean
  createdAt: string
}

type InvoiceRecord = {
  id: string
  projectId: number
  clientId: number
  amount: number
  status: InvoiceStatus
  issuedDate: string
  dueDate: string
  paidDate: string | null
  createdAt: string
}

type Database = {
  clients: ClientRecord[]
  projects: ProjectRecord[]
  expenses: ExpenseRecord[]
  invoices: InvoiceRecord[]
}

type DataProvider = 'local' | 'supabase' | 'auto'

const dataDir = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'records.json')
const lockFile = path.join(dataDir, 'records.lock')
const tempFile = path.join(dataDir, 'records.tmp')

function getDataProvider(): DataProvider {
  const provider = process.env.DATA_PROVIDER?.trim().toLowerCase()

  if (provider === 'local' || provider === 'supabase') {
    return provider
  }

  return 'auto'
}

const seedData: Database = {
  clients: [
    {
      id: 1,
      name: 'ABC Corp',
      email: 'contact@abccorp.co.ke',
      phone: '+254 712 345 678',
      address: 'Nairobi, Kenya',
      createdAt: '2024-01-10T00:00:00.000Z',
    },
    {
      id: 2,
      name: 'Mr. Ochieng',
      email: 'ochieng@email.com',
      phone: '+254 723 456 789',
      address: 'Kiambu, Kenya',
      createdAt: '2024-02-01T00:00:00.000Z',
    },
    {
      id: 3,
      name: 'XYZ Retail',
      email: 'info@xyzretail.co.ke',
      phone: '+254 734 567 890',
      address: 'Nairobi, Kenya',
      createdAt: '2024-02-12T00:00:00.000Z',
    },
    {
      id: 4,
      name: 'Logistics Plus',
      email: 'admin@logisticsplus.com',
      phone: '+254 745 678 901',
      address: 'Mombasa Road, Kenya',
      createdAt: '2024-02-20T00:00:00.000Z',
    },
  ],
  projects: [
    {
      id: 1,
      name: 'Nairobi Office Complex',
      clientId: 1,
      status: 'In Progress',
      budget: 850000,
      spent: 552500,
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      createdAt: '2024-01-15T00:00:00.000Z',
    },
    {
      id: 2,
      name: 'Residential Villa',
      clientId: 2,
      status: 'Planning',
      budget: 1200000,
      spent: 120000,
      progress: 10,
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      createdAt: '2024-03-01T00:00:00.000Z',
    },
    {
      id: 3,
      name: 'Retail Store Renovation',
      clientId: 3,
      status: 'Completed',
      budget: 320000,
      spent: 315000,
      progress: 100,
      startDate: '2023-11-01',
      endDate: '2024-02-28',
      createdAt: '2023-11-01T00:00:00.000Z',
    },
    {
      id: 4,
      name: 'Warehouse Extension',
      clientId: 4,
      status: 'In Progress',
      budget: 650000,
      spent: 325000,
      progress: 50,
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      createdAt: '2024-02-01T00:00:00.000Z',
    },
  ],
  expenses: [
    {
      id: 1,
      projectId: 1,
      category: 'Materials',
      description: 'Cement and steel reinforcement',
      amount: 125000,
      date: '2024-03-15',
      receipt: true,
      createdAt: '2024-03-15T00:00:00.000Z',
    },
    {
      id: 2,
      projectId: 1,
      category: 'Labor',
      description: 'Masonry team - March week 2',
      amount: 45000,
      date: '2024-03-14',
      receipt: true,
      createdAt: '2024-03-14T00:00:00.000Z',
    },
    {
      id: 3,
      projectId: 2,
      category: 'Permits',
      description: 'Building permit fees',
      amount: 25000,
      date: '2024-03-10',
      receipt: true,
      createdAt: '2024-03-10T00:00:00.000Z',
    },
    {
      id: 4,
      projectId: 4,
      category: 'Materials',
      description: 'Roofing materials',
      amount: 180000,
      date: '2024-03-08',
      receipt: false,
      createdAt: '2024-03-08T00:00:00.000Z',
    },
  ],
  invoices: [
    {
      id: 'INV-001',
      projectId: 1,
      clientId: 1,
      amount: 425000,
      status: 'Paid',
      issuedDate: '2024-03-01',
      dueDate: '2024-03-31',
      paidDate: '2024-03-25',
      createdAt: '2024-03-01T00:00:00.000Z',
    },
    {
      id: 'INV-002',
      projectId: 3,
      clientId: 3,
      amount: 320000,
      status: 'Paid',
      issuedDate: '2024-02-15',
      dueDate: '2024-03-15',
      paidDate: '2024-03-10',
      createdAt: '2024-02-15T00:00:00.000Z',
    },
    {
      id: 'INV-003',
      projectId: 1,
      clientId: 1,
      amount: 425000,
      status: 'Pending',
      issuedDate: '2024-03-20',
      dueDate: '2024-04-20',
      paidDate: null,
      createdAt: '2024-03-20T00:00:00.000Z',
    },
    {
      id: 'INV-004',
      projectId: 4,
      clientId: 4,
      amount: 325000,
      status: 'Overdue',
      issuedDate: '2024-02-28',
      dueDate: '2024-03-30',
      paidDate: null,
      createdAt: '2024-02-28T00:00:00.000Z',
    },
  ],
}

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true })

  try {
    await fs.access(dataFile)
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seedData, null, 2), 'utf8')
  }
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function acquireLock() {
  await ensureStore()

  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const handle = await fs.open(lockFile, 'wx')

      return async () => {
        await handle.close()
        await fs.unlink(lockFile).catch(() => {})
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error
      }

      await sleep(25)
    }
  }

  throw new Error('Timed out waiting for the data store lock')
}

async function readLocalDatabase(): Promise<Database> {
  await ensureStore()
  const raw = await fs.readFile(dataFile, 'utf8')
  return JSON.parse(raw) as Database
}

async function writeLocalDatabase(data: Database) {
  const releaseLock = await acquireLock()

  try {
    await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf8')
    await fs.rename(tempFile, dataFile)
  } finally {
    await releaseLock()
  }
}

async function updateLocalDatabase<T>(updater: (data: Database) => T | Promise<T>) {
  const releaseLock = await acquireLock()

  try {
    const raw = await fs.readFile(dataFile, 'utf8')
    const data = JSON.parse(raw) as Database
    const result = await updater(data)

    await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf8')
    await fs.rename(tempFile, dataFile)

    return result
  } finally {
    await releaseLock()
  }
}

function isMissingSupabaseTableError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false
  }

  const code = 'code' in error ? String(error.code ?? '') : ''
  const message = 'message' in error ? String(error.message ?? '').toLowerCase() : ''

  return (
    code === '42P01' ||
    code === 'PGRST116' ||
    code === 'PGRST205' ||
    message.includes('relation') ||
    message.includes('could not find the table') ||
    message.includes('schema cache')
  )
}

function shouldUseSupabase() {
  const provider = getDataProvider()

  if (provider === 'local') {
    return false
  }

  return hasSupabaseConfig()
}

async function readSupabaseDatabase(): Promise<Database> {
  const supabase = createSupabaseAdminClient()
  const [clientsResult, projectsResult, expensesResult, invoicesResult] = await Promise.all([
    supabase.from('clients').select('*').order('id', { ascending: true }),
    supabase.from('projects').select('*').order('id', { ascending: true }),
    supabase.from('expenses').select('*').order('id', { ascending: true }),
    supabase.from('invoices').select('*').order('id', { ascending: true }),
  ])

  const error =
    clientsResult.error ?? projectsResult.error ?? expensesResult.error ?? invoicesResult.error

  if (error) {
    throw error
  }

  return {
    clients: (clientsResult.data ?? []).map((client) => ({
      id: Number(client.id),
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      createdAt: client.created_at,
    })),
    projects: (projectsResult.data ?? []).map((project) => ({
      id: Number(project.id),
      name: project.name,
      clientId: Number(project.client_id),
      status: project.status,
      budget: Number(project.budget),
      spent: Number(project.spent ?? 0),
      progress: Number(project.progress),
      startDate: project.start_date,
      endDate: project.end_date,
      createdAt: project.created_at,
    })),
    expenses: (expensesResult.data ?? []).map((expense) => ({
      id: Number(expense.id),
      projectId: Number(expense.project_id),
      category: expense.category,
      description: expense.description,
      amount: Number(expense.amount),
      date: expense.date,
      receipt: Boolean(expense.receipt),
      createdAt: expense.created_at,
    })),
    invoices: (invoicesResult.data ?? []).map((invoice) => ({
      id: invoice.id,
      projectId: Number(invoice.project_id),
      clientId: Number(invoice.client_id),
      amount: Number(invoice.amount),
      status: invoice.status,
      issuedDate: invoice.issued_date,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_date,
      createdAt: invoice.created_at,
    })),
  }
}

async function clearSupabaseTable(table: string) {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from(table).delete().not('id', 'is', null)

  if (error) {
    throw error
  }
}

async function insertSupabaseRows(table: string, rows: Record<string, unknown>[]) {
  if (!rows.length) {
    return
  }

  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from(table).insert(rows)

  if (error) {
    throw error
  }
}

async function writeSupabaseDatabase(data: Database) {
  await clearSupabaseTable('expenses')
  await clearSupabaseTable('invoices')
  await clearSupabaseTable('projects')
  await clearSupabaseTable('clients')

  await insertSupabaseRows(
    'clients',
    data.clients.map((client) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      created_at: client.createdAt,
    }))
  )

  await insertSupabaseRows(
    'projects',
    data.projects.map((project) => ({
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
  )

  await insertSupabaseRows(
    'expenses',
    data.expenses.map((expense) => ({
      id: expense.id,
      project_id: expense.projectId,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      receipt: expense.receipt,
      created_at: expense.createdAt,
    }))
  )

  await insertSupabaseRows(
    'invoices',
    data.invoices.map((invoice) => ({
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
  )
}

async function withDataFallback<T>(operation: () => Promise<T>): Promise<T> {
  const provider = getDataProvider()

  if (!shouldUseSupabase()) {
    return operation()
  }

  try {
    return await operation()
  } catch (error) {
    if (provider === 'supabase' || !isMissingSupabaseTableError(error)) {
      throw error
    }

    return operation()
  }
}

export async function readDatabase(): Promise<Database> {
  if (!shouldUseSupabase()) {
    return readLocalDatabase()
  }

  try {
    return await readSupabaseDatabase()
  } catch (error) {
    if (getDataProvider() === 'supabase' || !isMissingSupabaseTableError(error)) {
      throw error
    }

    return readLocalDatabase()
  }
}

export async function writeDatabase(data: Database) {
  if (!shouldUseSupabase()) {
    return writeLocalDatabase(data)
  }

  try {
    return await writeSupabaseDatabase(data)
  } catch (error) {
    if (getDataProvider() === 'supabase' || !isMissingSupabaseTableError(error)) {
      throw error
    }

    return writeLocalDatabase(data)
  }
}

export async function updateDatabase<T>(updater: (data: Database) => T | Promise<T>) {
  if (!shouldUseSupabase()) {
    return updateLocalDatabase(updater)
  }

  try {
    const data = await readSupabaseDatabase()
    const result = await updater(data)
    await writeSupabaseDatabase(data)
    return result
  } catch (error) {
    if (getDataProvider() === 'supabase' || !isMissingSupabaseTableError(error)) {
      throw error
    }

    return updateLocalDatabase(updater)
  }
}

function clientMap(data: Database) {
  return new Map(data.clients.map((client) => [client.id, client]))
}

function projectMap(data: Database) {
  return new Map(data.projects.map((project) => [project.id, project]))
}

function projectSpendMap(data: Database) {
  const spendByProject = new Map<number, number>()

  for (const expense of data.expenses) {
    spendByProject.set(
      expense.projectId,
      (spendByProject.get(expense.projectId) ?? 0) + expense.amount
    )
  }

  return spendByProject
}

export function formatProjects(data: Database) {
  const clientsById = clientMap(data)
  const spendByProject = projectSpendMap(data)

  return data.projects
    .map((project) => ({
      ...project,
      spent: spendByProject.get(project.id) ?? 0,
      balance: project.budget - (spendByProject.get(project.id) ?? 0),
      client: clientsById.get(project.clientId)?.name ?? 'Unknown Client',
    }))
    .sort((a, b) => b.id - a.id)
}

export function formatClients(data: Database) {
  const spendByProject = projectSpendMap(data)

  return data.clients
    .map((client) => {
      const projects = data.projects.filter((project) => project.clientId === client.id)
      const totalValue = projects.reduce((sum, project) => sum + project.budget, 0)
      const totalSpent = projects.reduce(
        (sum, project) => sum + (spendByProject.get(project.id) ?? 0),
        0
      )

      return {
        ...client,
        projects: projects.length,
        totalValue,
        totalSpent,
        balance: totalValue - totalSpent,
      }
    })
    .sort((a, b) => b.id - a.id)
}

export function formatExpenses(data: Database) {
  const projectsById = projectMap(data)

  return data.expenses
    .map((expense) => ({
      ...expense,
      project: projectsById.get(expense.projectId)?.name ?? 'Unknown Project',
    }))
    .sort((a, b) => b.id - a.id)
}

export function formatInvoices(data: Database) {
  const projectsById = projectMap(data)
  const clientsById = clientMap(data)

  return data.invoices
    .map((invoice) => ({
      ...invoice,
      project: projectsById.get(invoice.projectId)?.name ?? 'Unknown Project',
      client: clientsById.get(invoice.clientId)?.name ?? 'Unknown Client',
    }))
    .sort((a, b) => b.id.localeCompare(a.id))
}

export function nextNumericId(items: Array<{ id: number }>) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

export function nextInvoiceId(items: InvoiceRecord[]) {
  const nextNumber =
    items.reduce((max, item) => Math.max(max, Number(item.id.replace('INV-', '')) || 0), 0) + 1

  return `INV-${String(nextNumber).padStart(3, '0')}`
}
