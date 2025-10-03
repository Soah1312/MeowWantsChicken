'use client'

import { useAuthStore } from '@/lib/stores/authStore'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Activity,
  Bell
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuthStore()

  const stats = [
    {
      title: 'Total Events',
      value: '12',
      change: '+2 from last month',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Active Attendees',
      value: '1,234',
      change: '+12% from last week',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8% from last month',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+2% from last week',
      icon: CheckCircle,
      color: 'text-emerald-600'
    }
  ]

  const recentEvents = [
    {
      id: 1,
      name: 'Tech Conference 2025',
      date: 'Jan 15, 2025',
      attendees: 450,
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Product Launch Event',
      date: 'Jan 10, 2025',
      attendees: 200,
      status: 'completed'
    },
    {
      id: 3,
      name: 'Team Building Workshop',
      date: 'Jan 8, 2025',
      attendees: 50,
      status: 'completed'
    }
  ]

  const activities = [
    {
      id: 1,
      action: 'New registration for Tech Conference 2025',
      time: '2 minutes ago',
      type: 'registration'
    },
    {
      id: 2,
      action: 'Event "Product Launch" marked as completed',
      time: '1 hour ago',
      type: 'completion'
    },
    {
      id: 3,
      action: 'Payment received from John Doe',
      time: '3 hours ago',
      type: 'payment'
    },
    {
      id: 4,
      action: 'New vendor application submitted',
      time: '5 hours ago',
      type: 'vendor'
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Here's what's happening with your events today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {stat.title}
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {stat.value}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          {stat.change}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Events */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Recent Events
                    </CardTitle>
                    <CardDescription>
                      Your latest event activities and upcoming events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              event.status === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'
                            }`} />
                            <div>
                              <h4 className="font-medium text-gray-900">{event.name}</h4>
                              <p className="text-sm text-gray-500">{event.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {event.attendees} attendees
                            </p>
                            <p className={`text-xs capitalize ${
                              event.status === 'upcoming' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {event.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button className="w-full">View All Events</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Feed */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Latest updates and notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        <Bell className="h-4 w-4 mr-2" />
                        View All Notifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks to help you manage your events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button className="h-20 flex-col space-y-2">
                      <Calendar className="h-6 w-6" />
                      <span>Create Event</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Users className="h-6 w-6" />
                      <span>Manage Attendees</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Clock className="h-6 w-6" />
                      <span>Schedule Meeting</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
