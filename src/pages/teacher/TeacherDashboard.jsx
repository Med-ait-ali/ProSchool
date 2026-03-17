import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import Overview    from './Overview'
import Attendance  from './Attendance'
import Grades      from './Grades'
import Homework    from './Homework'

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index              element={<Overview />}   />
        <Route path="attendance"  element={<Attendance />} />
        <Route path="grades"      element={<Grades />}     />
        <Route path="homework"    element={<Homework />}   />
      </Routes>
    </DashboardLayout>
  )
}
