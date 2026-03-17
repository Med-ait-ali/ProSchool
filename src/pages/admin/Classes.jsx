import { Card, StatCard, Badge, Button } from '../../components/ui/index.jsx'

const CLASSES = [
  { name:'6A', teacher:'M. Khalid',      students:24, room:'Room 1', avgScore:88 },
  { name:'6B', teacher:'Mme. Tazi',      students:22, room:'Room 2', avgScore:74 },
  { name:'7A', teacher:'M. Oulhoucien',  students:26, room:'Room 3', avgScore:92 },
  { name:'7B', teacher:'Mme. Benali',    students:20, room:'Room 4', avgScore:79 },
]

export default function Classes() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-100">Classes</h1>
        <Button>+ New Class</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CLASSES.map(c => (
          <Card key={c.name} className="hover:border-sky-600/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-xl mb-3">🏫</div>
            <p className="text-lg font-bold text-slate-100">Class {c.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{c.teacher}</p>
            <div className="mt-3 pt-3 border-t border-navy-600 grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-xl font-bold text-sky-400">{c.students}</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-wide">Students</p>
              </div>
              <div>
                <p className={`text-xl font-bold ${c.avgScore>=85?'text-emerald-400':'text-amber-400'}`}>{c.avgScore}%</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-wide">Avg Score</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">{c.room}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
