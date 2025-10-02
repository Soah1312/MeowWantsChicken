# Supabase Integration Setup

## Quick Setup Instructions

### 1. Create Environment Variables File

Create a `.env.local` file in the root of your project with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ncxgqzjqumhvvimmmknm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jeGdxempxdW1odnZpbW1ta25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0Mjc2NTMsImV4cCI6MjA3NTAwMzY1M30.3vJSoTu2wTu7U3KytxVlaoruwrKBWAR7hRZBXzpGJP0
```

### 2. Files Created

The following files have been created for your Supabase integration:

- `lib/supabase.ts` - Supabase client configuration
- `lib/hooks/useSupabase.ts` - Custom hook for Supabase operations
- `lib/contexts/SupabaseContext.tsx` - React context provider for global state management
- `env.example` - Template for environment variables

### 3. Usage Examples

#### Using the Hook
```tsx
import { useSupabase } from '@/lib/hooks/useSupabase'

function MyComponent() {
  const { user, loading, signIn, signOut } = useSupabase()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {user ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('email@example.com', 'password')}>
          Sign In
        </button>
      )}
    </div>
  )
}
```

#### Using the Context Provider
Wrap your app with the SupabaseProvider in your layout or _app file:

```tsx
import { SupabaseProvider } from '@/lib/contexts/SupabaseContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
```

#### Direct Supabase Client Usage
```tsx
import { supabase } from '@/lib/supabase'

// Insert data
const { data, error } = await supabase
  .from('your_table')
  .insert([{ column: 'value' }])

// Query data
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

### 4. Next Steps

1. Create your `.env.local` file with the credentials above
2. Set up your database tables in Supabase dashboard
3. Configure Row Level Security (RLS) policies if needed
4. Start using Supabase in your components!

### 5. Security Notes

- The `.env.local` file is already excluded from git via `.gitignore`
- Never commit your actual environment variables to version control
- The anon key is safe to use in client-side code
- For server-side operations, consider using the service role key
