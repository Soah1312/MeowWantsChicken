'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/signin', 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, loading, initialized, initialize } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  useEffect(() => {
    if (initialized && !loading) {
      if (requireAuth && !user) {
        router.push(redirectTo)
      }
    }
  }, [user, loading, initialized, requireAuth, redirectTo, router])

  // Show loading spinner while checking auth
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if auth is required but user is not authenticated
  if (requireAuth && !user) {
    return null
  }

  return <>{children}</>
}
