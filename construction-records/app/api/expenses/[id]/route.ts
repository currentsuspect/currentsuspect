import { NextResponse } from 'next/server'
import { updateDatabase } from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const expenseId = Number(params.id)

  const updatedExpense = await updateDatabase((data) => {
    const expense = data.expenses.find((item) => item.id === expenseId)

    if (!expense) {
      return null
    }

    const project = data.projects.find((item) => item.id === expense.projectId)
    const previousAmount = expense.amount
    const nextAmount = Number(body.amount ?? expense.amount)

    expense.category = String(body.category ?? expense.category)
    expense.description = String(body.description ?? expense.description).trim()
    expense.amount = nextAmount
    expense.date = String(body.date ?? expense.date)
    expense.receipt = Boolean(body.receipt ?? expense.receipt)

    if (project) {
      project.spent += nextAmount - previousAmount
    }

    return {
      ...expense,
      project: project?.name ?? 'Unknown Project',
    }
  })

  if (!updatedExpense) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 })
  }

  return NextResponse.json(updatedExpense)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const expenseId = Number(params.id)

  const deleted = await updateDatabase((data) => {
    const expense = data.expenses.find((item) => item.id === expenseId)

    if (!expense) {
      return false
    }

    data.expenses = data.expenses.filter((item) => item.id !== expenseId)

    const project = data.projects.find((item) => item.id === expense.projectId)
    if (project) {
      project.spent = Math.max(0, project.spent - expense.amount)
    }

    return true
  })

  if (!deleted) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
