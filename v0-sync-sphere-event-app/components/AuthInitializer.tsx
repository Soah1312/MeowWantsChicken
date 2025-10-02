'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'

export default function AuthInitializer() {
  const { initialize, initialized } = useAuthStore()

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialize, initialized])

  return null // This component doesn't render anything
}
