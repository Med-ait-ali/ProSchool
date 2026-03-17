import { useState } from 'react'
import { StatCard, Card, Badge, Button } from '../../components/ui/index.jsx'
import schoolSettings from '../../config/schoolSettings'

const S = schoolSettings

const STUDENTS_FEE = [
  { id:1, name:'Youssef Benali', class:'6A', amount:2400, status:'paid',    date:'2026-02-01', inv:'INV-001' },
  { id:2, name:'Fatima Zahra',   class:'6A', amount:2400, status:'pending', date:null,         inv:null },
  { id:3, name:'Karim Idrissi',  class:'6B', amount:2400, status:'paid',    date:'2026-01-28', inv:'INV-002' },
  { id:4, name:'Sara Moussaoui', class:'7A', amount:2400, status:'paid',    date:'2026-02-03', inv:'INV-003' },
  { id:5, name:'Amine Tazi',     class:'7B', amount:2400, status:'pending', date:null,         inv:null },
  { id:6, name:'Nour El Houda',  class:'7A', amount:2400, status:'paid',    date:'2026-02-10', inv:'INV-004' },
]

const MONTHLY = [
  { m:'Oct', collected:18400, pending:2200 },
  { m:'Nov', collected:19100, pending:1800 },
  { m:'Dec', collected:17800, pending:3100 },
  { m:'Jan', collected:20200, pending:900  },
  { m:'Feb', collected:19600, pending:1400 },
  { m:'Mar', collected:16800, pending:2600 },
]

const MAX = 22000

export default function Financials() {
  const [filter, setFilter] = useState('all')
  const paid    = STUDENTS_FEE.filter(s => s.status === 'paid')
  const pending = STUDENTS_FEE.filter(s => s.status === 'pending')
  const total   = MONTHLY.reduce((a,f) => a + f.collected, 0)
  const totalP  = MONTHLY.reduce((a,f) => a + f.pending, 0)

  const visible = filter === 'all' ? STUDENTS_FEE : STUDENTS_FEE.filter(s => s.status === filter)

  // Simple invoice print
  const printInvoice = (s) => {
    const w = window.open('', '_blank')
    w.document.write(`<html><body style="font-family:sans-serif;padding:40px;max-width:500px">
      <h2 style="color:#0284c7">${S.name}</h2>
      <hr/><h3>Invoice ${s.inv}</h3>
      <p>Student: <strong>${s.name}</strong></p>
      <p>Class: ${s.class}</p>
      <p>Amount: <strong>${s.amount.toLocaleString()} ${S.currency}</strong></p>
      <p>Status: <strong style="color:green">PAID</strong></p>
      <p>Date: ${s.date}</p>
      <hr/><p style="font-size:12px;color:#999">© ${S.year} ${S.name} · ${S.footerCredit}</p>
    </body></html>`)
    w.print()
  }

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold text-slate-100">Financial Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="💰" label="Total Collected" value={`${(total/1000).toFixed(0)}K`} sub={`${S.currency} · 6 months`} color="text-emerald-400" />
        <StatCard icon="⏳" label="Pending"          value={`${(totalP/1000).toFixed(1)}K`} sub="Awaiting payment" color="text-amber-400" />
        <StatCard icon="✅" label="Paid Students"    value={paid.length} sub={`of ${STUDENTS_FEE.length} total`} color="text-sky-400" />
        <StatCard icon="📈" label="Collection Rate"  value={`${Math.round(total/(total+totalP)*100)}%`} sub="vs 88% last year" color="text-violet-400" />
      </div>

      {/* Bar chart */}
      <Card>
        <p className="text-sm font-semibold text-slate-200 mb-4">Monthly Collection vs Pending</p>
        <div className="space-y-2.5">
          {MONTHLY.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-7">{f.m}</span>
              <div className="flex-1 h-5 bg-navy-700 rounded overflow-hidden relative flex">
                <div className="h-full bg-sky-500 transition-all flex items-center justify-end pr-1"
                     style={{ width:`${(f.collected/MAX)*100}%` }}>
                  <span className="text-[9px] text-white font-bold">{(f.collected/1000).toFixed(0)}K</span>
                </div>
                <div className="h-full bg-amber-500/60 transition-all"
                     style={{ width:`${(f.pending/MAX)*100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-sky-500 inline-block"/>Collected</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-500/60 inline-block"/>Pending</span>
        </div>
      </Card>

      {/* Student fee table */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-navy-600">
          <p className="text-sm font-semibold text-slate-200">Student Fee Status</p>
          <div className="flex gap-1">
            {['all','paid','pending'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-all font-medium ${filter===f ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-600">
              {['Student','Class','Amount','Status','Invoice'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-500 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((s, i) => (
              <tr key={s.id} className={`border-b border-navy-600 last:border-0 ${i%2===0?'bg-navy-800':'bg-navy-900/50'}`}>
                <td className="px-4 py-3 font-medium text-slate-200">{s.name}</td>
                <td className="px-4 py-3 text-slate-500">{s.class}</td>
                <td className="px-4 py-3 text-slate-300 font-semibold">{s.amount.toLocaleString()} {S.currency}</td>
                <td className="px-4 py-3"><Badge type={s.status}>{s.status}</Badge></td>
                <td className="px-4 py-3">
                  {s.status === 'paid'
                    ? <button onClick={() => printInvoice(s)} className="text-xs text-sky-400 hover:text-sky-300 underline">{s.inv} 🖨️</button>
                    : <button className="text-xs text-amber-400 hover:text-amber-300 underline">Send Reminder</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
