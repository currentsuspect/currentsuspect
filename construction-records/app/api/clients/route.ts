import { NextResponse } from 'next/server'
import {
  formatClients,
  nextNumericId,
  readDatabase,
  updateDatabase,
} from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await readDatabase()
  return NextResponse.json(formatClients(data))
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.name || !body.phone || !body.address) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const client = await updateDatabase((data) => {
    const newClient = {
      id: nextNumericId(data.clients),
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      address: String(body.address).trim(),
      createdAt: new Date().toISOString(),
    }

    data.clients.push(newClient)

    return {
      ...newClient,
      projects: 0,
      totalValue: 0,
    }
  })

  return NextResponse.json(client, { status: 201 })
}
