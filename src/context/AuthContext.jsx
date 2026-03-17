import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import { getUserProfile, logoutUser } from '../services/auth.service'

// ── Auth Context ─────────────────────────────────────────────
// Provides: { user, profile, loading, logout }
// profile contains: { uid, email, name, role, schoolId }
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid)
        setUser(firebaseUser)
        setProfile(p)
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    await logoutUser()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
