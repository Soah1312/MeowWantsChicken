import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  initialized: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    try {
      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
      }

      set({
        user: session?.user || null,
        session: session || null,
        loading: false,
        initialized: true
      })

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        set({
          user: session?.user || null,
          session: session || null,
          loading: false
        })

        // Show toast notifications for auth events
        if (event === 'SIGNED_IN') {
          toast.success(`Welcome back, ${session?.user?.email}!`)
        } else if (event === 'SIGNED_OUT') {
          toast.success('Signed out successfully')
        }
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false, initialized: true })
    }
  },

  signUp: async (email: string, password: string, name?: string) => {
    set({ loading: true })
    
    try {
      console.log('🔄 Attempting signup for:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
          }
        }
      })

      console.log('📋 Signup response:', { data, error })

      if (error) {
        console.error('❌ Signup error:', error)
        toast.error(`Signup failed: ${error.message}`)
        set({ loading: false })
        return { success: false, error: error.message }
      }

      if (data.user) {
        console.log('👤 User created:', data.user)
        console.log('📧 Email confirmed:', data.user.email_confirmed_at ? 'YES' : 'NO')
        
        if (data.user.email_confirmed_at) {
          toast.success('✅ Account created and confirmed!')
        } else {
          toast.success('🎉 Account created! You can now sign in.')
          // Note: If email confirmation is disabled in Supabase, users can sign in immediately
        }
        set({ loading: false })
        return { success: true }
      }

      set({ loading: false })
      return { success: false, error: 'Unknown error occurred' }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      console.error('💥 Signup exception:', error)
      toast.error(errorMessage)
      set({ loading: false })
      return { success: false, error: errorMessage }
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true })
    
    try {
      console.log('🔄 Attempting signin for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('📋 Signin response:', { data, error })

      if (error) {
        console.error('❌ Signin error:', error)
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast.error('📧 Please check your email and click the confirmation link before signing in.')
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error('❌ Invalid email or password. Please check your credentials.')
        } else {
          toast.error(`Sign in failed: ${error.message}`)
        }
        
        set({ loading: false })
        return { success: false, error: error.message }
      }

      if (data.user) {
        console.log('✅ Signin successful for:', data.user.email)
        // Success toast will be handled by onAuthStateChange
        set({ loading: false })
        return { success: true }
      }

      set({ loading: false })
      return { success: false, error: 'Unknown error occurred' }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
      console.error('💥 Signin exception:', error)
      toast.error(errorMessage)
      set({ loading: false })
      return { success: false, error: errorMessage }
    }
  },

  signOut: async () => {
    set({ loading: true })
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        toast.error(error.message)
      }
      // Success toast will be handled by onAuthStateChange
      
      set({ loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed'
      toast.error(errorMessage)
      set({ loading: false })
    }
  },

  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        toast.error(error.message)
        return { success: false, error: error.message }
      }

      toast.success('Password reset email sent!')
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  },
}))
