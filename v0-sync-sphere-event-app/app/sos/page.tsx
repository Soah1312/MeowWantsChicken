'use client'

import { useState, useEffect } from 'react'
import { useSOSStore } from '@/lib/stores/sosStore'
import { useAuthStore } from '@/lib/stores/authStore'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
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
  AlertTriangle, 
  Plus, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle,
  XCircle,
  Zap,
  MessageSquare,
  TrendingUp,
  Users,
  Bot
} from 'lucide-react'
import { SOSAlert, SOSCategory, SOSPriority, SOSStatus } from '@/lib/types'

export default function SOSPage() {
  const { user } = useAuthStore()
  const { 
    alerts, 
    responses,
    loading, 
    getAlerts, 
    createAlert, 
    respondToAlert,
    acknowledgeAlert,
    resolveAlert,
    getAlertStats,
    getAISuggestions
  } = useSOSStore()

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<SOSAlert | null>(null)
  const [aiSuggestions, setAISuggestions] = useState<any>(null)
  const [loadingAI, setLoadingAI] = useState(false)

  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    category: 'other' as SOSCategory,
    priority: 'medium' as SOSPriority,
    location: '',
    estimated_impact: '',
    required_resources: [] as string[]
  })

  const [responseText, setResponseText] = useState('')

  useEffect(() => {
    getAlerts()
  }, [getAlerts])

  const stats = getAlertStats()

  const handleCreateAlert = async () => {
    if (!newAlert.title.trim()) return

    const result = await createAlert({
      ...newAlert,
      created_by: user?.id || 'current-user',
      event_id: 'event-1' // Would be dynamic based on current event
    })

    if (result.success) {
      setShowCreateDialog(false)
      setNewAlert({
        title: '',
        description: '',
        category: 'other',
        priority: 'medium',
        location: '',
        estimated_impact: '',
        required_resources: []
      })
    }
  }

  const handleRespond = async (alertId: string, responseType: string) => {
    if (!responseText.trim()) return

    await respondToAlert(alertId, {
      sos_alert_id: alertId,
      user_id: user?.id || 'current-user',
      response_type: responseType as any,
      message: responseText
    })

    setResponseText('')
  }

  const handleGetAISuggestions = async (alertId: string) => {
    setLoadingAI(true)
    try {
      const suggestions = await getAISuggestions(alertId)
      setAISuggestions(suggestions)
    } catch (error) {
      console.error('Failed to get AI suggestions:', error)
    } finally {
      setLoadingAI(false)
    }
  }

  const getPriorityColor = (priority: SOSPriority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: SOSStatus) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800'
      case 'escalated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: SOSCategory) => {
    switch (category) {
      case 'food_shortage': return '🍽️'
      case 'equipment_failure': return '⚙️'
      case 'staff_shortage': return '👥'
      case 'venue_issue': return '🏢'
      case 'security_concern': return '🔒'
      case 'medical_emergency': return '🚑'
      case 'technical_issue': return '💻'
      case 'supply_shortage': return '📦'
      case 'transportation': return '🚗'
      case 'weather_related': return '🌦️'
      default: return '❓'
    }
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
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
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                  SOS Alert System
                </h1>
                <p className="mt-2 text-gray-600">
                  Real-time emergency response and resource coordination
                </p>
              </div>
              
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Create SOS Alert</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-red-600">🚨 Create SOS Alert</DialogTitle>
                    <DialogDescription>
                      Report an urgent issue that requires immediate attention
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Alert Title</Label>
                      <Input
                        id="title"
                        value={newAlert.title}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Brief description of the issue..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        value={newAlert.description}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Provide detailed information about the situation..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={newAlert.category} 
                          onValueChange={(value: SOSCategory) => setNewAlert(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food_shortage">🍽️ Food Shortage</SelectItem>
                            <SelectItem value="equipment_failure">⚙️ Equipment Failure</SelectItem>
                            <SelectItem value="staff_shortage">👥 Staff Shortage</SelectItem>
                            <SelectItem value="venue_issue">🏢 Venue Issue</SelectItem>
                            <SelectItem value="security_concern">🔒 Security Concern</SelectItem>
                            <SelectItem value="medical_emergency">🚑 Medical Emergency</SelectItem>
                            <SelectItem value="technical_issue">💻 Technical Issue</SelectItem>
                            <SelectItem value="supply_shortage">📦 Supply Shortage</SelectItem>
                            <SelectItem value="transportation">🚗 Transportation</SelectItem>
                            <SelectItem value="weather_related">🌦️ Weather Related</SelectItem>
                            <SelectItem value="other">❓ Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select 
                          value={newAlert.priority} 
                          onValueChange={(value: SOSPriority) => setNewAlert(prev => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">🟢 Low</SelectItem>
                            <SelectItem value="medium">🟡 Medium</SelectItem>
                            <SelectItem value="high">🟠 High</SelectItem>
                            <SelectItem value="critical">🔴 Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newAlert.location}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Specific location where help is needed..."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreateAlert} 
                        disabled={!newAlert.title.trim()}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        🚨 Send Alert
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
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Zap className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Critical</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.critical}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.avgResolutionTime}m</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading alerts...</p>
                </div>
              ) : alerts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear! 🎉</h3>
                    <p className="text-gray-600 mb-4">No active SOS alerts at the moment</p>
                  </CardContent>
                </Card>
              ) : (
                alerts.map((alert: SOSAlert) => (
                  <Card key={alert.id} className={`hover:shadow-md transition-shadow ${
                    alert.priority === 'critical' ? 'border-red-500 border-2' : 
                    alert.priority === 'high' ? 'border-orange-300' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{getCategoryIcon(alert.category)}</span>
                            <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                            <Badge className={getPriorityColor(alert.priority)}>
                              {alert.priority.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{alert.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            {alert.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {alert.location}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {getTimeAgo(alert.created_at)}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              Created by {alert.created_by}
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-6 min-w-[250px] space-y-3">
                          {/* AI Suggestions */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGetAISuggestions(alert.id)}
                            disabled={loadingAI}
                            className="w-full"
                          >
                            <Bot className="h-4 w-4 mr-2" />
                            {loadingAI ? 'Getting AI Help...' : 'Get AI Suggestions'}
                          </Button>
                          
                          {/* Action Buttons */}
                          <div className="space-y-2">
                            {alert.status === 'open' && (
                              <Button
                                size="sm"
                                onClick={() => acknowledgeAlert(alert.id, user?.id || 'current-user')}
                                className="w-full"
                              >
                                Acknowledge
                              </Button>
                            )}
                            
                            {alert.status !== 'resolved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedAlert(alert)}
                                className="w-full"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Respond
                              </Button>
                            )}
                            
                            {alert.status !== 'resolved' && (
                              <Button
                                size="sm"
                                onClick={() => resolveAlert(alert.id, 'Issue resolved')}
                                className="w-full bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Response Dialog */}
            <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Respond to Alert</DialogTitle>
                  <DialogDescription>
                    {selectedAlert?.title}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response or offer help..."
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        if (selectedAlert) {
                          handleRespond(selectedAlert.id, 'offer_help')
                          setSelectedAlert(null)
                        }
                      }}
                      disabled={!responseText.trim()}
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
