import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/auth.service'
import { getUserProfile } from '../../services/auth.service'
import { auth } from '../../services/firebase'
import schoolSettings from '../../config/schoolSettings'
import { Input, Button } from '../../components/ui/index.jsx'
import toast from 'react-hot-toast'

const S = schoolSettings

// Role redirect map
const ROLE_PATHS = { admin: '/admin', teacher: '/teacher', parent: '/parent' }

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { user } = await loginUser(email, password)
      const profile  = await getUserProfile(user.uid)
      const path     = ROLE_PATHS[profile?.role] || '/login'
      toast.success(`Welcome back, ${profile?.name}!`)
      navigate(path, { replace: true })
    } catch (err) {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4">
      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${S.theme.gradient} flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg`}>
            {S.logoText}
          </div>
          <h1 className="text-2xl font-bold text-slate-100">{S.name}</h1>
          <p className="text-sm text-slate-500 mt-1">{S.tagline}</p>
        </div>

        {/* Login Form */}
        <div className="bg-navy-800 border border-navy-600 rounded-2xl p-6 shadow-xl">
          <h2 className="text-base font-semibold text-slate-200 mb-5">Sign in to your account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@proschool.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>
          <p className="text-center text-xs text-slate-600 mt-4">
            Forgot password? Contact your administrator.
          </p>
        </div>

        {/* Demo hint */}
        <div className="mt-4 bg-navy-800/50 border border-navy-600/50 rounded-xl p-3 text-xs text-slate-600 text-center">
          Demo: Create users in Firebase Auth → set role in Firestore
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-700">
        © {S.year} {S.name} · {S.footerCredit}
      </p>
    </div>
  )
}
