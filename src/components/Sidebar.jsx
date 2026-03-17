import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import schoolSettings from '../config/schoolSettings'
import toast from 'react-hot-toast'

const MENUS = {
  admin: [
    { to: '/admin',             icon: '📊', label: 'Overview'       },
    { to: '/admin/students',    icon: '👥', label: 'Students'       },
    { to: '/admin/classes',     icon: '🏫', label: 'Classes'        },
    { to: '/admin/financials',  icon: '💰', label: 'Financials'     },
    { to: '/admin/announcements',icon:'📢', label: 'Announcements'  },
    { to: '/admin/users',       icon: '⚙️', label: 'User Management'},
  ],
  teacher: [
    { to: '/teacher',           icon: '📊', label: 'Overview'   },
    { to: '/teacher/attendance',icon: '✅', label: 'Attendance' },
    { to: '/teacher/grades',    icon: '📝', label: 'Grades'     },
    { to: '/teacher/homework',  icon: '📚', label: 'Homework'   },
  ],
  parent: [
    { to: '/parent',            icon: '🏠', label: 'Home'     },
    { to: '/parent/progress',   icon: '📈', label: 'Progress' },
    { to: '/parent/fees',       icon: '💳', label: 'Fees'     },
    { to: '/parent/messages',   icon: '💬', label: 'Messages' },
  ],
}

export default function Sidebar() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const role = profile?.role || 'admin'
  const S = schoolSettings

  const handleLogout = async () => {
    await logout()
    toast.success('Signed out successfully')
    navigate('/login')
  }

  return (
    <aside className="w-52 shrink-0 bg-navy-900 border-r border-navy-600 flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-navy-600">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${S.theme.gradient} flex items-center justify-center text-white text-xs font-black`}>
            {S.logoText}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100">{S.name}</p>
            <p className="text-[10px] text-slate-500 capitalize">{role} portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {(MENUS[role] || []).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to.split('/').length === 2}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
               border-l-2 ${isActive
                ? 'bg-sky-500/10 text-sky-400 border-sky-500 font-semibold'
                : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-navy-700'}`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-navy-600 space-y-2">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 text-xs font-bold">
            {profile?.name?.charAt(0) || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{profile?.name || 'User'}</p>
            <p className="text-[10px] text-slate-500 capitalize">{role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
