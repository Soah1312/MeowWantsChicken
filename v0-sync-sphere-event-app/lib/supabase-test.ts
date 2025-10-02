import { supabase } from './supabase'

// Test Supabase connection and basic operations
export async function testSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    
    // Test 1: Check if we can get session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) {
      console.error('❌ Session error:', sessionError)
      return false
    }
    console.log('✅ Session check passed')
    
    // Test 2: Check if we can access auth admin (this might fail with anon key)
    try {
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers()
      if (userError) {
        console.log('⚠️ Admin access not available (expected with anon key):', userError.message)
      } else {
        console.log('✅ Admin access works, users found:', userData.users.length)
      }
    } catch (err) {
      console.log('⚠️ Admin operations require service role key')
    }
    
    // Test 3: Try to access a basic table (this will fail if no tables exist)
    try {
      const { data, error } = await supabase.from('users').select('count').limit(1)
      if (error) {
        console.log('⚠️ No users table found (this is normal for new projects):', error.message)
      } else {
        console.log('✅ Database query successful')
      }
    } catch (err) {
      console.log('⚠️ Database table access test failed (normal for new projects)')
    }
    
    console.log('✅ Supabase connection test completed')
    return true
    
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error)
    return false
  }
}

// Test user signup
export async function testUserSignup(email: string, password: string) {
  try {
    console.log('🔍 Testing user signup...')
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      console.error('❌ Signup failed:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Signup successful:', data.user?.email)
    return { success: true, user: data.user }
    
  } catch (error) {
    console.error('❌ Signup test failed:', error)
    return { success: false, error: String(error) }
  }
}

// Test user signin
export async function testUserSignin(email: string, password: string) {
  try {
    console.log('🔍 Testing user signin...')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('❌ Signin failed:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Signin successful:', data.user?.email)
    return { success: true, user: data.user }
    
  } catch (error) {
    console.error('❌ Signin test failed:', error)
    return { success: false, error: String(error) }
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('❌ Get user failed:', error.message)
      return null
    }
    
    return user
  } catch (error) {
    console.error('❌ Get current user failed:', error)
    return null
  }
}
