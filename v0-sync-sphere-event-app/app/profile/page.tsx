'use client'

import { useState } from 'react'
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
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Building, 
  Edit3,
  Save,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    company: user?.user_metadata?.company || '',
    location: user?.user_metadata?.location || '',
    bio: user?.user_metadata?.bio || '',
    role: user?.user_metadata?.role || 'attendee'
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // In a real app, you would update the user profile in Supabase
      // For now, we'll just show a success message
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data
    setProfileData({
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      company: user?.user_metadata?.company || '',
      location: user?.user_metadata?.location || '',
      bio: user?.user_metadata?.bio || '',
      role: user?.user_metadata?.role || 'attendee'
    })
    setIsEditing(false)
  }

  const accountStats = [
    { label: 'Events Attended', value: '12' },
    { label: 'Events Organized', value: '3' },
    { label: 'Network Connections', value: '45' },
    { label: 'Member Since', value: 'Jan 2024' }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="mt-2 text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm" disabled={loading}>
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {profileData.name || 'User'}
                        </h3>
                        <p className="text-sm text-gray-500">{profileData.email}</p>
                        <Badge variant="secondary" className="mt-1 capitalize">
                          {profileData.role}
                        </Badge>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            value={profileData.email}
                            className="pl-10"
                            disabled={true} // Email usually can't be changed
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10"
                            placeholder="+1 (555) 123-4567"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                            className="pl-10"
                            placeholder="Your Company"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                            className="pl-10"
                            placeholder="City, Country"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell us about yourself..."
                          rows={4}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                {/* Account Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Stats</CardTitle>
                    <CardDescription>
                      Your activity overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {accountStats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{stat.label}</span>
                          <span className="font-semibold text-gray-900">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Event Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Notification Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <X className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
