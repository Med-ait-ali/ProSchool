import { useState, useEffect } from 'react'
import { subscribeStudents, markAttendance } from '../../services/students.service'
import { useAuth } from '../../context/AuthContext'
import { Card, Spinner, Button } from '../../components/ui/index.jsx'
import toast from 'react-hot-toast'

export default function Attendance() {
  const { profile } = useAuth()
  const [students,    setStudents]    = useState([])
  const [loading,     setLoading]     = useState(true)
  const [attendance,  setAttendance]  = useState({})
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (!profile?.schoolId) return
    const unsub = subscribeStudents(profile.schoolId, (data) => {
      setStudents(data)
      const init = {}
      data.forEach(s => { init[s.id] = s.attendance?.[today] ?? true })
      setAttendance(init)
      setLoading(false)
    })
    return unsub
  }, [profile?.schoolId])

  const toggle = async (id) => {
    const newVal = !attendance[id]
    setAttendance(p => ({ ...p, [id]: newVal }))
    try {
      await markAttendance(id, today, newVal)
    } catch { toast.error('Failed to save') }
  }

  const presentCount = Object.values(attendance).filter(Boolean).length

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Attendance</h1>
          <p className="text-xs text-slate-500 mt-0.5">{today} · Present: {presentCount} / {students.length}</p>
        </div>
        <Button onClick={() => toast.success('Attendance saved!')} variant="success">Save All</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? <Spinner /> : students.map(s => (
          <Card key={s.id} className="flex items-center justify-between hover:border-navy-500 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400">
                {s.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{s.name}</p>
                <p className="text-xs text-slate-500">{s.classId}</p>
              </div>
            </div>
            {/* Toggle */}
            <button onClick={() => toggle(s.id)}
              className={`w-11 h-6 rounded-full relative transition-colors border ${attendance[s.id] ? 'bg-emerald-600 border-emerald-500' : 'bg-navy-700 border-navy-600'}`}>
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${attendance[s.id] ? 'left-5' : 'left-0.5'}`} />
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
