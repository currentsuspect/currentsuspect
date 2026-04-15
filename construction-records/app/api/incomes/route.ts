import { NextResponse } from 'next/server'
import {
  formatIncomes,
  nextNumericId,
  readDatabase,
  updateDatabase,
} from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await readDatabase()
  return NextResponse.json(formatIncomes(data))
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.amount || !body.date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const income = await updateDatabase((data) => {
    const amount = Number(body.amount)
    const allocatedTo = body.allocatedTo ? Number(body.allocatedTo) : null

    const newIncome = {
      id: nextNumericId(data.incomes),
      amount,
      date: String(body.date),
      source: String(body.source || 'Unspecified').trim(),
      notes: String(body.notes || '').trim(),
      allocatedTo,
      createdAt: new Date().toISOString(),
    }

    data.incomes.push(newIncome)

    const projectName = allocatedTo
      ? data.projects.find((p) => p.id === allocatedTo)?.name ?? 'Unknown Project'
      : null

    return {
      ...newIncome,
      allocatedTo: projectName,
    }
  })

  return NextResponse.json(income, { status: 201 })
}
