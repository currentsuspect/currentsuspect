import { NextResponse } from 'next/server'
import { updateDatabase } from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const incomeId = Number(params.id)

  const updatedIncome = await updateDatabase((data) => {
    const income = data.incomes.find((item) => item.id === incomeId)

    if (!income) {
      return null
    }

    const allocatedTo = body.allocatedTo !== undefined
      ? (body.allocatedTo ? Number(body.allocatedTo) : null)
      : income.allocatedTo

    income.amount = Number(body.amount ?? income.amount)
    income.date = String(body.date ?? income.date)
    income.source = String(body.source ?? income.source).trim()
    income.notes = String(body.notes ?? income.notes).trim()
    income.allocatedTo = allocatedTo

    const projectName = allocatedTo
      ? data.projects.find((p) => p.id === allocatedTo)?.name ?? 'Unknown Project'
      : null

    return {
      ...income,
      allocatedTo: projectName,
    }
  })

  if (!updatedIncome) {
    return NextResponse.json({ error: 'Income not found' }, { status: 404 })
  }

  return NextResponse.json(updatedIncome)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const incomeId = Number(params.id)

  const deleted = await updateDatabase((data) => {
    const income = data.incomes.find((item) => item.id === incomeId)

    if (!income) {
      return false
    }

    data.incomes = data.incomes.filter((item) => item.id !== incomeId)
    return true
  })

  if (!deleted) {
    return NextResponse.json({ error: 'Income not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
