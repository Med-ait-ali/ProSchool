import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import Overview     from './Overview'
import Students     from './Students'
import Financials   from './Financials'
import Announcements from './Announcements'
import Classes      from './Classes'

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index             element={<Overview />}      />
        <Route path="students"   element={<Students />}      />
        <Route path="classes"    element={<Classes />}       />
        <Route path="financials" element={<Financials />}    />
        <Route path="announcements" element={<Announcements />} />
      </Routes>
    </DashboardLayout>
  )
}
