import SupabaseTest from '@/components/SupabaseTest'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🧪 Supabase Integration Test
        </h1>
        <SupabaseTest />
      </div>
    </div>
  )
}
