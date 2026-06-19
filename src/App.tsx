import { useAuth } from './hooks/useAuth'
import { Board } from './components/Board/Board'
import { Analytics } from '@vercel/analytics/react'

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
      <Board userId={user!.id} />
      <Analytics />
    </div>
  )
}