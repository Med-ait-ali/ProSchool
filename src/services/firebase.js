// ============================================================
// FIREBASE CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FREE TIER (Spark Plan) — No credit card required.
// Limits: 50K reads/day, 20K writes/day, 1GB storage.
// More than enough for a school with <500 students.
//
// SETUP:
// 1. Go to https://console.firebase.google.com
// 2. Create a project → Add Web App
// 3. Copy your config below
// 4. Enable: Authentication (Email/Password) + Firestore + Storage
// ============================================================

import { initializeApp } from 'firebase/app'
import { getAuth }        from 'firebase/auth'
import { getFirestore }   from 'firebase/firestore'
import { getStorage }     from 'firebase/storage'

// ⚠️  Replace with your own Firebase project config
// (safe to commit — security is enforced via Firestore Rules)
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app     = initializeApp(firebaseConfig)
export const auth    = getAuth(app)
export const db      = getFirestore(app)
export const storage = getStorage(app)
export default app
