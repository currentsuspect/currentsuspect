import { NextResponse } from 'next/server'
import {
  formatProjects,
  nextNumericId,
  readDatabase,
  updateDatabase,
} from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await readDatabase()
  return NextResponse.json(formatProjects(data))
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.name || !body.clientId || !body.budget || !body.startDate || !body.endDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const project = await updateDatabase((data) => {
    const client = data.clients.find((item) => item.id === Number(body.clientId))

    if (!client) {
      throw new Error('Client not found')
    }

    const newProject = {
      id: nextNumericId(data.projects),
      name: String(body.name).trim(),
      clientId: Number(body.clientId),
      status: body.status ?? 'Planning',
      budget: Number(body.budget),
      spent: 0,
      progress: 0,
      startDate: String(body.startDate),
      endDate: String(body.endDate),
      createdAt: new Date().toISOString(),
    }

    data.projects.push(newProject)

    return {
      ...newProject,
      client: client.name,
    }
  })

  return NextResponse.json(project, { status: 201 })
}
