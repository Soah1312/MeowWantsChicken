'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestAuthPage() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (message: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString()
    setResults(prev => [...prev, { message, data, timestamp }])
    console.log(message, data)
  }

  const testSignUp = async () => {
    setLoading(true)
    addResult('🔄 Testing signup...')
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: 'Test User',
          }
        }
      })

      if (error) {
        addResult('❌ Signup error:', error)
      } else {
        addResult('✅ Signup success:', data)
        addResult(`📧 Email confirmed: ${data.user?.email_confirmed_at ? 'YES' : 'NO'}`)
        addResult(`👤 User ID: ${data.user?.id}`)
      }
    } catch (err) {
      addResult('💥 Signup exception:', err)
    }
    
    setLoading(false)
  }

  const testSignIn = async () => {
    setLoading(true)
    addResult('🔄 Testing signin...')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        addResult('❌ Signin error:', error)
      } else {
        addResult('✅ Signin success:', data)
        addResult(`👤 User: ${data.user?.email}`)
      }
    } catch (err) {
      addResult('💥 Signin exception:', err)
    }
    
    setLoading(false)
  }

  const checkUsers = async () => {
    setLoading(true)
    addResult('🔄 Checking current session...')
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        addResult('❌ Session error:', error)
      } else {
        addResult('📋 Current session:', session)
      }
    } catch (err) {
      addResult('💥 Session exception:', err)
    }
    
    setLoading(false)
  }

  const clearResults = () => {
    setResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Auth System Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Test Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                />
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={testSignUp} 
                  disabled={loading}
                  className="w-full"
                >
                  🔐 Test Sign Up
                </Button>
                
                <Button 
                  onClick={testSignIn} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  🔑 Test Sign In
                </Button>
                
                <Button 
                  onClick={checkUsers} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  📋 Check Session
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
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No tests run yet. Click a test button to start.
                  </p>
                ) : (
                  results.map((result, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{result.message}</p>
                        <span className="text-xs text-gray-500">{result.timestamp}</span>
                      </div>
                      {result.data && (
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
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

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🔍 What to Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">1. Test Sign Up</h3>
                <p className="text-sm text-gray-600">
                  This will attempt to create a new user. Check if it succeeds and whether email confirmation is required.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold">2. Check Supabase Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Go to: <code className="bg-gray-100 px-2 py-1 rounded">https://supabase.com/dashboard/project/ncxgqzjqumhvvimmmknm/auth/users</code>
                </p>
                <p className="text-sm text-gray-600">
                  Look for new users in the Authentication → Users section.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold">3. Test Sign In</h3>
                <p className="text-sm text-gray-600">
                  Try signing in with the same credentials. If it fails with "Email not confirmed", we need to disable email confirmation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
