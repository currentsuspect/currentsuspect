'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Building2, Users, FileText, DollarSign, TrendingUp, Calendar,
  Menu, X, Plus, Search, MoreVertical, ChevronRight, Phone, Mail, MapPin,
  Receipt, Wallet, Download, Trash2, Edit, CheckSquare, Square, AlertCircle,
  Printer, FileSpreadsheet, Command, Bell, Clock, AlertTriangle, Mic, LogOut
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { signOut, useSession } from 'next-auth/react'

// Navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Building2 },
  { id: 'projects', label: 'Projects', icon: Building2 },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'expenses', label: 'Expenses', icon: Wallet },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'reports', label: 'Reports', icon: TrendingUp },
]

// Toast type
type ToastType = 'success' | 'error' | 'info' | 'warning'
interface Toast {
  id: string
  message: string
  type: ToastType
}

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Data state (from API)
  const [projects, setProjects] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  
  // Auth session
  const { data: session } = useSession()
  const userEmail = session?.user?.email?.toLowerCase() || ''
  const userRole =
    userEmail === 'tilistherconstructionandservic@gmail.com'
      ? 'CEO'
      : userEmail === 'makoridylan@gmail.com'
        ? 'Web Dev'
        : userEmail === 'faithkmutwota@gmail.com'
          ? 'Virtual Assistant'
          : 'Team Member'

  // Search & Filter states
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')
  const [invoiceFilter, setInvoiceFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // Bulk selection states
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([])

  // Modal states
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false)
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const [confirmMessage, setConfirmMessage] = useState('')

  // View/Edit modal states
  const [viewingProject, setViewingProject] = useState<any>(null)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [viewingClient, setViewingClient] = useState<any>(null)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [editingExpense, setEditingExpense] = useState<any>(null)

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false)
  const [recordingField, setRecordingField] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // Form states with auto-save
  const [projectForm, setProjectForm] = useState({ name: '', client: '', budget: '', spent: '0', progress: '0', startDate: '', endDate: '', status: 'Planning' })
  const [clientForm, setClientForm] = useState({ name: '', phone: '', address: '' })
  const [expenseForm, setExpenseForm] = useState({ project: '', category: 'Materials', description: '', amount: '', date: '', receipt: false })
  const [invoiceForm, setInvoiceForm] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return { project: '', client: '', amount: '', dueDate: d.toISOString().split('T')[0] }
  })

  // Form validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Auto-save drafts from localStorage
  useEffect(() => {
    const savedProject = localStorage.getItem('draft_project')
    const savedClient = localStorage.getItem('draft_client')
    const savedExpense = localStorage.getItem('draft_expense')
    const savedInvoice = localStorage.getItem('draft_invoice')

    if (savedProject) setProjectForm(JSON.parse(savedProject))
    if (savedClient) setClientForm(JSON.parse(savedClient))
    if (savedExpense) setExpenseForm(JSON.parse(savedExpense))
    if (savedInvoice) setInvoiceForm(JSON.parse(savedInvoice))
  }, [])

  // Auto-save forms
  useEffect(() => {
    localStorage.setItem('draft_project', JSON.stringify(projectForm))
  }, [projectForm])

  useEffect(() => {
    localStorage.setItem('draft_client', JSON.stringify(clientForm))
  }, [clientForm])

  useEffect(() => {
    localStorage.setItem('draft_expense', JSON.stringify(expenseForm))
  }, [expenseForm])

  useEffect(() => {
    localStorage.setItem('draft_invoice', JSON.stringify(invoiceForm))
  }, [invoiceForm])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowSearch(false)
        setShowNewProjectModal(false)
        setShowNewClientModal(false)
        setShowNewExpenseModal(false)
        setShowNewInvoiceModal(false)
      }
      // N for new project
      if (e.key === 'n' && !e.metaKey && !e.ctrlKey && !showSearch) {
        setShowNewProjectModal(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSearch])

  // Toast helper
  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const refreshData = useCallback(async (showErrorToast = true) => {
    setIsLoading(true)
    try {
      const [projectsRes, clientsRes, expensesRes, invoicesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/clients'),
        fetch('/api/expenses'),
        fetch('/api/invoices')
      ])

      if (projectsRes.ok) setProjects(await projectsRes.json())
      if (clientsRes.ok) setClients(await clientsRes.json())
      if (expensesRes.ok) setExpenses(await expensesRes.json())
      if (invoicesRes.ok) setInvoices(await invoicesRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
      if (showErrorToast) {
        showToast('Failed to load data from server', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    refreshData(false)
  }, [refreshData])

  // Confirm dialog helper
  const confirm = (message: string, action: () => void) => {
    setConfirmMessage(message)
    setConfirmAction(() => action)
    setShowConfirmModal(true)
  }

  // CSV Export
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      showToast('No records to export', 'warning')
      return
    }

    const exportData =
      filename === 'projects'
        ? data.map(project => ({
            id: project.id,
            name: project.name,
            client: project.client,
            status: project.status,
            budget: project.budget,
            spent: project.spent,
            balance: project.balance ?? project.budget - project.spent,
            progress: project.progress,
            startDate: project.startDate,
            endDate: project.endDate,
          }))
        : filename === 'clients'
          ? data.map(client => ({
              id: client.id,
              name: client.name,
              email: client.email,
              phone: client.phone,
              address: client.address,
              projects: client.projects,
              totalValue: client.totalValue,
              totalSpent: client.totalSpent ?? 0,
              balance: client.balance ?? client.totalValue,
            }))
          : filename === 'expenses'
            ? data.map(expense => ({
                id: expense.id,
                project: expense.project,
                category: expense.category,
                description: expense.description,
                amount: expense.amount,
                date: expense.date,
                receipt: expense.receipt ? 'Yes' : 'No',
              }))
            : filename === 'invoices'
              ? data.map(invoice => ({
                  id: invoice.id,
                  client: invoice.client,
                  project: invoice.project,
                  amount: invoice.amount,
                  status: invoice.status,
                  issuedDate: invoice.issuedDate,
                  dueDate: invoice.dueDate,
                  paidDate: invoice.paidDate ?? '',
                }))
              : data

    const headers = Object.keys(exportData[0]).join(',')
    const rows = exportData.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
        .join(',')
    )
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    showToast(`Exported ${data.length} records to CSV`, 'success')
  }

  // Print Invoice
  const printInvoice = (invoice: any) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .invoice-title { font-size: 32px; color: #2563eb; margin: 0; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 30px 0; }
            .section { background: #f3f4f6; padding: 20px; border-radius: 8px; }
            .amount { font-size: 36px; font-weight: bold; color: #2563eb; margin: 20px 0; }
            .status { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
            .status-paid { background: #dcfce7; color: #166534; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-overdue { background: #fee2e2; color: #991b1b; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background: #f3f4f6; font-weight: 600; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="invoice-title">INVOICE</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0;">${invoice.id}</p>
          </div>

          <div class="details">
            <div class="section">
              <h3>Bill To:</h3>
              <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">${invoice.client}</p>
              <p style="color: #6b7280;">Project: ${invoice.project}</p>
            </div>
            <div class="section">
              <h3>Invoice Details:</h3>
              <p><strong>Issued:</strong> ${invoice.issuedDate}</p>
              <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
              ${invoice.paidDate ? `<p><strong>Paid:</strong> ${invoice.paidDate}</p>` : ''}
            </div>
          </div>

          <div style="text-align: center;">
            <p style="color: #6b7280; margin-bottom: 10px;">Total Amount</p>
            <div class="amount">KES ${invoice.amount.toLocaleString()}</div>
            <span class="status status-${invoice.status.toLowerCase()}">${invoice.status}</span>
          </div>

          <div class="footer">
            <p>Tilisther Construction & Renovation Services Ltd.</p>
            <p style="font-size: 12px; margin-top: 10px;">This is a computer-generated invoice.</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  // Validate forms
  const validateProject = () => {
    const errors: Record<string, string> = {}
    if (!projectForm.name) errors.name = 'Project name is required'
    if (!projectForm.client) errors.client = 'Client is required'
    if (!projectForm.budget) errors.budget = 'Budget is required'
    if (parseInt(projectForm.budget) <= 0) errors.budget = 'Budget must be greater than 0'

    // Duplicate check
    const existing = projects.find(p => p.name.toLowerCase() === projectForm.name.toLowerCase())
    if (existing) errors.name = 'A project with this name already exists'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'In Progress').length
  const totalClients = clients.length
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0)
  const pendingInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length
  const pendingAmount = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0)

  // Filter data
  const filteredProjects = projects.filter(p => {
    if (projectFilter !== 'All' && p.status !== projectFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!p.name.toLowerCase().includes(query) && !p.client.toLowerCase().includes(query)) return false
    }
    if (dateFrom && new Date(p.startDate) < new Date(dateFrom)) return false
    if (dateTo && new Date(p.endDate) > new Date(dateTo)) return false
    return true
  })

  const filteredInvoices = invoices.filter(i => {
    if (invoiceFilter !== 'All' && i.status !== invoiceFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!i.id.toLowerCase().includes(query) && !i.client.toLowerCase().includes(query) && !i.project.toLowerCase().includes(query)) return false
    }
    if (dateFrom && new Date(i.dueDate) < new Date(dateFrom)) return false
    if (dateTo && new Date(i.dueDate) > new Date(dateTo)) return false
    return true
  })

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedInvoices([])
    } else {
      setSelectedInvoices(filteredInvoices.map(i => i.id))
    }
    setSelectAll(!selectAll)
  }

  const toggleInvoiceSelection = (id: string) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const bulkMarkAsPaid = async () => {
    confirm(`Mark ${selectedInvoices.length} invoices as paid?`, async () => {
      try {
        const response = await fetch('/api/invoices', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ids: selectedInvoices,
            status: 'Paid'
          })
        })

        if (response.ok) {
          await refreshData(false)
          setSelectedInvoices([])
          setSelectAll(false)
          showToast(`${selectedInvoices.length} invoices marked as paid`, 'success')
        } else {
          showToast('Failed to update invoices', 'error')
        }
      } catch (error) {
        console.error('Error updating invoices:', error)
        showToast('Failed to update invoices', 'error')
      }
    })
  }

  // Submit handlers
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateProject()) return

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectForm.name,
          clientId: clients.find(c => c.name === projectForm.client)?.id,
          budget: projectForm.budget,
          startDate: projectForm.startDate,
          endDate: projectForm.endDate,
          status: projectForm.status
        })
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setProjectForm({ name: '', client: '', budget: '', spent: '0', progress: '0', startDate: '', endDate: '', status: 'Planning' })
        localStorage.removeItem('draft_project')
        setShowNewProjectModal(false)
        showToast('Project created successfully!', 'success')
      } else {
        showToast('Failed to create project', 'error')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      showToast('Failed to create project', 'error')
    }
  }

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm)
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setClientForm({ name: '', phone: '', address: '' })
        localStorage.removeItem('draft_client')
        setShowNewClientModal(false)
        showToast('Client added successfully!', 'success')
      } else {
        showToast('Failed to add client', 'error')
      }
    } catch (error) {
      console.error('Error adding client:', error)
      showToast('Failed to add client', 'error')
    }
  }

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projects.find(p => p.name === expenseForm.project)?.id,
          category: expenseForm.category,
          description: expenseForm.description,
          amount: expenseForm.amount,
          date: expenseForm.date,
          receipt: expenseForm.receipt
        })
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setExpenseForm({ project: '', category: 'Materials', description: '', amount: '', date: '', receipt: false })
        localStorage.removeItem('draft_expense')
        setShowNewExpenseModal(false)
        showToast('Expense recorded successfully!', 'success')
      } else {
        showToast('Failed to record expense', 'error')
      }
    } catch (error) {
      console.error('Error recording expense:', error)
      showToast('Failed to record expense', 'error')
    }
  }

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projects.find(p => p.name === invoiceForm.project)?.id,
          clientId: clients.find(c => c.name === invoiceForm.client)?.id,
          amount: invoiceForm.amount,
          dueDate: invoiceForm.dueDate
        })
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setInvoiceForm({ project: '', client: '', amount: '', dueDate: '' })
        localStorage.removeItem('draft_invoice')
        setShowNewInvoiceModal(false)
        showToast('Invoice created successfully!', 'success')
      } else {
        showToast('Failed to create invoice', 'error')
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
      showToast('Failed to create invoice', 'error')
    }
  }

  // Edit handlers
  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectForm.name,
          status: projectForm.status,
          budget: parseInt(projectForm.budget),
          spent: parseInt(projectForm.spent || '0'),
          progress: parseInt(projectForm.progress || '0'),
          startDate: projectForm.startDate,
          endDate: projectForm.endDate
        })
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setEditingProject(null)
        setProjectForm({ name: '', client: '', budget: '', spent: '0', progress: '0', startDate: '', endDate: '', status: 'Planning' })
        showToast('Project updated successfully!', 'success')
      } else {
        showToast('Failed to update project', 'error')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      showToast('Failed to update project', 'error')
    }
  }

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingClient) return

    try {
      const response = await fetch(`/api/clients/${editingClient.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm)
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setEditingClient(null)
        setClientForm({ name: '', phone: '', address: '' })
        showToast('Client updated successfully!', 'success')
      } else {
        showToast('Failed to update client', 'error')
      }
    } catch (error) {
      console.error('Error updating client:', error)
      showToast('Failed to update client', 'error')
    }
  }

  const handleEditExpense = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExpense) return

    try {
      const response = await fetch(`/api/expenses/${editingExpense.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: expenseForm.category,
          description: expenseForm.description,
          amount: parseInt(expenseForm.amount),
          date: expenseForm.date,
          receipt: expenseForm.receipt
        })
      })

      if (response.ok) {
        await response.json()
        await refreshData(false)
        setEditingExpense(null)
        setExpenseForm({ project: '', category: 'Materials', description: '', amount: '', date: '', receipt: false })
        showToast('Expense updated successfully!', 'success')
      } else {
        showToast('Failed to update expense', 'error')
      }
    } catch (error) {
      console.error('Error updating expense:', error)
      showToast('Failed to update expense', 'error')
    }
  }

  // Delete handlers
  const deleteProject = (id: number) => {
    confirm('Are you sure you want to delete this project? This will also delete all associated expenses and invoices.', async () => {
      try {
        const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
        if (response.ok) {
          await refreshData(false)
          showToast('Project deleted successfully', 'success')
        } else {
          showToast('Failed to delete project', 'error')
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        showToast('Failed to delete project', 'error')
      }
    })
  }

  const deleteClient = (id: number) => {
    confirm('Are you sure you want to delete this client? This will also delete all their projects.', async () => {
      try {
        const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' })
        if (response.ok) {
          await refreshData(false)
          showToast('Client deleted successfully', 'success')
        } else {
          showToast('Failed to delete client', 'error')
        }
      } catch (error) {
        console.error('Error deleting client:', error)
        showToast('Failed to delete client', 'error')
      }
    })
  }

  const deleteExpense = (id: number) => {
    confirm('Are you sure you want to delete this expense?', async () => {
      try {
        const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' })
        if (response.ok) {
          await refreshData(false)
          showToast('Expense deleted successfully', 'success')
        } else {
          showToast('Failed to delete expense', 'error')
        }
      } catch (error) {
        console.error('Error deleting expense:', error)
        showToast('Failed to delete expense', 'error')
      }
    })
  }

  const deleteInvoice = (id: string) => {
    confirm('Are you sure you want to delete this invoice?', async () => {
      try {
        const response = await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
        if (response.ok) {
          await refreshData(false)
          showToast('Invoice deleted successfully', 'success')
        } else {
          showToast('Failed to delete invoice', 'error')
        }
      } catch (error) {
        console.error('Error deleting invoice:', error)
        showToast('Failed to delete invoice', 'error')
      }
    })
  }

  // Open edit modals
  const openEditProject = (project: any) => {
    setEditingProject(project)
    setProjectForm({
      name: project.name,
      client: project.client,
      budget: project.budget.toString(),
      spent: project.spent?.toString() || '0',
      progress: project.progress?.toString() || '0',
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status
    })
  }

  const openEditClient = (client: any) => {
    setEditingClient(client)
    setClientForm({
      name: client.name,
      phone: client.phone,
      address: client.address
    })
  }

  const openEditExpense = (expense: any) => {
    setEditingExpense(expense)
    setExpenseForm({
      project: expense.project,
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      receipt: expense.receipt
    })
  }

  // Voice recording functions
  const startRecording = async (field: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      const chunks: BlobPart[] = []
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }
      
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
        await transcribeAudio(blob, field)
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingField(field)
    } catch (error) {
      console.error('Error starting recording:', error)
      showToast('Microphone access denied', 'error')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const transcribeAudio = async (blob: Blob, field: string) => {
    try {
      showToast('Transcribing...', 'info')
      
      const formData = new FormData()
      formData.append('file', blob, 'recording.webm')
      
      const response = await fetch('https://stt.currentsuspect.me/transcribe', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Transcription failed')
      
      const data = await response.json()
      const transcript = data.text.trim()
      
      // Update the appropriate form field
      if (field.startsWith('project.')) {
        const key = field.split('.')[1] as keyof typeof projectForm
        setProjectForm(prev => ({ ...prev, [key]: prev[key] + ' ' + transcript }))
      } else if (field.startsWith('client.')) {
        const key = field.split('.')[1] as keyof typeof clientForm
        setClientForm(prev => ({ ...prev, [key]: prev[key] + ' ' + transcript }))
      } else if (field.startsWith('expense.')) {
        const key = field.split('.')[1] as keyof typeof expenseForm
        setExpenseForm(prev => ({ ...prev, [key]: prev[key] + ' ' + transcript }))
      }
      
      showToast('Transcribed: ' + transcript, 'success')
    } catch (error) {
      console.error('Transcription error:', error)
      showToast('Transcription failed', 'error')
    }
  }

  const VoiceButton = ({ field, label }: { field: string, label: string }) => (
    <button
      type="button"
      onClick={() => isRecording && recordingField === field ? stopRecording() : startRecording(field)}
      className={`ml-2 p-2 rounded-lg transition-colors ${
        isRecording && recordingField === field 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
      }`}
      title={isRecording && recordingField === field ? 'Click to stop' : `Voice input for ${label}`}
    >
      <Mic className="w-4 h-4" />
    </button>
  )

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return renderDashboard()
      case 'projects': return renderProjects()
      case 'clients': return renderClients()
      case 'expenses': return renderExpenses()
      case 'invoices': return renderInvoices()
      case 'reports': return renderReports()
      default: return renderDashboard()
    }
  }

  // [Rest of the component continues...]
  function renderDashboard() {
    // Calculate smart alerts
    const overdueInvoices = invoices.filter(i => i.status === 'Overdue')
    const projectsEndingSoon = projects.filter(p => {
      if (p.status !== 'In Progress') return false
      const endDate = new Date(p.endDate)
      const today = new Date()
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays <= 30 && diffDays > 0
    })
    const budgetWarnings = projects.filter(p => {
      if (p.status !== 'In Progress') return false
      const spentPercent = (p.spent / p.budget) * 100
      const progressPercent = p.progress
      return spentPercent > progressPercent + 10
    })

    return (
      <>
        {/* Smart Alerts */}
        {(overdueInvoices.length > 0 || projectsEndingSoon.length > 0 || budgetWarnings.length > 0) && (
          <div className="mb-6 space-y-3">
            {overdueInvoices.length > 0 && (
              <AlertCard
                type="error"
                icon={AlertCircle}
                title={`${overdueInvoices.length} Overdue Invoice${overdueInvoices.length > 1 ? 's' : ''}`}
                message={`INV-${overdueInvoices.map(i => i.id.split('-')[1]).join(', ')} need${overdueInvoices.length === 1 ? 's' : ''} immediate attention`}
                action="View Invoices"
                onAction={() => setCurrentView('invoices')}
              />
            )}
            {projectsEndingSoon.length > 0 && (
              <AlertCard
                type="warning"
                icon={Clock}
                title={`${projectsEndingSoon.length} Project${projectsEndingSoon.length > 1 ? 's' : ''} Ending Soon`}
                message={`${projectsEndingSoon.map(p => p.name).join(', ')} due within 30 days`}
                action="View Projects"
                onAction={() => setCurrentView('projects')}
              />
            )}
            {budgetWarnings.length > 0 && (
              <AlertCard
                type="info"
                icon={AlertTriangle}
                title={`${budgetWarnings.length} Budget Warning${budgetWarnings.length > 1 ? 's' : ''}`}
                message="Spending exceeds progress on some projects"
                action="Review"
                onAction={() => setCurrentView('projects')}
              />
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
          <StatCard icon={Building2} label="Active Projects" value={activeProjects.toString()} color="bg-blue-500" />
          <StatCard icon={Users} label="Total Clients" value={totalClients.toString()} color="bg-green-500" />
          <StatCard icon={DollarSign} label="Revenue (YTD)" value={`KES ${(totalRevenue / 1000000).toFixed(1)}M`} color="bg-orange-500" />
          <StatCard icon={FileText} label="Pending Invoices" value={pendingInvoices.toString()} color="bg-red-500" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 lg:p-6 mb-6">
          <h2 className="text-base lg:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <QuickActionButton icon={Plus} label="New Project" onClick={() => setShowNewProjectModal(true)} />
            <QuickActionButton icon={Users} label="Add Client" onClick={() => setShowNewClientModal(true)} />
            <QuickActionButton icon={Receipt} label="Create Invoice" onClick={() => setShowNewInvoiceModal(true)} />
            <QuickActionButton icon={Wallet} label="Record Expense" onClick={() => setShowNewExpenseModal(true)} />
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Projects</h2>
            <button onClick={() => setCurrentView('projects')} className="text-blue-700 hover:underline text-sm">
              View all →
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {projects.slice(0, 3).map(project => (
              <ProjectRow
                key={project.id}
                project={project}
                onClick={() => { setSelectedProject(project); setCurrentView('projects') }}
                onEdit={(e) => { e.stopPropagation(); openEditProject(project); }}
                onDelete={(e) => { e.stopPropagation(); deleteProject(project.id); }}
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  function renderProjects() {
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">Projects</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(filteredProjects, 'projects')} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowNewProjectModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> New
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="From"
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="To"
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            {(dateFrom || dateTo || searchQuery || projectFilter !== 'All') && (
              <button
                onClick={() => { setDateFrom(''); setDateTo(''); setSearchQuery(''); setProjectFilter('All') }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <ProjectRow
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                onEdit={(e) => { e.stopPropagation(); openEditProject(project); }}
                onDelete={(e) => { e.stopPropagation(); deleteProject(project.id); }}
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  function renderClients() {
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">Clients</h2>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(clients, 'clients')} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowNewClientModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map(client => (
            <div key={client.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEditClient(client)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="Edit">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => deleteClient(client.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">{client.name}</h3>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{client.address}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{client.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Value</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">KES {(client.totalValue / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Spent</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">KES {((client.totalSpent ?? 0) / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
                  <p className={`font-semibold ${(client.balance ?? 0) < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    KES {((client.balance ?? client.totalValue) / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  function renderExpenses() {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">Expenses</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Total: KES {totalExpenses.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(expenses, 'expenses')} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowNewExpenseModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Record
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Project</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map(expense => (
                  <tr key={expense.id} className="hover:bg-gray-50 dark:bg-gray-950">
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{expense.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">{expense.project}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        expense.category === 'Materials' ? 'bg-blue-100 text-blue-800' :
                        expense.category === 'Labor' ? 'bg-green-100 text-green-800' :
                        expense.category === 'Permits' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800 dark:text-gray-100'
                      }`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{expense.description}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100 text-right">KES {expense.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEditExpense(expense)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="Edit">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button onClick={() => deleteExpense(expense.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  function renderInvoices() {
    const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0)
    const totalPending = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0)
    const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0)

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">Invoices</h2>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(filteredInvoices, 'invoices')} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowNewInvoiceModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 lg:gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Paid</p>
            <p className="text-lg lg:text-2xl font-bold text-green-600">KES {(totalPaid / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pending</p>
            <p className="text-lg lg:text-2xl font-bold text-yellow-600">KES {(totalPending / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Overdue</p>
            <p className="text-lg lg:text-2xl font-bold text-red-600">KES {(totalOverdue / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={invoiceFilter}
              onChange={(e) => setInvoiceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Due From"
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="Due To"
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            {(dateFrom || dateTo || searchQuery || invoiceFilter !== 'All') && (
              <button
                onClick={() => { setDateFrom(''); setDateTo(''); setSearchQuery(''); setInvoiceFilter('All') }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedInvoices.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center justify-between">
            <span className="text-sm text-blue-800">{selectedInvoices.length} invoice(s) selected</span>
            <button
              onClick={bulkMarkAsPaid}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Mark as Paid
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3">
                    <button onClick={toggleSelectAll} className="flex items-center">
                      {selectAll ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-gray-400" />}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Invoice #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Project</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:bg-gray-950">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleInvoiceSelection(invoice.id)}>
                        {selectedInvoices.includes(invoice.id) ?
                          <CheckSquare className="w-5 h-5 text-blue-600" /> :
                          <Square className="w-5 h-5 text-gray-400" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{invoice.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">{invoice.client}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{invoice.project}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100 text-right">KES {invoice.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => printInvoice(invoice)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400"
                          title="Print Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteInvoice(invoice.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          title="Delete Invoice"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  function renderReports() {
    return (
      <>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 lg:p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Revenue Overview</h3>
            <div className="h-48 flex items-end justify-around gap-2">
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <div key={i} className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 lg:p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Expense Categories</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Materials</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Labor</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:bg-gray-950 flex">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div key={toast.id} className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-green-600' :
            toast.type === 'error' ? 'bg-red-600' :
            toast.type === 'warning' ? 'bg-yellow-600' :
            'bg-blue-600'
          }`}>
            {toast.type === 'success' && <CheckSquare className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
            {toast.type === 'info' && <Bell className="w-5 h-5" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Global Search */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20" onClick={() => setShowSearch(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything... (Press ESC to close)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">ESC</span>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {searchQuery && (
                <>
                  {projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">Projects</p>
                      {projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                        <button
                          key={p.id}
                          onClick={() => { setCurrentView('projects'); setShowSearch(false); setSearchQuery('') }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                        >
                          <p className="font-medium text-gray-800 dark:text-gray-100">{p.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{p.client}</p>
                        </button>
                      ))}
                    </div>
                  )}
                  {clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">Clients</p>
                      {clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                        <button
                          key={c.id}
                          onClick={() => { setCurrentView('clients'); setShowSearch(false); setSearchQuery('') }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                        >
                          <p className="font-medium text-gray-800 dark:text-gray-100">{c.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{c.email}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              {!searchQuery && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Command className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Type to search projects, clients, invoices...</p>
                  <p className="text-sm mt-2">Shortcuts: N = New Project, ESC = Close</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 via-white to-orange-50/60 text-slate-900 transform transition-transform duration-200 ease-in-out dark:border-white/5 dark:from-[#0a0f17] dark:via-[#0d1420] dark:to-[#111927] dark:text-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-orange-400" />
            <div>
              <h1 className="font-bold text-lg tracking-tight">TILISTHER</h1>
              <p className="text-orange-600/80 uppercase tracking-widest text-[10px] dark:text-orange-300/80">Construction</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'border border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400'
                    : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto w-full border-t border-slate-200 bg-white/70 p-4 backdrop-blur-sm dark:border-white/5 dark:bg-white/0">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center overflow-hidden shrink-0">
              {session?.user?.image ? (
                <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-orange-400 font-bold text-sm">
                  {session?.user?.name?.charAt(0) || 'A'}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate dark:text-white">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 break-all dark:text-slate-400">
                {session?.user?.email || 'admin@tilisther.com'}
              </p>
              <p className="mt-1.5 inline-flex max-w-full rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-orange-300">
                {userRole}
              </p>
            </div>
          </div>
            <button
              onClick={() => signOut()}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <Menu className="w-6 h-6 dark:text-gray-200" />
              </button>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 dark:text-gray-100 capitalize">{currentView}</h2>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 dark:text-gray-300"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Search</span>
                <span className="hidden md:inline text-xs bg-white dark:bg-gray-700 px-2 py-0.5 rounded">⌘K</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto dark:text-gray-100">
          {renderContent()}
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <Modal title="Confirm Action" onClose={() => setShowConfirmModal(false)}>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{confirmMessage}</p>
          <div className="flex gap-3">
            <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950">
              Cancel
            </button>
            <button
              onClick={() => { confirmAction?.(); setShowConfirmModal(false) }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <Modal title="New Project" onClose={() => setShowNewProjectModal(false)}>
          {Object.keys(projectForm).some(k => projectForm[k as keyof typeof projectForm]) && (
            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Draft auto-saved
            </div>
          )}
          <form onSubmit={handleAddProject} className="space-y-4">
            <Input
              label="Project Name"
              value={projectForm.name}
              onChange={v => setProjectForm({...projectForm, name: v})}
              error={formErrors.name}
              required
              suffix={<VoiceButton field="project.name" label="project name" />}
            />
            <Select
              label="Client"
              value={projectForm.client}
              onChange={v => setProjectForm({...projectForm, client: v})}
              options={clients.map(c => ({value: c.name, label: c.name}))}
              required
            />

            <Input
              label="Budget (KES)"
              type="number"
              value={projectForm.budget}
              onChange={v => setProjectForm({...projectForm, budget: v})}
              error={formErrors.budget}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={projectForm.startDate} onChange={v => setProjectForm({...projectForm, startDate: v})} required />
              <Input label="End Date" type="date" value={projectForm.endDate} onChange={v => setProjectForm({...projectForm, endDate: v})} required />
            </div>

            <Select
              label="Status"
              value={projectForm.status}
              onChange={v => setProjectForm({...projectForm, status: v})}
              options={[
                {value: 'Planning', label: 'Planning'},
                {value: 'In Progress', label: 'In Progress'},
              ]}
            />

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  confirm('Discard draft?', () => {
                    setProjectForm({ name: '', client: '', budget: '', spent: '0', progress: '0', startDate: '', endDate: '', status: 'Planning' })
                    localStorage.removeItem('draft_project')
                    setShowNewProjectModal(false)
                  })
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950"
              >
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Project
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* New Client Modal */}
      {showNewClientModal && (
        <Modal title="Add Client" onClose={() => setShowNewClientModal(false)}>
          <form onSubmit={handleAddClient} className="space-y-4">
            <Input label="Client Name" value={clientForm.name} onChange={v => setClientForm({...clientForm, name: v})} required />
            <Input label="Phone" value={clientForm.phone} onChange={v => setClientForm({...clientForm, phone: v})} />
            <Input label="Address" value={clientForm.address} onChange={v => setClientForm({...clientForm, address: v})} />

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowNewClientModal(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Client</button>
            </div>
          </form>
        </Modal>
      )}

      {/* New Expense Modal */}
      {showNewExpenseModal && (
        <Modal title="Record Expense" onClose={() => setShowNewExpenseModal(false)}>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <Select label="Project" value={expenseForm.project} onChange={v => setExpenseForm({...expenseForm, project: v})} options={projects.map(p => ({value: p.name, label: p.name}))} required />

            <Select label="Category" value={expenseForm.category} onChange={v => setExpenseForm({...expenseForm, category: v})} options={[
              {value: 'Materials', label: 'Materials'}, {value: 'Labor', label: 'Labor'},
              {value: 'Equipment', label: 'Equipment'}, {value: 'Permits', label: 'Permits'}, {value: 'Other', label: 'Other'},
            ]} />

            <Input label="Description" value={expenseForm.description} onChange={v => setExpenseForm({...expenseForm, description: v})} required />

            <Input label="Amount (KES)" type="number" value={expenseForm.amount} onChange={v => setExpenseForm({...expenseForm, amount: v})} required />

            <Input label="Date" type="date" value={expenseForm.date} onChange={v => setExpenseForm({...expenseForm, date: v})} required />

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowNewExpenseModal(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Record Expense</button>
            </div>
          </form>
        </Modal>
      )}

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <Modal title="Create Invoice" onClose={() => setShowNewInvoiceModal(false)}>
          <form onSubmit={handleAddInvoice} className="space-y-4">
            <Select
              label="Project"
              value={invoiceForm.project}
              onChange={v => {
                setInvoiceForm({...invoiceForm, project: v})
                // Auto-fill client based on project
                const project = projects.find(p => p.name === v)
                if (project) {
                  setInvoiceForm(prev => ({...prev, project: v, client: project.client}))
                }
              }}
              options={projects.map(p => ({value: p.name, label: p.name}))}
              required
            />

            <Select label="Client" value={invoiceForm.client} onChange={v => setInvoiceForm({...invoiceForm, client: v})} options={clients.map(c => ({value: c.name, label: c.name}))} required />

            <Input label="Amount (KES)" type="number" value={invoiceForm.amount} onChange={v => setInvoiceForm({...invoiceForm, amount: v})} required />

            <Input
              label="Due Date"
              type="date"
              value={invoiceForm.dueDate}
              onChange={v => setInvoiceForm({...invoiceForm, dueDate: v})}
              required
            />

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowNewInvoiceModal(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-950">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Invoice</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <Modal title="Edit Project" onClose={() => setEditingProject(null)}>
          <form onSubmit={handleEditProject} className="space-y-4">
            <Input label="Project Name" value={projectForm.name} onChange={v => setProjectForm({...projectForm, name: v})} required />
            <Select label="Status" value={projectForm.status} onChange={v => setProjectForm({...projectForm, status: v})} options={[{value: 'Planning', label: 'Planning'}, {value: 'In Progress', label: 'In Progress'}, {value: 'Completed', label: 'Completed'}]} />
            <Input label="Budget (KES)" type="number" value={projectForm.budget} onChange={v => setProjectForm({...projectForm, budget: v})} required />
            <div className="rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
              Spent is auto-calculated from recorded expenses: <span className="font-semibold">KES {Number(projectForm.spent || '0').toLocaleString()}</span>
            </div>
            <Input label="Progress (%)" type="number" min="0" max="100" value={projectForm.progress} onChange={v => setProjectForm({...projectForm, progress: v})} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={projectForm.startDate} onChange={v => setProjectForm({...projectForm, startDate: v})} required />
              <Input label="End Date" type="date" value={projectForm.endDate} onChange={v => setProjectForm({...projectForm, endDate: v})} required />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setEditingProject(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Client Modal */}
      {editingClient && (
        <Modal title="Edit Client" onClose={() => setEditingClient(null)}>
          <form onSubmit={handleEditClient} className="space-y-4">
            <Input label="Client Name" value={clientForm.name} onChange={v => setClientForm({...clientForm, name: v})} required />
            <Input label="Phone" value={clientForm.phone} onChange={v => setClientForm({...clientForm, phone: v})} />
            <Input label="Address" value={clientForm.address} onChange={v => setClientForm({...clientForm, address: v})} />
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setEditingClient(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Expense Modal */}
      {editingExpense && (
        <Modal title="Edit Expense" onClose={() => setEditingExpense(null)}>
          <form onSubmit={handleEditExpense} className="space-y-4">
            <Select label="Category" value={expenseForm.category} onChange={v => setExpenseForm({...expenseForm, category: v})} options={[{value: 'Materials', label: 'Materials'}, {value: 'Labor', label: 'Labor'}, {value: 'Equipment', label: 'Equipment'}, {value: 'Permits', label: 'Permits'}, {value: 'Other', label: 'Other'}]} />
            <Input label="Description" value={expenseForm.description} onChange={v => setExpenseForm({...expenseForm, description: v})} required />
            <Input label="Amount (KES)" type="number" value={expenseForm.amount} onChange={v => setExpenseForm({...expenseForm, amount: v})} required />
            <Input label="Date" type="date" value={expenseForm.date} onChange={v => setExpenseForm({...expenseForm, date: v})} required />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="receipt" checked={expenseForm.receipt} onChange={e => setExpenseForm({...expenseForm, receipt: e.target.checked})} className="w-4 h-4" />
              <label htmlFor="receipt" className="text-sm text-gray-700 dark:text-gray-300">Has Receipt</label>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setEditingExpense(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// Component sub-components
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
      <div className={`${color} w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs lg:text-sm">{label}</p>
      <p className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 dark:text-gray-100">{value}</p>
    </div>
  )
}

function AlertCard({ type, icon: Icon, title, message, action, onAction }: {
  type: 'error' | 'warning' | 'info'
  icon: React.ElementType
  title: string
  message: string
  action: string
  onAction: () => void
}) {
  const colors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <div className={`${colors[type]} border rounded-lg p-4 flex items-start gap-3`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm opacity-80 mt-1">{message}</p>
      </div>
      <button onClick={onAction} className="text-sm font-medium underline hover:no-underline">{action}</button>
    </div>
  )
}

function QuickActionButton({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-3 lg:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:bg-blue-50 transition-all">
      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
      <span className="text-xs lg:text-sm text-gray-700 text-center">{label}</span>
    </button>
  )
}

function ProjectRow({ project, onClick, onEdit, onDelete }: { project: any, onClick: () => void, onEdit: (e: React.MouseEvent) => void, onDelete: (e: React.MouseEvent) => void }) {
  const statusColors: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Planning': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
  }

  return (
    <div className="px-4 lg:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
          <h3 className="font-medium text-gray-800 dark:text-gray-100 truncate">{project.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span className="text-gray-500 dark:text-gray-400">Budget: <span className="font-medium text-gray-700 dark:text-gray-200">KES {(project.budget / 1000).toFixed(0)}K</span></span>
            <span className="text-gray-500 dark:text-gray-400">Spent: <span className="font-medium text-gray-700 dark:text-gray-200">KES {(project.spent / 1000).toFixed(0)}K</span></span>
            <span className="text-gray-500 dark:text-gray-400">Balance: <span className={`font-medium ${(project.balance ?? project.budget - project.spent) < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>KES {((project.balance ?? project.budget - project.spent) / 1000).toFixed(0)}K</span></span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[project.status] || 'bg-gray-100'}`}>
            {project.status}
          </span>
          <div className="w-24 lg:w-32">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{project.progress}%</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onEdit} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Edit">
              <Edit className="w-4 h-4 text-gray-500" />
            </button>
            <button onClick={onDelete} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal Component
function Modal({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-none sm:rounded-xl shadow-xl w-full max-w-full sm:max-w-lg max-h-[100vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 dark:text-gray-100">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}

// Form Components
function Input({ label, type = 'text', value, onChange, error, required = false, min, max, suffix }: { 
  label: string, 
  type?: string, 
  value: string, 
  onChange: (value: string) => void, 
  error?: string
  required?: boolean 
  min?: string
  max?: string
  suffix?: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <div className="flex">
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {suffix}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function Select({ label, value, onChange, options, required = false }: {
  label: string,
  value: string,
  onChange: (value: string) => void,
  options: {value: string, label: string}[],
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="">Select {label}...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
