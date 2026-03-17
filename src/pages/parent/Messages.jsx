import { useState, useEffect } from 'react'
import { subscribeAnnouncements, markRead } from '../../services/announcements.service'
import { useAuth } from '../../context/AuthContext'
import { Card, Badge, Spinner, Empty } from '../../components/ui/index.jsx'

export default function Messages() {
  const { profile } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!profile?.schoolId) return
    const unsub = subscribeAnnouncements(profile.schoolId, (data) => {
      setMessages(data)
      setLoading(false)
    })
    return unsub
  }, [profile?.schoolId])

  const handleRead = async (id) => {
    if (!profile?.uid) return
    await markRead(id, profile.uid)
  }

  const unread = messages.filter(m => !m.readBy?.includes(profile?.uid))

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-100">Messages & Notifications</h1>
        {unread.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {unread.length} unread
          </div>
        )}
      </div>

      {loading ? <Spinner /> : messages.length === 0 ? <Empty icon="💬" message="No messages yet" /> : (
        <div className="space-y-3">
          {messages.map(m => {
            const isRead = m.readBy?.includes(profile?.uid)
            const borderColor = m.type === 'urgent' ? 'border-l-red-500' : m.type === 'homework' ? 'border-l-violet-500' : 'border-l-sky-500'
            return (
              <Card
                key={m.id}
                onClick={() => !isRead && handleRead(m.id)}
                className={`border-l-4 ${borderColor} cursor-pointer hover:border-navy-500 transition-all ${isRead ? 'opacity-65' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    {!isRead && <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-sky-400 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-200">{m.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{m.body}</p>
                      <p className="text-xs text-slate-600 mt-1.5">From: {m.fromName} · {m.createdAt?.slice(0, 10)}</p>
                    </div>
                  </div>
                  <Badge type={m.type}>{m.type}</Badge>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
