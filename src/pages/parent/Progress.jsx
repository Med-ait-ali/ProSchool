import { Card, Badge } from '../../components/ui/index.jsx'

const GRADES_HISTORY = [
  { subject:'Math',    t1:82, t2:87, t3:null },
  { subject:'Science', t1:88, t2:91, t3:null },
  { subject:'Arabic',  t1:74, t2:78, t3:null },
  { subject:'French',  t1:80, t2:85, t3:null },
  { subject:'History', t1:78, t2:82, t3:null },
]

const ATTENDANCE_LOG = [
  { date:'2026-03-17', status:'present' },
  { date:'2026-03-16', status:'absent'  },
  { date:'2026-03-15', status:'present' },
  { date:'2026-03-14', status:'present' },
  { date:'2026-03-13', status:'present' },
  { date:'2026-03-12', status:'present' },
]

export default function Progress() {
  const overall = Math.round(GRADES_HISTORY.reduce((a, s) => a + s.t2, 0) / GRADES_HISTORY.length)

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Academic Progress</h1>
        <p className="text-sm text-slate-500 mt-0.5">Youssef Benali · Class 6A · Academic Year 2025–2026</p>
      </div>

      {/* Overall */}
      <Card className="flex items-center gap-6">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#1a3050" strokeWidth="8"/>
            <circle cx="40" cy="40" r="30" fill="none" stroke="#38bdf8" strokeWidth="8"
              strokeDasharray={`${2*Math.PI*30 * overall/100} ${2*Math.PI*30 * (1-overall/100)}`}
              strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-bold text-slate-200">{overall}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">Overall Average — Term 2</p>
          <p className="text-xs text-slate-500 mt-0.5">Rank: #2 in Class 6A · 26 students</p>
          <div className="flex gap-2 mt-2">
            <Badge type="paid">On Track</Badge>
            <Badge type="info">Term 2</Badge>
          </div>
        </div>
      </Card>

      {/* Term comparison */}
      <Card>
        <p className="text-sm font-semibold text-slate-200 mb-4">Term-by-Term Comparison</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-600">
              {['Subject', 'Term 1', 'Term 2', 'Progress'].map(h => (
                <th key={h} className="pb-2 text-left text-xs text-slate-500 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GRADES_HISTORY.map((g, i) => {
              const diff = g.t2 - g.t1
              return (
                <tr key={i} className="border-b border-navy-600 last:border-0">
                  <td className="py-2.5 font-medium text-slate-300">{g.subject}</td>
                  <td className="py-2.5 text-slate-500">{g.t1}%</td>
                  <td className={`py-2.5 font-bold ${g.t2 >= 80 ? 'text-emerald-400' : g.t2 >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{g.t2}%</td>
                  <td className={`py-2.5 text-xs font-semibold ${diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-red-400' : 'text-slate-500'}`}>
                    {diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : '— same'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      {/* Attendance log */}
      <Card>
        <p className="text-sm font-semibold text-slate-200 mb-3">Attendance Log</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ATTENDANCE_LOG.map((a, i) => (
            <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border ${
              a.status === 'present' ? 'bg-emerald-900/20 border-emerald-800/50 text-emerald-400' : 'bg-red-900/20 border-red-800/50 text-red-400'
            }`}>
              <span>{a.date}</span>
              <span className="font-semibold capitalize">{a.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
