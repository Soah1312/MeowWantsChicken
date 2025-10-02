import { create } from 'zustand'
import { SOSAlert, SOSResponse, SOSCategory, SOSPriority, SOSStatus } from '@/lib/types'
import toast from 'react-hot-toast'

interface SOSState {
  alerts: SOSAlert[]
  responses: SOSResponse[]
  loading: boolean
  error: string | null
  
  // SOS Alert CRUD operations
  createAlert: (alert: Omit<SOSAlert, 'id' | 'created_at' | 'updated_at' | 'status'>) => Promise<{ success: boolean; alert?: SOSAlert }>
  updateAlert: (id: string, updates: Partial<SOSAlert>) => Promise<{ success: boolean }>
  resolveAlert: (id: string, resolutionNotes: string) => Promise<{ success: boolean }>
  getAlerts: (eventId?: string) => Promise<void>
  getActiveAlerts: () => SOSAlert[]
  
  // SOS Response operations
  respondToAlert: (alertId: string, response: Omit<SOSResponse, 'id' | 'created_at'>) => Promise<{ success: boolean }>
  getAlertResponses: (alertId: string) => Promise<void>
  
  // Alert management
  acknowledgeAlert: (alertId: string, userId: string) => Promise<{ success: boolean }>
  escalateAlert: (alertId: string, reason: string) => Promise<{ success: boolean }>
  assignAlert: (alertId: string, userIds: string[]) => Promise<{ success: boolean }>
  
  // Filtering and statistics
  filterAlerts: (filters: {
    category?: SOSCategory[]
    priority?: SOSPriority[]
    status?: SOSStatus[]
    createdBy?: string
  }) => SOSAlert[]
  
  getAlertStats: () => {
    total: number
    active: number
    resolved: number
    critical: number
    byCategory: Record<SOSCategory, number>
    byPriority: Record<SOSPriority, number>
    avgResolutionTime: number
  }
  
  // AI-powered suggestions
  getAISuggestions: (alertId: string) => Promise<{
    suggestedActions: string[]
    estimatedResolutionTime: string
    requiredResources: string[]
    similarIncidents: SOSAlert[]
  }>
}

export const useSOSStore = create<SOSState>((set, get) => ({
  alerts: [],
  responses: [],
  loading: false,
  error: null,

  createAlert: async (alertData) => {
    set({ loading: true, error: null })
    
    try {
      const newAlert: SOSAlert = {
        ...alertData,
        id: crypto.randomUUID(),
        status: 'open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      await new Promise(resolve => setTimeout(resolve, 500))
      
      set(state => ({
        alerts: [newAlert, ...state.alerts],
        loading: false
      }))

      toast.success('🚨 SOS Alert created! Notifying relevant team members...')
      return { success: true, alert: newAlert }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create SOS alert'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false }
    }
  },

  updateAlert: async (id, updates) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      set(state => ({
        alerts: state.alerts.map(alert => 
          alert.id === id 
            ? { ...alert, ...updates, updated_at: new Date().toISOString() }
            : alert
        ),
        loading: false
      }))

      toast.success('SOS Alert updated successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update SOS alert'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false }
    }
  },

  resolveAlert: async (id, resolutionNotes) => {
    try {
      const result = await get().updateAlert(id, {
        status: 'resolved',
        resolution_notes: resolutionNotes,
        resolved_at: new Date().toISOString(),
        resolved_by: 'current-user'
      })

      if (result.success) {
        toast.success('✅ SOS Alert resolved successfully!')
      }

      return result
    } catch (error) {
      return { success: false }
    }
  },

  getAlerts: async (eventId) => {
    set({ loading: true, error: null })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock SOS alerts data
      const mockAlerts: SOSAlert[] = [
        {
          id: '1',
          title: 'Food Station Running Low',
          description: 'Main buffet station is running out of vegetarian options. Approximately 200 guests still to be served.',
          category: 'food_shortage',
          priority: 'high',
          status: 'open',
          created_by: 'vendor-1',
          event_id: eventId || 'event-1',
          location: 'Main Hall - Buffet Station A',
          estimated_impact: 'High - May affect guest satisfaction',
          required_resources: ['Additional vegetarian dishes', 'Extra serving staff'],
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'Sound System Malfunction',
          description: 'Main stage microphone is producing feedback. Speaker presenting in 15 minutes.',
          category: 'technical_issue',
          priority: 'critical',
          status: 'in_progress',
          created_by: 'tech-1',
          event_id: eventId || 'event-1',
          location: 'Main Stage',
          estimated_impact: 'Critical - Will disrupt main presentation',
          required_resources: ['Backup microphone', 'Audio technician'],
          assigned_to: ['tech-lead-1', 'audio-tech-1'],
          created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        }
      ]
      
      set({ alerts: mockAlerts, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch SOS alerts'
      set({ loading: false, error: errorMessage })
      toast.error(errorMessage)
    }
  },

  getActiveAlerts: () => {
    const { alerts } = get()
    return alerts.filter(alert => alert.status !== 'resolved')
  },

  respondToAlert: async (alertId, responseData) => {
    try {
      const newResponse: SOSResponse = {
        ...responseData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      }

      set(state => ({
        responses: [...state.responses, newResponse]
      }))

      if (responseData.response_type === 'acknowledgment') {
        await get().updateAlert(alertId, { status: 'acknowledged' })
      }

      toast.success('Response sent successfully!')
      return { success: true }
    } catch (error) {
      toast.error('Failed to send response')
      return { success: false }
    }
  },

  getAlertResponses: async (alertId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      toast.error('Failed to fetch responses')
    }
  },

  acknowledgeAlert: async (alertId, userId) => {
    try {
      await get().respondToAlert(alertId, {
        sos_alert_id: alertId,
        user_id: userId,
        response_type: 'acknowledgment',
        message: 'Alert acknowledged. Working on resolution.'
      })

      return { success: true }
    } catch (error) {
      return { success: false }
    }
  },

  escalateAlert: async (alertId, reason) => {
    try {
      await get().updateAlert(alertId, {
        status: 'escalated',
        priority: 'critical'
      })

      await get().respondToAlert(alertId, {
        sos_alert_id: alertId,
        user_id: 'current-user',
        response_type: 'status_update',
        message: `Alert escalated: ${reason}`
      })

      toast.success('Alert escalated to management!')
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  },

  assignAlert: async (alertId, userIds) => {
    try {
      await get().updateAlert(alertId, { assigned_to: userIds })
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  },

  filterAlerts: (filters) => {
    const { alerts } = get()
    
    return alerts.filter(alert => {
      if (filters.category && !filters.category.includes(alert.category)) return false
      if (filters.priority && !filters.priority.includes(alert.priority)) return false
      if (filters.status && !filters.status.includes(alert.status)) return false
      if (filters.createdBy && alert.created_by !== filters.createdBy) return false
      return true
    })
  },

  getAlertStats: () => {
    const { alerts } = get()
    
    const resolvedAlerts = alerts.filter(a => a.status === 'resolved' && a.resolved_at)
    const avgResolutionTime = resolvedAlerts.length > 0 
      ? resolvedAlerts.reduce((acc, alert) => {
          const created = new Date(alert.created_at).getTime()
          const resolved = new Date(alert.resolved_at!).getTime()
          return acc + (resolved - created)
        }, 0) / resolvedAlerts.length / (1000 * 60)
      : 0

    return {
      total: alerts.length,
      active: alerts.filter(a => a.status !== 'resolved').length,
      resolved: resolvedAlerts.length,
      critical: alerts.filter(a => a.priority === 'critical').length,
      byCategory: {
        food_shortage: alerts.filter(a => a.category === 'food_shortage').length,
        equipment_failure: alerts.filter(a => a.category === 'equipment_failure').length,
        staff_shortage: alerts.filter(a => a.category === 'staff_shortage').length,
        venue_issue: alerts.filter(a => a.category === 'venue_issue').length,
        security_concern: alerts.filter(a => a.category === 'security_concern').length,
        medical_emergency: alerts.filter(a => a.category === 'medical_emergency').length,
        technical_issue: alerts.filter(a => a.category === 'technical_issue').length,
        supply_shortage: alerts.filter(a => a.category === 'supply_shortage').length,
        transportation: alerts.filter(a => a.category === 'transportation').length,
        weather_related: alerts.filter(a => a.category === 'weather_related').length,
        other: alerts.filter(a => a.category === 'other').length,
      } as Record<SOSCategory, number>,
      byPriority: {
        low: alerts.filter(a => a.priority === 'low').length,
        medium: alerts.filter(a => a.priority === 'medium').length,
        high: alerts.filter(a => a.priority === 'high').length,
        critical: alerts.filter(a => a.priority === 'critical').length,
      } as Record<SOSPriority, number>,
      avgResolutionTime: Math.round(avgResolutionTime)
    }
  },

  getAISuggestions: async (alertId) => {
    try {
      const { alerts } = get()
      const alert = alerts.find(a => a.id === alertId)
      
      if (!alert) {
        throw new Error('Alert not found')
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      const suggestions = {
        food_shortage: {
          suggestedActions: [
            'Contact backup catering vendors immediately',
            'Redistribute food from less busy stations',
            'Implement portion control temporarily',
            'Set up additional serving stations'
          ],
          estimatedResolutionTime: '15-30 minutes',
          requiredResources: ['Backup food supplies', 'Additional serving staff', 'Mobile food stations'],
          similarIncidents: alerts.filter(a => a.category === 'food_shortage' && a.id !== alertId)
        },
        technical_issue: {
          suggestedActions: [
            'Switch to backup equipment immediately',
            'Contact technical support team',
            'Test alternative audio setup',
            'Prepare manual backup plan'
          ],
          estimatedResolutionTime: '5-15 minutes',
          requiredResources: ['Backup microphones', 'Audio technician', 'Portable speakers'],
          similarIncidents: alerts.filter(a => a.category === 'technical_issue' && a.id !== alertId)
        }
      }

      const defaultSuggestions = {
        suggestedActions: [
          'Assess the situation immediately',
          'Contact relevant team members',
          'Implement contingency plan',
          'Monitor and update status regularly'
        ],
        estimatedResolutionTime: '20-45 minutes',
        requiredResources: ['Additional staff', 'Emergency supplies'],
        similarIncidents: []
      }

      return suggestions[alert.category as keyof typeof suggestions] || defaultSuggestions
    } catch (error) {
      throw new Error('Failed to get AI suggestions')
    }
  }
}))
