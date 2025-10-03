// User roles and types
export type UserRole = 'organizer' | 'vendor' | 'attendee' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company?: string
  phone?: string
  avatar?: string
  created_at: string
  updated_at: string
}

// Task management types
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked'
export type TaskCategory = 'setup' | 'catering' | 'logistics' | 'technical' | 'marketing' | 'security' | 'cleanup' | 'other'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  category: TaskCategory
  assigned_to?: string
  assigned_by: string
  event_id: string
  due_date?: string
  estimated_hours?: number
  actual_hours?: number
  progress_percentage: number
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface TaskUpdate {
  id: string
  task_id: string
  user_id: string
  update_type: 'progress' | 'status_change' | 'comment' | 'assignment'
  content: string
  progress_percentage?: number
  status?: TaskStatus
  created_at: string
}

// SOS Alert system types
export type SOSCategory = 
  | 'food_shortage' 
  | 'equipment_failure' 
  | 'staff_shortage' 
  | 'venue_issue' 
  | 'security_concern' 
  | 'medical_emergency'
  | 'technical_issue'
  | 'supply_shortage'
  | 'transportation'
  | 'weather_related'
  | 'other'

export type SOSPriority = 'low' | 'medium' | 'high' | 'critical'
export type SOSStatus = 'open' | 'acknowledged' | 'in_progress' | 'resolved' | 'escalated'

export interface SOSAlert {
  id: string
  title: string
  description: string
  category: SOSCategory
  priority: SOSPriority
  status: SOSStatus
  created_by: string
  event_id: string
  location?: string
  estimated_impact: string
  required_resources?: string[]
  assigned_to?: string[]
  resolved_by?: string
  resolution_notes?: string
  created_at: string
  updated_at: string
  resolved_at?: string
}

export interface SOSResponse {
  id: string
  sos_alert_id: string
  user_id: string
  response_type: 'acknowledgment' | 'offer_help' | 'status_update' | 'resolution'
  message: string
  eta?: string
  resources_offered?: string[]
  created_at: string
}

// AI Assistant types
export interface AIResponse {
  id: string
  query: string
  response: string
  context_type: 'task' | 'sos' | 'general'
  context_id?: string
  confidence_score: number
  suggested_actions?: string[]
  created_at: string
}

// Event management types
export interface Event {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  location: string
  organizer_id: string
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  max_attendees?: number
  current_attendees: number
  budget?: number
  created_at: string
  updated_at: string
}

// Notification types
export type NotificationType = 
  | 'task_assigned' 
  | 'task_updated' 
  | 'task_completed'
  | 'sos_alert'
  | 'sos_resolved'
  | 'event_update'
  | 'system_message'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  related_id?: string // task_id, sos_id, event_id
  read: boolean
  created_at: string
}

// Real-time updates
export interface RealtimeUpdate {
  type: 'task_update' | 'sos_alert' | 'sos_response' | 'notification'
  payload: any
  timestamp: string
  user_id?: string
  event_id?: string
}
