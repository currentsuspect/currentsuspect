import { NextResponse } from 'next/server'
import { updateDatabase } from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const invoiceId = params.id

  const deleted = await updateDatabase((data) => {
    const beforeInvoices = data.invoices.length
    data.invoices = data.invoices.filter((invoice) => invoice.id !== invoiceId)
    return data.invoices.length !== beforeInvoices
  })

  if (!deleted) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
