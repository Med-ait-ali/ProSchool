import { useState, useEffect } from 'react'
import { subscribeAnnouncements, postAnnouncement, markRead } from '../../services/announcements.service'
import { useAuth } from '../../context/AuthContext'
import { Card, Badge, Button, Input, Spinner, Empty } from '../../components/ui/index.jsx'
import toast from 'react-hot-toast'

const TYPE_OPTIONS = ['info','urgent','homework']

export default function Announcements() {
  const { profile } = useAuth()
  const [anns,    setAnns]    = useState([])
  const [loading, setLoading] = useState(true)
  const [title,   setTitle]   = useState('')
  const [body,    setBody]    = useState('')
  const [type,    setType]    = useState('info')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    if (!profile?.schoolId) return
    const unsub = subscribeAnnouncements(profile.schoolId, (data) => {
      setAnns(data)
      setLoading(false)
    })
    return unsub
  }, [profile?.schoolId])

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) return toast.error('Title and body are required')
    setPosting(true)
    try {
      await postAnnouncement({
        schoolId: profile.schoolId,
        from: profile.uid,
        fromName: profile.name,
        title, body, type,
        targetRoles: ['parent', 'teacher'],
        readBy: [],
      })
      setTitle(''); setBody(''); setType('info')
      toast.success('Announcement posted!')
    } catch { toast.error('Failed to post') }
    finally { setPosting(false) }
  }

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold text-slate-100">Announcements & Internal Tickets</h1>

      {/* Compose */}
      <Card>
        <p className="text-sm font-semibold text-slate-200 mb-3">New Announcement</p>
        <div className="space-y-3">
          <Input placeholder="Title..." value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea
            value={body} onChange={e=>setBody(e.target.value)}
            placeholder="Message body..."
            rows={3}
            className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2.5 text-slate-200 text-sm
              placeholder:text-slate-600 focus:outline-none focus:border-sky-500 resize-none transition-colors"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Type:</span>
            {TYPE_OPTIONS.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-2.5 py-1 rounded text-xs capitalize font-semibold transition-all
                  ${type===t ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50' : 'text-slate-500 border border-navy-600 hover:border-navy-500'}`}>
                {t}
              </button>
            ))}
            <Button loading={posting} onClick={handlePost} className="ml-auto">Post</Button>
          </div>
        </div>
      </Card>

      {/* List */}
      {loading ? <Spinner /> : anns.length === 0 ? <Empty icon="📢" message="No announcements yet" /> : (
        <div className="space-y-3">
          {anns.map(a => {
            const isRead = a.readBy?.includes(profile?.uid)
            return (
              <Card key={a.id} className={`border-l-4 ${a.type==='urgent'?'border-l-red-500':a.type==='homework'?'border-l-violet-500':'border-l-sky-500'} ${isRead?'opacity-70':''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!isRead && <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-0.5" />}
                      <p className="text-sm font-semibold text-slate-200 truncate">{a.title}</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{a.body}</p>
                    <p className="text-xs text-slate-600">From: {a.fromName} · {a.createdAt?.slice(0,10)}</p>
                  </div>
                  <Badge type={a.type}>{a.type}</Badge>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
