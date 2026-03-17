import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute   from './routes/ProtectedRoute'

// Pages
import Login          from './pages/auth/Login'
import Unauthorized   from './pages/auth/Unauthorized'
import AdminDashboard from './pages/admin/AdminDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import ParentDashboard  from './pages/parent/ParentDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/proschool">
        <Routes>
          {/* Public */}
          <Route path="/login"        element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin — full access */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Teacher — attendance, grades, homework */}
          <Route path="/teacher/*" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />

          {/* Parent — child progress, fees, messages */}
          <Route path="/parent/*" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } />

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
