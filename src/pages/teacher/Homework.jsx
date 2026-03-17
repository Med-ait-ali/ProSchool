import { useState, useEffect, useRef } from 'react'
import { subscribeHomework, uploadHomework, updateHomeworkStatus } from '../../services/homework.service'
import { useAuth } from '../../context/AuthContext'
import { Card, Badge, Button, Input, Spinner, Empty } from '../../components/ui/index.jsx'
import toast from 'react-hot-toast'

export default function Homework() {
  const { profile } = useAuth()
  const [homeworks, setHomeworks] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [title,     setTitle]     = useState('')
  const [subject,   setSubject]   = useState('')
  const [dueDate,   setDueDate]   = useState('')
  const [file,      setFile]      = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  // Default classId: teachers only see their class
  const classId = profile?.classId || 'class_6A'

  useEffect(() => {
    const unsub = subscribeHomework(classId, (data) => {
      setHomeworks(data)
      setLoading(false)
    })
    return unsub
  }, [classId])

  const handleAssign = async () => {
    if (!title || !subject || !dueDate) return toast.error('Fill all fields')
    setUploading(true)
    try {
      await uploadHomework(file, {
        classId,
        teacherId:   profile?.uid,
        teacherName: profile?.name,
        title, subject,
        dueDate,
        status:         'active',
        notifyParents:  true,
      })
      setTitle(''); setSubject(''); setDueDate(''); setFile(null)
      toast.success('Homework assigned! Parents notified 📢')
    } catch { toast.error('Upload failed') }
    finally { setUploading(false) }
  }

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold text-slate-100">Homework Management</h1>

      {/* Assign form */}
      <Card>
        <p className="text-sm font-semibold text-slate-200 mb-3">Assign New Homework</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Input label="Title"   placeholder="Chapter 5 — Exercises" value={title}   onChange={e => setTitle(e.target.value)} />
          <Input label="Subject" placeholder="Math, Science..."       value={subject} onChange={e => setSubject(e.target.value)} />
          <Input label="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 uppercase tracking-wider">Attachment (PDF)</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="h-10 bg-navy-700 border border-dashed border-navy-500 rounded-lg flex items-center justify-center text-xs text-slate-500 cursor-pointer hover:border-sky-500 hover:text-sky-400 transition-all">
              {file ? `📎 ${file.name}` : '+ Click to attach PDF'}
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
              onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
        </div>
        <Button onClick={handleAssign} loading={uploading}>
          📤 Assign &amp; Notify Parents
        </Button>
      </Card>

      {/* List */}
      {loading ? <Spinner /> : homeworks.length === 0 ? <Empty icon="📚" message="No homework assigned yet" /> : (
        <div className="space-y-3">
          {homeworks.map(h => (
            <Card key={h.id} className="hover:border-navy-500 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200">{h.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{h.subject} · Due {h.dueDate}</p>
                  {h.attachmentUrl && (
                    <a href={h.attachmentUrl} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 mt-1.5 text-xs text-sky-400 hover:text-sky-300">
                      📎 View attachment
                    </a>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge type={h.status}>{h.status}</Badge>
                  {h.status === 'active' && (
                    <button
                      onClick={() => updateHomeworkStatus(h.id, 'closed').then(() => toast.success('Closed'))}
                      className="text-[10px] text-slate-600 hover:text-slate-400">
                      Mark closed
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
