import { NextResponse } from 'next/server'
import { formatClients, updateDatabase } from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const clientId = Number(params.id)

  const updatedClient = await updateDatabase((data) => {
    const client = data.clients.find((item) => item.id === clientId)

    if (!client) {
      return null
    }

    client.name = String(body.name ?? client.name).trim()
    client.email = String(body.email ?? client.email).trim()
    client.phone = String(body.phone ?? client.phone).trim()
    client.address = String(body.address ?? client.address).trim()
    return formatClients(data).find((item) => item.id === client.id) ?? null
  })

  if (!updatedClient) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  return NextResponse.json(updatedClient)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const clientId = Number(params.id)

  const deleted = await updateDatabase((data) => {
    const projectIds = new Set(
      data.projects.filter((project) => project.clientId === clientId).map((project) => project.id)
    )
    const beforeClients = data.clients.length

    data.clients = data.clients.filter((client) => client.id !== clientId)
    data.projects = data.projects.filter((project) => project.clientId !== clientId)
    data.expenses = data.expenses.filter((expense) => !projectIds.has(expense.projectId))
    data.invoices = data.invoices.filter(
      (invoice) => invoice.clientId !== clientId && !projectIds.has(invoice.projectId)
    )

    return data.clients.length !== beforeClients
  })

  if (!deleted) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
