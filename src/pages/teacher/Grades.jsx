import { useState, useEffect } from 'react'
import { subscribeStudents, updateGrade } from '../../services/students.service'
import { useAuth } from '../../context/AuthContext'
import { Card, Spinner, Button } from '../../components/ui/index.jsx'
import toast from 'react-hot-toast'

const SUBJECTS = ['Math', 'Science', 'Arabic', 'French', 'History']

export default function Grades() {
  const { profile } = useAuth()
  const [students, setStudents] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [edits,    setEdits]    = useState({})
  const [subject,  setSubject]  = useState('Math')

  useEffect(() => {
    if (!profile?.schoolId) return
    const unsub = subscribeStudents(profile.schoolId, (data) => {
      setStudents(data)
      const init = {}
      data.forEach(s => { init[s.id] = String(s.grades?.[subject] ?? '') })
      setEdits(init)
      setLoading(false)
    })
    return unsub
  }, [profile?.schoolId, subject])

  const saveAll = async () => {
    try {
      await Promise.all(
        students.map(s => {
          const val = parseInt(edits[s.id])
          if (!isNaN(val)) return updateGrade(s.id, subject, Math.min(100, Math.max(0, val)))
        }).filter(Boolean)
      )
      toast.success('Grades saved!')
    } catch { toast.error('Save failed') }
  }

  const getColor = (v) => {
    const n = parseInt(v)
    if (isNaN(n)) return 'text-slate-500'
    return n >= 80 ? 'text-emerald-400' : n >= 60 ? 'text-amber-400' : 'text-red-400'
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-slate-100">Grade Entry</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 bg-navy-800 border border-navy-600 rounded-lg p-1">
            {SUBJECTS.map(s => (
              <button key={s} onClick={() => setSubject(s)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${subject === s ? 'bg-sky-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                {s}
              </button>
            ))}
          </div>
          <Button onClick={saveAll} variant="success">Save All</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? <Spinner /> : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-700 border-b border-navy-600">
                {['Student', 'Class', 'Current Grade', 'Score Bar', 'Edit'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => {
                const val = edits[s.id] ?? ''
                const num = parseInt(val)
                return (
                  <tr key={s.id} className={`border-b border-navy-600 last:border-0 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/50'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400">
                          {s.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-medium text-slate-200">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{s.classId}</td>
                    <td className="px-4 py-3">
                      <span className={`text-base font-bold ${getColor(val)}`}>
                        {isNaN(num) ? '—' : `${num}%`}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-32">
                      {!isNaN(num) && (
                        <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${num >= 80 ? 'bg-emerald-500' : num >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${num}%` }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number" min={0} max={100}
                        value={val}
                        onChange={e => setEdits(p => ({ ...p, [s.id]: e.target.value }))}
                        className="w-16 bg-navy-700 border border-navy-600 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-sky-500 text-center"
                      />
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
