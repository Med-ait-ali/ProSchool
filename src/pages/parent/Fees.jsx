import { Card, Badge, Button } from '../../components/ui/index.jsx'
import schoolSettings from '../../config/schoolSettings'

const S = schoolSettings

const FEES = [
  { term:'Term 1', amount:2400, status:'paid',    date:'2025-10-01', inv:'INV-2026-001' },
  { term:'Term 2', amount:2400, status:'paid',    date:'2026-01-15', inv:'INV-2026-042' },
  { term:'Term 3', amount:2400, status:'pending', date:null,         inv:null           },
]

const printInvoice = (f) => {
  const w = window.open('', '_blank')
  w.document.write(`
    <html><head><title>${f.inv}</title>
    <style>body{font-family:sans-serif;padding:40px;max-width:500px;color:#1a1a2e}
    .header{display:flex;align-items:center;gap:12px;margin-bottom:24px}
    .logo{width:48px;height:48px;background:linear-gradient(135deg,#38bdf8,#22d3ee);border-radius:12px;
      display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:16px}
    .divider{border:none;border-top:1px solid #e2e8f0;margin:16px 0}
    table{width:100%;border-collapse:collapse}td{padding:8px 0;font-size:14px}
    .label{color:#64748b}.value{text-align:right;font-weight:600}
    .status{background:#dcfce7;color:#15803d;padding:2px 10px;border-radius:4px;font-weight:700}
    .footer{margin-top:32px;font-size:11px;color:#94a3b8;text-align:center}
    </style></head><body>
    <div class="header">
      <div class="logo">PS</div>
      <div><h2 style="margin:0">${S.name}</h2><p style="margin:0;font-size:12px;color:#64748b">${S.address}</p></div>
    </div>
    <hr class="divider"/>
    <h3 style="margin-bottom:16px">Invoice ${f.inv}</h3>
    <table>
      <tr><td class="label">Student</td><td class="value">Youssef Benali</td></tr>
      <tr><td class="label">Class</td><td class="value">6A</td></tr>
      <tr><td class="label">Term</td><td class="value">${f.term}</td></tr>
      <tr><td class="label">Amount</td><td class="value">${f.amount.toLocaleString()} ${S.currency}</td></tr>
      <tr><td class="label">Payment Date</td><td class="value">${f.date}</td></tr>
      <tr><td class="label">Status</td><td class="value"><span class="status">PAID</span></td></tr>
    </table>
    <div class="footer">© ${S.year} ${S.name} · ${S.footerCredit}</div>
    </body></html>
  `)
  w.print()
}

export default function Fees() {
  const paid    = FEES.filter(f => f.status === 'paid').length
  const pending = FEES.filter(f => f.status === 'pending').length
  const total   = FEES.reduce((a, f) => a + f.amount, 0)
  const paidAmt = FEES.filter(f => f.status === 'paid').reduce((a, f) => a + f.amount, 0)

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold text-slate-100">Fees & Invoices</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{paid}</p>
          <p className="text-xs text-slate-500 mt-1">Terms Paid</p>
        </div>
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{pending}</p>
          <p className="text-xs text-slate-500 mt-1">Terms Pending</p>
        </div>
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-sky-400">{paidAmt.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">{S.currency} Paid</p>
        </div>
      </div>

      {/* Fee cards */}
      <div className="space-y-3">
        {FEES.map((f, i) => (
          <Card key={i} className={`border-l-4 ${f.status === 'paid' ? 'border-l-emerald-500' : 'border-l-amber-500'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-200">{f.term} — School Fees</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {f.status === 'paid' ? `Paid on ${f.date}` : 'Payment due · Please settle before end of month'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-base font-bold text-slate-200">{f.amount.toLocaleString()} {S.currency}</p>
                  <Badge type={f.status}>{f.status}</Badge>
                </div>
                {f.status === 'paid'
                  ? <Button variant="ghost" onClick={() => printInvoice(f)} className="text-xs">🖨️ Invoice</Button>
                  : <Button variant="success" className="text-xs">Pay Now</Button>
                }
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
