import { useState, useEffect } from 'react'
import { subscribeStudents } from '../../services/students.service'
import { useAuth } from '../../context/AuthContext'
import { Badge, Card, Button, Input, Spinner, Empty } from '../../components/ui/index.jsx'

export default function Students() {
  const { profile } = useAuth()
  const [students, setStudents] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  useEffect(() => {
    if (!profile?.schoolId) return
    const unsub = subscribeStudents(profile.schoolId, (data) => {
      setStudents(data)
      setLoading(false)
    })
    return unsub
  }, [profile?.schoolId])

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-slate-100">Students</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search students..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-48"
          />
          <Button>+ Add Student</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? <Spinner /> : filtered.length === 0 ? <Empty message="No students found" /> : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-700 border-b border-navy-600">
                {['Student','Class','Parent','Average','Fees','Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const avg = s.grades ? Math.round(Object.values(s.grades).reduce((a,v)=>a+v,0) / Object.values(s.grades).length) : 0
                const today = new Date().toISOString().split('T')[0]
                const present = s.attendance?.[today] ?? false
                return (
                  <tr key={s.id} className={`border-b border-navy-600 last:border-0 ${i%2===0?'bg-navy-800':'bg-navy-900/50'} hover:bg-navy-700/50 transition-colors`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400">
                          {s.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <span className="font-medium text-slate-200">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{s.classId || '—'}</td>
                    <td className="px-4 py-3 text-slate-400">{s.parentName || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${avg>=80?'bg-emerald-500':avg>=60?'bg-amber-500':'bg-red-500'}`} style={{width:`${avg}%`}} />
                        </div>
                        <span className={`text-xs font-semibold ${avg>=80?'text-emerald-400':avg>=60?'text-amber-400':'text-red-400'}`}>{avg}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge type={s.fees?.status || 'pending'}>{s.fees?.status || 'pending'}</Badge></td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${present?'text-emerald-400':'text-red-400'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${present?'bg-emerald-400':'bg-red-400'}`}/>
                        {present ? 'Present' : 'Absent'}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
