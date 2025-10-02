'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DebugAuthPage() {
  const [email, setEmail] = useState('devvv0793@gmail.com')
  const [password, setPassword] = useState('password123')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (message: string, data?: any, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setResults(prev => [...prev, { message, data, timestamp, type }])
    console.log(`[${type.toUpperCase()}]`, message, data)
  }

  const clearResults = () => setResults([])

  // Step 1: Test Supabase Connection
  const testConnection = async () => {
    setLoading(true)
    addResult('🔄 Testing Supabase connection...')
    
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        addResult('❌ Connection failed', error, 'error')
      } else {
        addResult('✅ Supabase connection successful', data, 'success')
      }
    } catch (err) {
      addResult('💥 Connection exception', err, 'error')
    }
    setLoading(false)
  }

  // Step 2: Test Sign Up (Create User)
  const testSignUp = async () => {
    setLoading(true)
    addResult(`🔄 Testing signup for: ${email}`)
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: 'Debug Test User',
          }
        }
      })

      if (error) {
        addResult('❌ Signup failed', error, 'error')
        
        // Provide specific guidance based on error code
        if (error.message.includes('email_address_invalid')) {
          addResult('💡 Email Invalid - Try using a real email format like yourname@gmail.com', null, 'info')
        } else if (error.message.includes('User already registered')) {
          addResult('💡 User already exists - try signing in instead', null, 'info')
        }
      } else {
        addResult('✅ Signup successful!', {
          userId: data.user?.id,
          email: data.user?.email,
          emailConfirmed: data.user?.email_confirmed_at ? 'YES' : 'NO',
          createdAt: data.user?.created_at
        }, 'success')
        
        if (!data.user?.email_confirmed_at) {
          addResult('⚠️ Email NOT confirmed - this might cause signin issues', null, 'error')
        }
      }
    } catch (err) {
      addResult('💥 Signup exception', err, 'error')
    }
    setLoading(false)
  }

  // Step 3: Test Sign In
  const testSignIn = async () => {
    setLoading(true)
    addResult(`🔄 Testing signin for: ${email}`)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        addResult('❌ Signin failed', error, 'error')
        
        // Provide specific guidance based on error
        if (error.message.includes('Invalid login credentials')) {
          addResult('💡 This usually means:', {
            reasons: [
              'User does not exist (signup failed)',
              'Wrong password',
              'Email confirmation required'
            ]
          }, 'info')
        } else if (error.message.includes('email_not_confirmed')) {
          addResult('🚨 EMAIL CONFIRMATION REQUIRED!', {
            solution: 'Go to Supabase Dashboard → Auth → Settings → Turn OFF "Enable email confirmations"',
            link: 'https://supabase.com/dashboard/project/ncxgqzjqumhvvimmmknm/auth/settings'
          }, 'error')
        }
      } else {
        addResult('✅ Signin successful!', {
          userId: data.user?.id,
          email: data.user?.email,
          sessionExists: !!data.session
        }, 'success')
      }
    } catch (err) {
      addResult('💥 Signin exception', err, 'error')
    }
    setLoading(false)
  }

  // Step 4: Check Current Session
  const checkSession = async () => {
    setLoading(true)
    addResult('🔄 Checking current session...')
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        addResult('❌ Session check failed', error, 'error')
      } else if (session) {
        addResult('✅ Active session found', {
          userId: session.user?.id,
          email: session.user?.email,
          expiresAt: session.expires_at
        }, 'success')
      } else {
        addResult('ℹ️ No active session', null, 'info')
      }
    } catch (err) {
      addResult('💥 Session check exception', err, 'error')
    }
    setLoading(false)
  }

  // Step 5: Sign Out
  const testSignOut = async () => {
    setLoading(true)
    addResult('🔄 Testing signout...')
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        addResult('❌ Signout failed', error, 'error')
      } else {
        addResult('✅ Signout successful', null, 'success')
      }
    } catch (err) {
      addResult('💥 Signout exception', err, 'error')
    }
    setLoading(false)
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'success': return 'default'
      case 'error': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Auth Debug Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Test Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={testConnection} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  1️⃣ Test Connection
                </Button>
                
                <Button 
                  onClick={testSignUp} 
                  disabled={loading}
                  className="w-full"
                >
                  2️⃣ Test Sign Up
                </Button>
                
                <Button 
                  onClick={testSignIn} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  3️⃣ Test Sign In
                </Button>
                
                <Button 
                  onClick={checkSession} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  4️⃣ Check Session
                </Button>
                
                <Button 
                  onClick={testSignOut} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  5️⃣ Sign Out
                </Button>
                
                <Button 
                  onClick={clearResults} 
                  variant="destructive"
                  className="w-full"
                >
                  🗑️ Clear Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Debug Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No tests run yet. Start with "Test Connection" to verify Supabase is working.
                    </p>
                  ) : (
                    results.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={getBadgeVariant(result.type)}>
                              {result.type.toUpperCase()}
                            </Badge>
                            <span className="font-medium text-sm">{result.message}</span>
                          </div>
                          <span className="text-xs text-gray-500">{result.timestamp}</span>
                        </div>
                        {result.data && (
                          <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🎯 Debugging Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Step-by-Step Process:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><strong>Test Connection</strong> - Verify Supabase is reachable</li>
                  <li><strong>Test Sign Up</strong> - Create a new user</li>
                  <li><strong>Test Sign In</strong> - Try to sign in with same credentials</li>
                  <li><strong>Check Session</strong> - Verify if you're logged in</li>
                  <li><strong>Sign Out</strong> - Clear the session</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Common Issues:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Invalid credentials</strong> - User doesn't exist or wrong password</li>
                  <li><strong>Email not confirmed</strong> - Need to disable in Supabase settings</li>
                  <li><strong>Connection failed</strong> - Check .env.local file</li>
                  <li><strong>Signup failed</strong> - Check Supabase project status</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🔗 Quick Links:</h4>
              <div className="space-y-1">
                <a 
                  href="https://supabase.com/dashboard/project/ncxgqzjqumhvvimmmknm/auth/users" 
                  target="_blank" 
                  className="block text-blue-600 hover:underline text-sm"
                >
                  📊 View Users in Supabase Dashboard
                </a>
                <a 
                  href="https://supabase.com/dashboard/project/ncxgqzjqumhvvimmmknm/auth/settings" 
                  target="_blank" 
                  className="block text-blue-600 hover:underline text-sm"
                >
                  ⚙️ Supabase Auth Settings (Disable Email Confirmation Here!)
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
