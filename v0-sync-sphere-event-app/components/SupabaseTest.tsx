'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function SupabaseTest() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [connectionStatus, setConnectionStatus] = useState('Testing...')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          setConnectionStatus(`❌ Connection Error: ${error.message}`)
        } else {
          setConnectionStatus('✅ Supabase Connected Successfully!')
          setUser(data.session?.user || null)
        }
      } catch (err) {
        setConnectionStatus(`❌ Connection Failed: ${err}`)
      }
    }

    testConnection()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      console.log('🔄 Auth state changed:', event, session?.user?.email)
      
      if (event === 'SIGNED_IN') {
        setMessage('✅ User signed in successfully!')
      } else if (event === 'SIGNED_OUT') {
        setMessage('👋 User signed out')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Validation
    if (!email || !password) {
      setMessage('❌ Please enter both email and password')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    console.log('🔍 Attempting signup with:', { email, passwordLength: password.length })

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log('📊 Signup response:', { data, error })

      if (error) {
        console.error('❌ Signup error details:', error)
        setMessage(`❌ Signup Error: ${error.message}`)
        
        // Common error solutions
        if (error.message.includes('email')) {
          setMessage(`❌ Email Error: ${error.message}. Try a different email address.`)
        } else if (error.message.includes('password')) {
          setMessage(`❌ Password Error: ${error.message}. Use a stronger password.`)
        } else if (error.message.includes('rate limit')) {
          setMessage(`❌ Too many attempts. Please wait a moment and try again.`)
        }
      } else if (data.user) {
        if (data.user.email_confirmed_at) {
          setMessage('🎉 Signup successful! User is confirmed and ready to use.')
        } else {
          setMessage('🎉 Signup successful! Check your email for confirmation link.')
        }
        console.log('✅ New user created:', data.user)
      } else {
        setMessage('⚠️ Signup completed but no user data returned. Check Supabase dashboard.')
      }
    } catch (err) {
      console.error('❌ Signup exception:', err)
      setMessage(`❌ Signup Failed: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`❌ Signin Error: ${error.message}`)
      } else if (data.user) {
        setMessage('✅ Signin successful!')
        console.log('User signed in:', data.user)
      }
    } catch (err) {
      setMessage(`❌ Signin Failed: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      setMessage(`❌ Signout Error: ${error.message}`)
    }
    setLoading(false)
  }

  const checkUsers = async () => {
    try {
      // This will only work if you have proper RLS policies set up
      const { data, error } = await supabase.auth.admin.listUsers()
      if (error) {
        setMessage(`❌ Cannot fetch users: ${error.message}`)
        console.log('Note: This requires service role key for admin operations')
      } else {
        console.log('Users in database:', data)
        setMessage(`📊 Found ${data.users.length} users in database`)
      }
    } catch (err) {
      setMessage('❌ Admin operation not available with anon key')
      console.log('Note: Use service role key for admin operations')
    }
  }

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🧪 Supabase Test</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🧪 Supabase Test</h2>
      
      {/* Connection Status */}
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <strong>Connection Status:</strong>
        <div className="mt-1">{connectionStatus}</div>
      </div>

      {/* Current User */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <strong>Current User:</strong>
        <div className="mt-1">
          {user ? (
            <div>
              <div>✅ Logged in as: {user.email}</div>
              <div>User ID: {user.id}</div>
              <div>Created: {new Date(user.created_at).toLocaleString()}</div>
              <button 
                onClick={handleSignOut}
                disabled={loading}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>❌ No user logged in</div>
          )}
        </div>
      </div>

      {/* Auth Form */}
      {!user && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="test@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="minimum 6 characters"
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading || !email || !password}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? '⏳' : '📝'} Sign Up
            </button>
            
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading || !email || !password}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? '⏳' : '🔑'} Sign In
            </button>
          </div>
        </form>
      )}

      {/* Test Button */}
      <button
        onClick={checkUsers}
        className="w-full mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        🔍 Check Database Connection
      </button>

      {/* Messages */}
      {message && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="text-sm">{message}</div>
        </div>
      )}

      {/* Debug Info */}
      {mounted && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <strong>🔧 Debug Info:</strong>
          <div className="mt-2 space-y-1 font-mono text-xs">
            <div>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
            <div>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</div>
            <div>Current URL: {window.location.origin}</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <strong>📋 How to test:</strong>
        <ol className="mt-2 list-decimal list-inside space-y-1">
          <li>Check if connection status shows ✅</li>
          <li>Try signing up with a test email (e.g., test@example.com)</li>
          <li>Open browser console (F12) to see detailed logs</li>
          <li>Go to your Supabase dashboard → Authentication → Users</li>
          <li>Verify the new user appears in the dashboard</li>
        </ol>
      </div>

      {/* Common Issues */}
      <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
        <strong>⚠️ Common Issues:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>Email confirmation:</strong> Check if email confirmation is enabled in Supabase</li>
          <li><strong>Rate limiting:</strong> Wait a few minutes between signup attempts</li>
          <li><strong>Invalid email:</strong> Use a real email format</li>
          <li><strong>Weak password:</strong> Use at least 6 characters</li>
        </ul>
      </div>
    </div>
  )
}
