// Types for Construction Records App

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
  projects: Project[]
}

export interface Project {
  id: string
  name: string
  clientId: string
  description: string
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled'
  budget: number
  startDate: Date
  endDate?: Date
  progress: number
  expenses: Expense[]
  invoices: Invoice[]
  documents: Document[]
}

export interface Expense {
  id: string
  projectId: string
  category: 'Materials' | 'Labor' | 'Equipment' | 'Transport' | 'Other'
  description: string
  amount: number
  date: Date
  receiptUrl?: string
}

export interface Invoice {
  id: string
  projectId: string
  invoiceNumber: string
  amount: number
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue'
  issuedAt: Date
  dueDate: Date
  paidAt?: Date
  pdfUrl?: string
}

export interface Document {
  id: string
  projectId: string
  name: string
  type: 'Contract' | 'Blueprint' | 'Permit' | 'Receipt' | 'Report' | 'Other'
  driveUrl: string
  uploadedAt: Date
}