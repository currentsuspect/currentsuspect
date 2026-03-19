'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Building2, Users, FileText, DollarSign, TrendingUp, Calendar, 
  Menu, X, Plus, Search, MoreVertical, ChevronRight, Phone, Mail, MapPin,
  Receipt, Wallet, Download, Trash2, Edit, CheckSquare, Square, AlertCircle,
  Printer, FileSpreadsheet, Command, Bell, Clock, AlertTriangle
} from 'lucide-react'

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

// Initial mock data
const initialProjects = [
  { id: 1, name: 'Nairobi Office Complex', client: 'ABC Corp', status: 'In Progress', budget: 850000, spent: 552500, progress: 65, startDate: '2024-01-15', endDate: '2024-06-30' },
  { id: 2, name: 'Residential Villa', client: 'Mr. Ochieng', status: 'Planning', budget: 1200000, spent: 120000, progress: 10, startDate: '2024-03-01', endDate: '2024-12-31' },
  { id: 3, name: 'Retail Store Renovation', client: 'XYZ Retail', status: 'Completed', budget: 320000, spent: 315000, progress: 100, startDate: '2023-11-01', endDate: '2024-02-28' },
  { id: 4, name: 'Warehouse Extension', client: 'Logistics Plus', status: 'In Progress', budget: 650000, spent: 325000, progress: 50, startDate: '2024-02-01', endDate: '2024-08-15' },
]

const initialClients = [
  { id: 1, name: 'ABC Corp', email: 'contact@abccorp.co.ke', phone: '+254 712 345 678', address: 'Nairobi, Kenya', projects: 2, totalValue: 850000 },
  { id: 2, name: 'Mr. Ochieng', email: 'ochieng@email.com', phone: '+254 723 456 789', address: 'Kiambu, Kenya', projects: 1, totalValue: 1200000 },
  { id: 3, name: 'XYZ Retail', email: 'info@xyzretail.co.ke', phone: '+254 734 567 890', address: 'Nairobi, Kenya', projects: 1, totalValue: 320000 },
  { id: 4, name: 'Logistics Plus', email: 'admin@logisticsplus.com', phone: '+254 745 678 901', address: 'Mombasa Road, Kenya', projects: 1, totalValue: 650000 },
]

const initialExpenses = [
  { id: 1, project: 'Nairobi Office Complex', category: 'Materials', description: 'Cement and steel reinforcement', amount: 125000, date: '2024-03-15', receipt: true },
  { id: 2, project: 'Nairobi Office Complex', category: 'Labor', description: 'Masonry team - March week 2', amount: 45000, date: '2024-03-14', receipt: true },
  { id: 3, project: 'Residential Villa', category: 'Permits', description: 'Building permit fees', amount: 25000, date: '2024-03-10', receipt: true },
  { id: 4, project: 'Warehouse Extension', category: 'Materials', description: 'Roofing materials', amount: 180000, date: '2024-03-08', receipt: false },
]

const initialInvoices = [
  { id: 'INV-001', project: 'Nairobi Office Complex', client: 'ABC Corp', amount: 425000, status: 'Paid', issuedDate: '2024-03-01', dueDate: '2024-03-31', paidDate: '2024-03-25' },
  { id: 'INV-002', project: 'Retail Store Renovation', client: 'XYZ Retail', amount: 320000, status: 'Paid', issuedDate: '2024-02-15', dueDate: '2024-03-15', paidDate: '2024-03-10' },
  { id: 'INV-003', project: 'Nairobi Office Complex', client: 'ABC Corp', amount: 425000, status: 'Pending', issuedDate: '2024-03-20', dueDate: '2024-04-20', paidDate: null },
  { id: 'INV-004', project: 'Warehouse Extension', client: 'Logistics Plus', amount: 325000, status: 'Overdue', issuedDate: '2024-02-28', dueDate: '2024-03-30', paidDate: null },
]

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  
  // Data state (mutable)
  const [projects, setProjects] = useState(initialProjects)
  const [clients, setClients] = useState(initialClients)
  const [expenses, setExpenses] = useState(initialExpenses)
  const [invoices, setInvoices] = useState(initialInvoices)

  // Search & Filter states
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')
  const [invoiceFilter, setInvoiceFilter] = useState('All')
  
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

  // Form states with auto-save
  const [projectForm, setProjectForm] = useState({ name: '', client: '', budget: '', startDate: '', endDate: '', status: 'Planning' })
  const [clientForm, setClientForm] = useState({ name: '', email: '', phone: '', address: '' })
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

  // Confirm dialog helper
  const confirm = (message: string, action: () => void) => {
    setConfirmMessage(message)
    setConfirmAction(() => action)
    setShowConfirmModal(true)
  }

  // CSV Export
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
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
            <p>Construction Records System</p>
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
      return p.name.toLowerCase().includes(query) || p.client.toLowerCase().includes(query)
    }
    return true
  })

  const filteredInvoices = invoices.filter(i => {
    if (invoiceFilter !== 'All' && i.status !== invoiceFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return i.id.toLowerCase().includes(query) || i.client.toLowerCase().includes(query) || i.project.toLowerCase().includes(query)
    }
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

  const bulkMarkAsPaid = () => {
    confirm(`Mark ${selectedInvoices.length} invoices as paid?`, () => {
      setInvoices(prev => prev.map(i => 
        selectedInvoices.includes(i.id) 
          ? { ...i, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] }
          : i
      ))
      setSelectedInvoices([])
      setSelectAll(false)
      showToast(`${selectedInvoices.length} invoices marked as paid`, 'success')
    })
  }

  // Submit handlers
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateProject()) return
    
    const newProject = {
      id: projects.length + 1,
      name: projectForm.name,
      client: projectForm.client,
      status: projectForm.status,
      budget: parseInt(projectForm.budget),
      spent: 0,
      progress: 0,
      startDate: projectForm.startDate,
      endDate: projectForm.endDate
    }
    setProjects([...projects, newProject])
    setProjectForm({ name: '', client: '', budget: '', startDate: '', endDate: '', status: 'Planning' })
    localStorage.removeItem('draft_project')
    setShowNewProjectModal(false)
    showToast('Project created successfully!', 'success')
  }

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault()
    const newClient = {
      id: clients.length + 1,
      name: clientForm.name,
      email: clientForm.email,
      phone: clientForm.phone,
      address: clientForm.address,
      projects: 0,
      totalValue: 0
    }
    setClients([...clients, newClient])
    setClientForm({ name: '', email: '', phone: '', address: '' })
    localStorage.removeItem('draft_client')
    setShowNewClientModal(false)
    showToast('Client added successfully!', 'success')
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const newExpense = {
      id: expenses.length + 1,
      project: expenseForm.project,
      category: expenseForm.category,
      description: expenseForm.description,
      amount: parseInt(expenseForm.amount),
      date: expenseForm.date,
      receipt: expenseForm.receipt
    }
    setExpenses([...expenses, newExpense])
    setExpenseForm({ project: '', category: 'Materials', description: '', amount: '', date: '', receipt: false })
    localStorage.removeItem('draft_expense')
    setShowNewExpenseModal(false)
    showToast('Expense recorded successfully!', 'success')
  }

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    const invoiceNum = `INV-${String(invoices.length + 1).padStart(3, '0')}`
    const today = new Date()
    const dueDate = new Date(today)
    dueDate.setDate(dueDate.getDate() + 30)
    
    const newInvoice = {
      id: invoiceNum,
      project: invoiceForm.project,
      client: invoiceForm.client,
      amount: parseInt(invoiceForm.amount),
      status: 'Pending',
      issuedDate: today.toISOString().split('T')[0],
      dueDate: invoiceForm.dueDate || dueDate.toISOString().split('T')[0],
      paidDate: null
    }
    setInvoices([...invoices, newInvoice])
    setInvoiceForm({ project: '', client: '', amount: '', dueDate: '' })
    localStorage.removeItem('draft_invoice')
    setShowNewInvoiceModal(false)
    showToast('Invoice created successfully!', 'success')
  }

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
          <StatCard icon={Building2} label="Active Projects" value={activeProjects.toString()} trend="+2 this month" color="bg-blue-500" />
          <StatCard icon={Users} label="Total Clients" value={totalClients.toString()} trend="+5 this year" color="bg-green-500" />
          <StatCard icon={DollarSign} label="Revenue (YTD)" value={`KES ${(totalRevenue / 1000000).toFixed(1)}M`} trend="+15% vs last year" color="bg-orange-500" />
          <StatCard icon={FileText} label="Pending Invoices" value={pendingInvoices.toString()} trend={`KES ${(pendingAmount / 1000).toFixed(0)}K`} color="bg-red-500" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6">
          <h2 className="text-base lg:text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <QuickActionButton icon={Plus} label="New Project" onClick={() => setShowNewProjectModal(true)} />
            <QuickActionButton icon={Users} label="Add Client" onClick={() => setShowNewClientModal(true)} />
            <QuickActionButton icon={Receipt} label="Create Invoice" onClick={() => setShowNewInvoiceModal(true)} />
            <QuickActionButton icon={Wallet} label="Record Expense" onClick={() => setShowNewExpenseModal(true)} />
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-base lg:text-lg font-semibold text-gray-800">Recent Projects</h2>
            <button onClick={() => setCurrentView('projects')} className="text-blue-700 hover:underline text-sm">
              View all →
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {projects.slice(0, 3).map(project => (
              <ProjectRow key={project.id} project={project} onClick={() => { setSelectedProject(project); setCurrentView('projects') }} />
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
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Projects</h2>
            <p className="text-gray-500 text-sm mt-1">{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(filteredProjects, 'projects')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowNewProjectModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> New
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <select 
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <ProjectRow key={project.id} project={project} onClick={() => setSelectedProject(project)} />
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
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Clients</h2>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(clients, 'clients')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
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
            <div key={client.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{client.name}</h3>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
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
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Projects</p>
                  <p className="font-semibold text-gray-800">{client.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Value</p>
                  <p className="font-semibold text-gray-800">KES {(client.totalValue / 1000).toFixed(0)}K</p>
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
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Expenses</h2>
            <p className="text-gray-500 text-sm mt-1">Total: KES {totalExpenses.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(expenses, 'expenses')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowNewExpenseModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Record
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map(expense => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{expense.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{expense.project}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        expense.category === 'Materials' ? 'bg-blue-100 text-blue-800' :
                        expense.category === 'Labor' ? 'bg-green-100 text-green-800' :
                        expense.category === 'Permits' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{expense.description}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 text-right">KES {expense.amount.toLocaleString()}</td>
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
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Invoices</h2>
          <div className="flex gap-2">
            <button onClick={() => exportToCSV(filteredInvoices, 'invoices')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
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
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Paid</p>
            <p className="text-lg lg:text-2xl font-bold text-green-600">KES {(totalPaid / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Pending</p>
            <p className="text-lg lg:text-2xl font-bold text-yellow-600">KES {(totalPending / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">Overdue</p>
            <p className="text-lg lg:text-2xl font-bold text-red-600">KES {(totalOverdue / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <select 
              value={invoiceFilter}
              onChange={(e) => setInvoiceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
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

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">
                    <button onClick={toggleSelectAll} className="flex items-center">
                      {selectAll ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-gray-400" />}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleInvoiceSelection(invoice.id)}>
                        {selectedInvoices.includes(invoice.id) ? 
                          <CheckSquare className="w-5 h-5 text-blue-600" /> : 
                          <Square className="w-5 h-5 text-gray-400" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{invoice.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{invoice.client}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{invoice.project}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 text-right">KES {invoice.amount.toLocaleString()}</td>
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
                      <button 
                        onClick={() => printInvoice(invoice)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
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
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Revenue Overview</h3>
            <div className="h-48 flex items-end justify-around gap-2">
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <div key={i} className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Expense Categories</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Materials</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Labor</span>
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
    <div className="min-h-screen bg-gray-50 flex">
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
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
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
                      <p className="text-xs font-medium text-gray-500 px-3 py-2">Projects</p>
                      {projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                        <button 
                          key={p.id}
                          onClick={() => { setCurrentView('projects'); setShowSearch(false); setSearchQuery('') }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                        >
                          <p className="font-medium text-gray-800">{p.name}</p>
                          <p className="text-sm text-gray-500">{p.client}</p>
                        </button>
                      ))}
                    </div>
                  )}
                  {clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 px-3 py-2">Clients</p>
                      {clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                        <button 
                          key={c.id}
                          onClick={() => { setCurrentView('clients'); setShowSearch(false); setSearchQuery('') }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                        >
                          <p className="font-medium text-gray-800">{c.name}</p>
                          <p className="text-sm text-gray-500">{c.email}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              {!searchQuery && (
                <div className="text-center py-8 text-gray-500">
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
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8" />
            <div>
              <h1 className="font-bold text-lg">Construction</h1>
              <p className="text-blue-300 text-xs">Records</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-blue-300 text-xs">admin@construction.co</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 capitalize">{currentView}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSearch(true)} 
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Search</span>
                <span className="hidden md:inline text-xs bg-white px-2 py-0.5 rounded">⌘K</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <Modal title="Confirm Action" onClose={() => setShowConfirmModal(false)}>
          <p className="text-gray-600 mb-6">{confirmMessage}</p>
          <div className="flex gap-3">
            <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
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
                    setProjectForm({ name: '', client: '', budget: '', startDate: '', endDate: '', status: 'Planning' })
                    localStorage.removeItem('draft_project')
                    setShowNewProjectModal(false)
                  })
                }} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
            <Input label="Email" type="email" value={clientForm.email} onChange={v => setClientForm({...clientForm, email: v})} required />
            <Input label="Phone" value={clientForm.phone} onChange={v => setClientForm({...clientForm, phone: v})} required />
            <Input label="Address" value={clientForm.address} onChange={v => setClientForm({...clientForm, address: v})} required />
            
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowNewClientModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
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
              <button type="button" onClick={() => setShowNewExpenseModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
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
              <button type="button" onClick={() => setShowNewInvoiceModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Invoice</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// Component sub-components
function StatCard({ icon: Icon, label, value, trend, color }: { 
  icon: React.ElementType
  label: string
  value: string
  trend: string
  color: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className={`${color} w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </div>
      <p className="text-gray-500 text-xs lg:text-sm">{label}</p>
      <p className="text-xl lg:text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-green-600 text-xs mt-1">{trend}</p>
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
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-3 lg:p-4 rounded-lg border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all">
      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
      <span className="text-xs lg:text-sm text-gray-700 text-center">{label}</span>
    </button>
  )
}

function ProjectRow({ project, onClick }: { project: any, onClick: () => void }) {
  const statusColors: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Planning': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
  }
  
  return (
    <div onClick={onClick} className="px-4 lg:px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 truncate">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.client} • Budget: KES {(project.budget / 1000).toFixed(0)}K</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[project.status] || 'bg-gray-100'}`}>
            {project.status}
          </span>
          <div className="w-24 lg:w-32">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">{project.progress}%</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 hidden lg:block" />
        </div>
      </div>
    </div>
  )
}

// Modal Component
function Modal({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

// Form Components
function Input({ label, type = 'text', value, onChange, error, required = false }: { 
  label: string, 
  type?: string, 
  value: string, 
  onChange: (value: string) => void, 
  error?: string
  required?: boolean 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select {label}...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
