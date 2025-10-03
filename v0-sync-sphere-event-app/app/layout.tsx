import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'react-hot-toast'
import AuthInitializer from '@/components/AuthInitializer'
import './globals.css'
import { SupabaseProvider } from '@/lib/contexts/SupabaseContext'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
<<<<<<< HEAD
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
=======
        <AuthInitializer />
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
>>>>>>> c4ebb179d90099948a1136b47cf3e8e95e780bd7
        <Analytics />
      </body>
    </html>
  )
}
