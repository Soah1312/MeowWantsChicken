'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/stores/authStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AuthDiagnostic() {
  const { user, session, loading, initialized } = useAuthStore()
  const [supabaseConfig, setSupabaseConfig] = useState<any>(null)
  const [connectionTest, setConnectionTest] = useState<string>('Not tested')

  useEffect(() => {
    // Get Supabase configuration
    setSupabaseConfig({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      anonKeyPreview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
    })
  }, [])

  const testConnection = async () => {
    setConnectionTest('Testing...')
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        setConnectionTest(`❌ Error: ${error.message}`)
      } else {
        setConnectionTest('✅ Connection successful')
      }
    } catch (err) {
      setConnectionTest(`💥 Exception: ${err}`)
    }
  }

  const getStatusBadge = (condition: boolean, trueText: string, falseText: string) => {
    return (
      <Badge variant={condition ? "default" : "destructive"}>
        {condition ? trueText : falseText}
      </Badge>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            🔍 Auth Diagnostic
            <Button 
              onClick={testConnection} 
              size="sm" 
              variant="outline"
              className="text-xs"
            >
              Test
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          {/* Auth Store Status */}
          <div>
            <p className="font-medium mb-1">Auth Store:</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Initialized:</span>
                {getStatusBadge(initialized, 'Yes', 'No')}
              </div>
              <div className="flex justify-between">
                <span>Loading:</span>
                {getStatusBadge(!loading, 'Ready', 'Loading')}
              </div>
              <div className="flex justify-between">
                <span>User:</span>
                {getStatusBadge(!!user, 'Logged In', 'Not Logged In')}
              </div>
              <div className="flex justify-between">
                <span>Session:</span>
                {getStatusBadge(!!session, 'Active', 'None')}
              </div>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div>
              <p className="font-medium mb-1">User Info:</p>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>ID:</strong> {user.id?.substring(0, 8)}...</div>
                <div><strong>Confirmed:</strong> {user.email_confirmed_at ? '✅ Yes' : '❌ No'}</div>
                <div><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          )}

          {/* Supabase Config */}
          <div>
            <p className="font-medium mb-1">Supabase Config:</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>URL:</span>
                {getStatusBadge(!!supabaseConfig?.url, 'Set', 'Missing')}
              </div>
              <div className="flex justify-between">
                <span>Anon Key:</span>
                {getStatusBadge(supabaseConfig?.hasAnonKey, 'Set', 'Missing')}
              </div>
              <div className="flex justify-between">
                <span>Connection:</span>
                <Badge variant={connectionTest.includes('✅') ? 'default' : connectionTest.includes('❌') ? 'destructive' : 'secondary'}>
                  {connectionTest}
                </Badge>
              </div>
            </div>
          </div>

          {/* Environment Check */}
          <div>
            <p className="font-medium mb-1">Environment:</p>
            <div className="bg-gray-50 p-2 rounded text-xs">
              <div><strong>URL:</strong> {supabaseConfig?.url || 'Not set'}</div>
              <div><strong>Key:</strong> {supabaseConfig?.anonKeyPreview || 'Not set'}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t">
            <p className="font-medium mb-2">Quick Links:</p>
            <div className="space-y-1">
              <a 
                href="https://supabase.com/dashboard/project/ncxgqzjqumhvvimmmknm/auth/users" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                📊 Supabase Users
              </a>
              <a 
                href="https://supabase.com/dashboard/project/ncxgqzjqumhvvimmmknm/auth/settings" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                ⚙️ Auth Settings
              </a>
              <a 
                href="/test-auth" 
                className="block text-blue-600 hover:underline"
              >
                🧪 Test Auth
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
