import { NextResponse } from 'next/server'
import {
  formatExpenses,
  nextNumericId,
  readDatabase,
  updateDatabase,
} from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await readDatabase()
  return NextResponse.json(formatExpenses(data))
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.projectId || !body.category || !body.description || !body.amount || !body.date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const expense = await updateDatabase((data) => {
    const project = data.projects.find((item) => item.id === Number(body.projectId))

    if (!project) {
      throw new Error('Project not found')
    }

    const amount = Number(body.amount)
    const newExpense = {
      id: nextNumericId(data.expenses),
      projectId: Number(body.projectId),
      category: String(body.category),
      description: String(body.description).trim(),
      amount,
      date: String(body.date),
      receipt: Boolean(body.receipt),
      createdAt: new Date().toISOString(),
    }

    data.expenses.push(newExpense)
    project.spent += amount

    return {
      ...newExpense,
      project: project.name,
    }
  })

  return NextResponse.json(expense, { status: 201 })
}
