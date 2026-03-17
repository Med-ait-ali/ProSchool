import schoolSettings from '../config/schoolSettings'

const S = schoolSettings

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-600 px-6 py-2.5 flex items-center justify-between shrink-0">
      <p className="text-xs text-slate-600">
        © {S.year} {S.name} | <span className="text-slate-500">{S.footerCredit}</span>
      </p>
      <div className="flex items-center gap-4 text-xs text-slate-700">
        <span>v2.0.0</span>
        <span>·</span>
        <span>Powered by Firebase</span>
        <span>·</span>
        <span>100% Free Tier</span>
      </div>
    </footer>
  )
}
