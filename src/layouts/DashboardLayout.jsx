import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-navy-950 text-slate-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
