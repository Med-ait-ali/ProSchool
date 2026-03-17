import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/index.jsx'

export default function Unauthorized() {
  const { profile } = useAuth()
  const path = profile?.role ? `/${profile.role}` : '/login'
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center gap-4">
      <span className="text-5xl">🚫</span>
      <h1 className="text-xl font-bold text-slate-200">Access Denied</h1>
      <p className="text-sm text-slate-500">You do not have permission to view this page.</p>
      <Link to={path}><Button>Go to Dashboard</Button></Link>
    </div>
  )
}
