'use client'

import { useState, useEffect } from 'react'
import { useTaskStore } from '@/lib/stores/taskStore'
import { useAuthStore } from '@/lib/stores/authStore'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Plus, 
  Filter, 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  Users
} from 'lucide-react'
import { Task, TaskPriority, TaskStatus, TaskCategory } from '@/lib/types'

export default function TasksPage() {
  const { user } = useAuthStore()
  const { 
    tasks, 
    loading, 
    getTasks, 
    createTask, 
    updateTask, 
    updateTaskProgress,
    getTaskStats,
    filterTasks 
  } = useTaskStore()

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filters, setFilters] = useState({
    priority: [] as TaskPriority[],
    status: [] as TaskStatus[],
    category: [] as TaskCategory[],
    assignedTo: ''
  })

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    category: 'other' as TaskCategory,
    due_date: '',
    estimated_hours: 0
  })

  useEffect(() => {
    getTasks()
  }, [getTasks])

  const stats = getTaskStats()
  const filteredTasks = filterTasks(filters)

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return

    const result = await createTask({
      ...newTask,
      assigned_by: user?.id || 'current-user',
      event_id: 'event-1', // Would be dynamic based on current event
      status: 'todo',
      progress_percentage: 0
    })

    if (result.success) {
      setShowCreateDialog(false)
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        category: 'other',
        due_date: '',
        estimated_hours: 0
      })
    }
  }

  const handleProgressUpdate = async (taskId: string, progress: number) => {
    await updateTaskProgress(taskId, progress)
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-purple-100 text-purple-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
                <p className="mt-2 text-gray-600">
                  Organize, track, and collaborate on event tasks
                </p>
              </div>
              
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Create Task</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Add a new task to your event management workflow
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Task Title</Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter task title..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the task..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                          value={newTask.priority} 
                          onValueChange={(value: TaskPriority) => setNewTask(prev => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={newTask.category} 
                          onValueChange={(value: TaskCategory) => setNewTask(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="setup">Setup</SelectItem>
                            <SelectItem value="catering">Catering</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="cleanup">Cleanup</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTask} disabled={!newTask.title.trim()}>
                        Create Task
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Target className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Overdue</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading tasks...</p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-600 mb-4">Get started by creating your first task</p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Task
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline">{task.category}</Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{task.description}</p>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            {task.due_date && (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(task.due_date).toLocaleDateString()}
                              </div>
                            )}
                            {task.assigned_to && (
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                Assigned
                              </div>
                            )}
                            {task.estimated_hours && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {task.estimated_hours}h estimated
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-6 min-w-[200px]">
                          <div className="mb-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{task.progress_percentage}%</span>
                            </div>
                            <Progress value={task.progress_percentage} className="mt-1" />
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleProgressUpdate(task.id, Math.min(100, task.progress_percentage + 25))}
                            >
                              +25%
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedTask(task)}
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
