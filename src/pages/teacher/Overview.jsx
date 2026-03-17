import { useAuth } from '../../context/AuthContext'
import { StatCard, Card, Badge } from '../../components/ui/index.jsx'

const UPCOMING = [
  { subject:'Math',    time:'08:00',class:'6A',room:'Room 1' },
  { subject:'Math',    time:'10:00',class:'7A',room:'Room 3' },
  { subject:'Math',    time:'14:00',class:'6B',room:'Room 2' },
]

export default function Overview() {
  const { profile } = useAuth()
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Welcome, {profile?.name} 👋</h1>
        <p className="text-sm text-slate-500 mt-0.5">Here's your day at a glance</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="👥" label="My Students"  value={72}   sub="3 classes"   color="text-sky-400" />
        <StatCard icon="✅" label="Present Today" value={65}   sub="of 72"       color="text-emerald-400" />
        <StatCard icon="📚" label="Homework Due"  value={3}    sub="this week"   color="text-violet-400" />
        <StatCard icon="📊" label="Class Avg"     value="83%"  sub="all classes" color="text-amber-400" />
      </div>
      <Card>
        <p className="text-sm font-semibold text-slate-200 mb-3">Today's Schedule</p>
        <div className="space-y-2">
          {UPCOMING.map((u, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-navy-600 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-12 text-xs text-sky-400 font-mono font-semibold">{u.time}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{u.subject}</p>
                  <p className="text-xs text-slate-500">{u.room}</p>
                </div>
              </div>
              <Badge type="info">Class {u.class}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
