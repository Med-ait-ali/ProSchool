import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import Home     from './Home'
import Progress from './Progress'
import Fees     from './Fees'
import Messages from './Messages'

export default function ParentDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index            element={<Home />}     />
        <Route path="progress"  element={<Progress />} />
        <Route path="fees"      element={<Fees />}     />
        <Route path="messages"  element={<Messages />} />
      </Routes>
    </DashboardLayout>
  )
}
