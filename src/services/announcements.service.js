import {
  collection, addDoc, updateDoc, doc, query,
  where, orderBy, onSnapshot, arrayUnion,
} from 'firebase/firestore'
import { db } from './firebase'

const COL = 'announcements'

// Real-time announcements for a school
export const subscribeAnnouncements = (schoolId, callback) =>
  onSnapshot(
    query(collection(db, COL), where('schoolId', '==', schoolId), orderBy('createdAt', 'desc')),
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  )

export const postAnnouncement = (data) =>
  addDoc(collection(db, COL), { ...data, createdAt: new Date().toISOString() })

// Mark as read by uid
export const markRead = (id, uid) =>
  updateDoc(doc(db, COL, id), { readBy: arrayUnion(uid) })
