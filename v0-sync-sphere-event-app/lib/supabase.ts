import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ncxgqzjqumhvvimmmknm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jeGdxempxdW1odnZpbW1ta25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0Mjc2NTMsImV4cCI6MjA3NTAwMzY1M30.3vJSoTu2wTu7U3KytxVlaoruwrKBWAR7hRZBXzpGJP0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
