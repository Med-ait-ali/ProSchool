import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

// Register a new user and save their role to Firestore
export const registerUser = async (email, password, role, name, schoolId) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid, email, name, role, schoolId,
    createdAt: new Date().toISOString(),
  })
  return user
}

// Login — returns Firebase user (role fetched from Firestore)
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// Fetch role + profile from Firestore
export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export const logoutUser = () => signOut(auth)

export const resetPassword = (email) => sendPasswordResetEmail(auth, email)
