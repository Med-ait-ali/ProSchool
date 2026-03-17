import { useAuth } from '../../context/AuthContext'
import { StatCard, Card, Badge } from '../../components/ui/index.jsx'

const RECENT = [
  { name:'Youssef Benali',  action:'Fee paid',      time:'2 hours ago',  type:'paid' },
  { name:'Mme. Tazi',       action:'Homework posted',time:'3 hours ago',  type:'homework' },
  { name:'Hassan Benali',   action:'Parent login',   time:'5 hours ago',  type:'info' },
  { name:'Admin',           action:'New announcement',time:'Yesterday',   type:'urgent' },
]

const PROGRESS = [
  { label:'6A', pct:88 }, { label:'6B', pct:74 }, { label:'7A', pct:92 }, { label:'7B', pct:79 },
]

export default function Overview() {
  const { profile } = useAuth()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Good morning, {profile?.name?.split(' ')[0]} 👋</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="👥" label="Total Students" value={92}  sub="4 active classes"    color="text-sky-400" />
        <StatCard icon="✅" label="Fees Collected"  value="78%" sub="72 of 92 paid"       color="text-emerald-400" />
        <StatCard icon="📢" label="Announcements"   value={3}   sub="1 unread"            color="text-violet-400" />
        <StatCard icon="👨‍🏫" label="Teachers"        value={8}   sub="5 active today"      color="text-amber-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Class performance */}
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold text-slate-200 mb-4">Class Performance — Avg Score</p>
          <div className="space-y-3">
            {PROGRESS.map(c => (
              <div key={c.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Class {c.label}</span>
                  <span className="text-slate-300 font-semibold">{c.pct}%</span>
                </div>
                <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${c.pct >= 85 ? 'bg-emerald-500' : c.pct >= 70 ? 'bg-sky-500' : 'bg-amber-500'}`}
                    style={{ width:`${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card>
          <p className="text-sm font-semibold text-slate-200 mb-3">Recent Activity</p>
          <div className="space-y-3">
            {RECENT.map((r, i) => (
              <div key={i} className="flex items-start justify-between gap-2 pb-3 border-b border-navy-600 last:border-0 last:pb-0">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{r.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.action}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge type={r.type}>{r.type}</Badge>
                  <span className="text-[10px] text-slate-600">{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
