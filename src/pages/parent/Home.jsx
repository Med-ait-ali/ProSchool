import { useAuth } from '../../context/AuthContext'
import { StatCard, Card, Badge } from '../../components/ui/index.jsx'
import schoolSettings from '../../config/schoolSettings'

// In production: fetch real child data from Firestore using profile.linkedStudentIds
const MOCK_CHILD = {
  name: 'Youssef Benali', class: '6A', avg: 87,
  attendance: 94, teacher: 'M. Khalid',
  grades: { Math: 87, Science: 91, Arabic: 78, French: 85, History: 82 },
}

const MOCK_HW = [
  { subject:'Math',    title:'Chapter 4 — Fractions', due:'2026-03-20', status:'active' },
  { subject:'Science', title:'Lab Report',            due:'2026-03-22', status:'active' },
  { subject:'Arabic',  title:'Essay: My City',        due:'2026-03-19', status:'submitted' },
]

const S = schoolSettings

export default function Home() {
  const { profile } = useAuth()
  const c = MOCK_CHILD

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Welcome, {profile?.name} 👋</h1>
        <p className="text-sm text-slate-500 mt-0.5">Monitoring: <span className="text-sky-400 font-semibold">{c.name}</span> · Class {c.class}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📊" label="Average"    value={`${c.avg}%`}        sub="Rank #2 in class"  color="text-emerald-400" />
        <StatCard icon="✅" label="Attendance"  value={`${c.attendance}%`} sub="This month"        color="text-sky-400" />
        <StatCard icon="📚" label="Homework"    value={MOCK_HW.filter(h=>h.status==='active').length} sub="Due this week" color="text-violet-400" />
        <StatCard icon="💳" label="Fees"        value="Term 1" sub="Paid ✓"                         color="text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Subject grades */}
        <Card>
          <p className="text-sm font-semibold text-slate-200 mb-3">Subject Performance</p>
          <div className="space-y-2.5">
            {Object.entries(c.grades).map(([subj, score]) => (
              <div key={subj} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-16 shrink-0">{subj}</span>
                <div className="flex-1 h-2 bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${score>=80?'bg-emerald-500':score>=60?'bg-amber-500':'bg-red-500'}`}
                    style={{ width:`${score}%` }}
                  />
                </div>
                <span className={`text-xs font-bold w-8 text-right ${score>=80?'text-emerald-400':score>=60?'text-amber-400':'text-red-400'}`}>{score}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Homework */}
        <Card>
          <p className="text-sm font-semibold text-slate-200 mb-3">Pending Homework</p>
          <div className="space-y-2">
            {MOCK_HW.map((h, i) => (
              <div key={i} className="flex items-start justify-between gap-2 pb-2.5 border-b border-navy-600 last:border-0 last:pb-0">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{h.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{h.subject} · Due {h.due}</p>
                </div>
                <Badge type={h.status}>{h.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
