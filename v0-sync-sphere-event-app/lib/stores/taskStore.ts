import { create } from 'zustand'
import { Task, TaskUpdate, TaskPriority, TaskStatus, TaskCategory } from '@/lib/types'
import toast from 'react-hot-toast'

interface TaskState {
  tasks: Task[]
  taskUpdates: TaskUpdate[]
  loading: boolean
  error: string | null
  
  // Task CRUD operations
  createTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; task?: Task }>
  updateTask: (id: string, updates: Partial<Task>) => Promise<{ success: boolean }>
  deleteTask: (id: string) => Promise<{ success: boolean }>
  getTasks: (eventId?: string) => Promise<void>
  getMyTasks: (userId: string) => Promise<void>
  
  // Task progress and updates
  updateTaskProgress: (taskId: string, progress: number, comment?: string) => Promise<{ success: boolean }>
  addTaskUpdate: (taskId: string, content: string, updateType?: string) => Promise<{ success: boolean }>
  getTaskUpdates: (taskId: string) => Promise<void>
  
  // Task assignment
  assignTask: (taskId: string, userId: string) => Promise<{ success: boolean }>
  unassignTask: (taskId: string) => Promise<{ success: boolean }>
  
  // Filtering and sorting
  filterTasks: (filters: {
    priority?: TaskPriority[]
    status?: TaskStatus[]
    category?: TaskCategory[]
    assignedTo?: string
  }) => Task[]
  
  // Statistics
  getTaskStats: () => {
    total: number
    completed: number
    inProgress: number
    overdue: number
    byPriority: Record<TaskPriority, number>
    byCategory: Record<TaskCategory, number>
  }
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  taskUpdates: [],
  loading: false,
  error: null,

  createTask: async (taskData) => {
    set({ loading: true, error: null })
    
    try {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        progress_percentage: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      set(state => ({
        tasks: [...state.tasks, newTask],
        loading: false
      }))

      toast.success('Task created successfully!')
      return { success: true, task: newTask }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create task'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false }
    }
  },

  updateTask: async (id, updates) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id 
            ? { ...task, ...updates, updated_at: new Date().toISOString() }
            : task
        ),
        loading: false
      }))

      toast.success('Task updated successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false }
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false
      }))

      toast.success('Task deleted successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false }
    }
  },

  getTasks: async (eventId) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock tasks data
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Setup Stage Equipment',
          description: 'Install sound system, lighting, and microphones for the main stage',
          priority: 'high',
          status: 'in_progress',
          category: 'technical',
          assigned_to: 'user-1',
          assigned_by: 'organizer-1',
          event_id: eventId || 'event-1',
          due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          estimated_hours: 8,
          actual_hours: 3,
          progress_percentage: 40,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Prepare Catering Setup',
          description: 'Coordinate with catering team for food stations and serving areas',
          priority: 'medium',
          status: 'todo',
          category: 'catering',
          assigned_by: 'organizer-1',
          event_id: eventId || 'event-1',
          due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          estimated_hours: 4,
          progress_percentage: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
      
      set({ tasks: mockTasks, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
    }
  },

  getMyTasks: async (userId) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const { tasks } = get()
      const myTasks = tasks.filter(task => task.assigned_to === userId)
      
      set({ tasks: myTasks, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch your tasks'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
    }
  },

  updateTaskProgress: async (taskId, progress, comment) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                progress_percentage: progress,
                status: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'todo',
                updated_at: new Date().toISOString(),
                completed_at: progress === 100 ? new Date().toISOString() : undefined
              }
            : task
        ),
        loading: false
      }))

      if (comment) {
        await get().addTaskUpdate(taskId, comment, 'progress')
      }

      toast.success(`Progress updated to ${progress}%`)
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update progress'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false }
    }
  },

  addTaskUpdate: async (taskId, content, updateType = 'comment') => {
    try {
      const update: TaskUpdate = {
        id: crypto.randomUUID(),
        task_id: taskId,
        user_id: 'current-user',
        update_type: updateType as any,
        content,
        created_at: new Date().toISOString()
      }

      set(state => ({
        taskUpdates: [...state.taskUpdates, update]
      }))

      return { success: true }
    } catch (error) {
      toast.error('Failed to add update')
      return { success: false }
    }
  },

  getTaskUpdates: async (taskId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      toast.error('Failed to fetch task updates')
    }
  },

  assignTask: async (taskId, userId) => {
    try {
      await get().updateTask(taskId, { assigned_to: userId })
      toast.success('Task assigned successfully!')
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  },

  unassignTask: async (taskId) => {
    try {
      await get().updateTask(taskId, { assigned_to: undefined })
      toast.success('Task unassigned successfully!')
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  },

  filterTasks: (filters) => {
    const { tasks } = get()
    
    return tasks.filter(task => {
      if (filters.priority && !filters.priority.includes(task.priority)) return false
      if (filters.status && !filters.status.includes(task.status)) return false
      if (filters.category && !filters.category.includes(task.category)) return false
      if (filters.assignedTo && task.assigned_to !== filters.assignedTo) return false
      return true
    })
  },

  getTaskStats: () => {
    const { tasks } = get()
    
    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      overdue: tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'completed').length,
      byPriority: {
        low: tasks.filter(t => t.priority === 'low').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        high: tasks.filter(t => t.priority === 'high').length,
        urgent: tasks.filter(t => t.priority === 'urgent').length,
      } as Record<TaskPriority, number>,
      byCategory: {
        setup: tasks.filter(t => t.category === 'setup').length,
        catering: tasks.filter(t => t.category === 'catering').length,
        logistics: tasks.filter(t => t.category === 'logistics').length,
        technical: tasks.filter(t => t.category === 'technical').length,
        marketing: tasks.filter(t => t.category === 'marketing').length,
        security: tasks.filter(t => t.category === 'security').length,
        cleanup: tasks.filter(t => t.category === 'cleanup').length,
        other: tasks.filter(t => t.category === 'other').length,
      } as Record<TaskCategory, number>
    }
    
    return stats
  }
}))
