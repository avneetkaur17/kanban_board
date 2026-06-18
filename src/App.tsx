import { useAuth } from './hooks/useAuth'

export default function App() {
  const { user, loading } = useAuth()

  if(loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <p className="text-slate-400 text-sm">Setting up your board...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <p className="text-center pt-10 text-slate-600">
        Board coming soon - logged in as {user!.id}
      </p>
    </div>
  )
}