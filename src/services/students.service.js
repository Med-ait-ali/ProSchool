import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, query, where, orderBy, onSnapshot,
} from 'firebase/firestore'
import { db } from './firebase'

const COL = 'students'

// Real-time listener for students in a school
export const subscribeStudents = (schoolId, callback) =>
  onSnapshot(
    query(collection(db, COL), where('schoolId', '==', schoolId), orderBy('name')),
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  )

export const addStudent = (data) => addDoc(collection(db, COL), data)

export const updateStudent = (id, data) => updateDoc(doc(db, COL, id), data)

export const deleteStudent = (id) => deleteDoc(doc(db, COL, id))

// Update attendance for one student (stores per-date map)
export const markAttendance = (id, date, present) =>
  updateDoc(doc(db, COL, id), { [`attendance.${date}`]: present })

// Update grades
export const updateGrade = (id, subject, score) =>
  updateDoc(doc(db, COL, id), { [`grades.${subject}`]: score })
