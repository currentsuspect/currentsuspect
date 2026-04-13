import { NextResponse } from 'next/server'
import { updateDatabase } from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const projectId = Number(params.id)

  const updatedProject = await updateDatabase((data) => {
    const project = data.projects.find((item) => item.id === projectId)

    if (!project) {
      return null
    }

    project.name = String(body.name ?? project.name).trim()
    project.status = body.status ?? project.status
    project.budget = Number(body.budget ?? project.budget)
    project.progress = Number(body.progress ?? project.progress)
    project.startDate = String(body.startDate ?? project.startDate)
    project.endDate = String(body.endDate ?? project.endDate)

    const client = data.clients.find((item) => item.id === project.clientId)

    return {
      ...project,
      client: client?.name ?? 'Unknown Client',
    }
  })

  if (!updatedProject) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json(updatedProject)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const projectId = Number(params.id)

  const deleted = await updateDatabase((data) => {
    const beforeProjects = data.projects.length
    data.projects = data.projects.filter((project) => project.id !== projectId)
    data.expenses = data.expenses.filter((expense) => expense.projectId !== projectId)
    data.invoices = data.invoices.filter((invoice) => invoice.projectId !== projectId)
    return data.projects.length !== beforeProjects
  })

  if (!deleted) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
