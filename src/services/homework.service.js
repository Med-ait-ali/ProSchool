import {
  collection, addDoc, updateDoc, doc, query,
  where, orderBy, onSnapshot,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'

const COL = 'homework'

export const subscribeHomework = (classId, callback) =>
  onSnapshot(
    query(collection(db, COL), where('classId', '==', classId), orderBy('createdAt', 'desc')),
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  )

// Upload PDF to Firebase Storage (free 5GB) then save record
export const uploadHomework = async (file, homeworkData) => {
  let attachmentUrl = null
  if (file) {
    const storageRef = ref(storage, `homework/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    attachmentUrl = await getDownloadURL(storageRef)
  }
  return addDoc(collection(db, COL), {
    ...homeworkData,
    attachmentUrl,
    createdAt: new Date().toISOString(),
  })
}

export const updateHomeworkStatus = (id, status) =>
  updateDoc(doc(db, COL, id), { status })
