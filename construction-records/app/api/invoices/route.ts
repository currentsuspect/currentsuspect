import { NextResponse } from 'next/server'
import {
  formatInvoices,
  nextInvoiceId,
  readDatabase,
  updateDatabase,
} from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await readDatabase()
  return NextResponse.json(formatInvoices(data))
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.projectId || !body.clientId || !body.amount || !body.dueDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const invoice = await updateDatabase((data) => {
    const project = data.projects.find((item) => item.id === Number(body.projectId))
    const client = data.clients.find((item) => item.id === Number(body.clientId))

    if (!project || !client) {
      throw new Error('Project or client not found')
    }

    if (project.clientId !== client.id) {
      throw new Error('Selected client does not match the chosen project')
    }

    const today = new Date().toISOString().split('T')[0]
    const newInvoice = {
      id: nextInvoiceId(data.invoices),
      projectId: Number(body.projectId),
      clientId: Number(body.clientId),
      amount: Number(body.amount),
      status: 'Pending' as const,
      issuedDate: today,
      dueDate: String(body.dueDate),
      paidDate: null,
      createdAt: new Date().toISOString(),
    }

    data.invoices.push(newInvoice)

    return {
      ...newInvoice,
      project: project.name,
      client: client.name,
    }
  })

  return NextResponse.json(invoice, { status: 201 })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const ids = Array.isArray(body.ids) ? body.ids : []
  const nextStatus = body.status

  if (!ids.length || !nextStatus) {
    return NextResponse.json({ error: 'Missing invoice ids or status' }, { status: 400 })
  }

  const updated = await updateDatabase((data) => {
    const paidDate = nextStatus === 'Paid' ? new Date().toISOString().split('T')[0] : null
    let count = 0

    data.invoices.forEach((invoice) => {
      if (ids.includes(invoice.id)) {
        invoice.status = nextStatus
        invoice.paidDate = paidDate
        count += 1
      }
    })

    return count
  })

  return NextResponse.json({ updated })
}
