import schoolSettings from '../../config/schoolSettings'

const S = schoolSettings

// ── Badge ──────────────────────────────────────────────────
const BADGE_STYLES = {
  paid:      'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  pending:   'bg-amber-900/40   text-amber-400   border-amber-700/50',
  urgent:    'bg-red-900/40     text-red-400     border-red-700/50',
  homework:  'bg-violet-900/40  text-violet-400  border-violet-700/50',
  info:      'bg-sky-900/40     text-sky-400     border-sky-700/50',
  active:    'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  submitted: 'bg-navy-700/40    text-slate-400   border-navy-600/50',
  admin:     'bg-sky-900/40     text-sky-400     border-sky-700/50',
  teacher:   'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
  parent:    'bg-violet-900/40  text-violet-400  border-violet-700/50',
}

export const Badge = ({ type, children }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border tracking-wide uppercase ${BADGE_STYLES[type] || BADGE_STYLES.info}`}>
    {children}
  </span>
)

// ── Card ────────────────────────────────────────────────────
export const Card = ({ children, className = '' }) => (
  <div className={`bg-navy-800 border border-navy-600 rounded-xl p-4 ${className}`}>
    {children}
  </div>
)

// ── Stat Card ────────────────────────────────────────────────
export const StatCard = ({ icon, label, value, sub, color = 'text-sky-400' }) => (
  <Card className="flex-1 min-w-[140px]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-3xl font-bold ${color} leading-none`}>{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-1.5">{sub}</p>}
      </div>
      <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center text-lg">{icon}</div>
    </div>
  </Card>
)

// ── Input ───────────────────────────────────────────────────
export const Input = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs text-slate-400 uppercase tracking-wider">{label}</label>}
    <input
      className={`bg-navy-700 border border-navy-600 rounded-lg px-3 py-2.5 text-slate-200 text-sm
        placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
)

// ── Button ──────────────────────────────────────────────────
export const Button = ({ children, variant = 'primary', loading, className = '', ...props }) => {
  const variants = {
    primary:  'bg-sky-500 hover:bg-sky-400 text-white',
    ghost:    'bg-transparent hover:bg-navy-700 text-slate-300 border border-navy-600',
    danger:   'bg-red-600 hover:bg-red-500 text-white',
    success:  'bg-emerald-600 hover:bg-emerald-500 text-white',
  }
  return (
    <button
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
        transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
}

// ── Spinner ──────────────────────────────────────────────────
export const Spinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-7 h-7 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

// ── Empty State ──────────────────────────────────────────────
export const Empty = ({ icon = '📭', message = 'No data found' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-3">
    <span className="text-4xl">{icon}</span>
    <p className="text-sm">{message}</p>
  </div>
)
