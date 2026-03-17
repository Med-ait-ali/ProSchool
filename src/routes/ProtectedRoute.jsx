import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * RBAC Guard — wraps routes that require authentication + role.
 * Usage:
 *   <ProtectedRoute allowedRoles={['admin']}>
 *     <AdminPage />
 *   </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(profile?.role))
    return <Navigate to="/unauthorized" replace />

  return children
}

export default ProtectedRoute
