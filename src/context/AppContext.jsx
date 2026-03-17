// ================================================================
// APP CONTEXT — Global state with Zustand
// Persists across route changes. No data loss on navigation.
// ================================================================
import { create } from 'zustand'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db } from '../services/firebase'

// ── Mock data for demo mode ───────────────────────────────────
export const MOCK = {
  students: [
    { id:'s1', name:'Youssef Benali',  classId:'6A', parentId:'p1', fees:'paid',    avg:87, present:true  },
    { id:'s2', name:'Fatima Zahra',    classId:'6A', parentId:'p2', fees:'pending', avg:92, present:true  },
    { id:'s3', name:'Karim Idrissi',   classId:'6B', parentId:'p3', fees:'paid',    avg:74, present:false },
    { id:'s4', name:'Sara Moussaoui',  classId:'7A', parentId:'p4', fees:'paid',    avg:95, present:true  },
    { id:'s5', name:'Amine Tazi',      classId:'7B', parentId:'p5', fees:'pending', avg:68, present:false },
    { id:'s6', name:'Nour El Houda',   classId:'7A', parentId:'p6', fees:'paid',    avg:88, present:true  },
  ],
  classes: [
    { id:'6A', name:'Class 6A', teacherName:'M. Khalid',      room:'Room 101', count:24 },
    { id:'6B', name:'Class 6B', teacherName:'Mme. Tazi',      room:'Room 102', count:22 },
    { id:'7A', name:'Class 7A', teacherName:'M. Oulhoucien',  room:'Room 201', count:26 },
    { id:'7B', name:'Class 7B', teacherName:'Mme. Benali',    room:'Room 202', count:20 },
  ],
  announcements: [
    { id:'a1', type:'urgent',   from:'Admin',         title:'Parent-Teacher Meeting — Thursday 15h', body:'All parents invited. Room A.', date:'2026-03-17', read:false },
    { id:'a2', type:'homework', from:'M. Khalid',     title:'Homework: Chapter 4 Exercises',         body:'Complete ex. 1–15 by Friday.', date:'2026-03-16', read:true  },
    { id:'a3', type:'info',     from:'Admin',         title:'Spring Break Schedule',                 body:'School closed April 1–10.',   date:'2026-03-14', read:true  },
  ],
  homework: [
    { id:'h1', subject:'Math',    teacher:'M. Khalid',     title:'Chapter 4 — Fractions',        due:'2026-03-20', status:'active'    },
    { id:'h2', subject:'Science', teacher:'Mme. Tazi',     title:'Lab Report: Photosynthesis',   due:'2026-03-22', status:'active'    },
    { id:'h3', subject:'Arabic',  teacher:'M. Oulhoucien', title:'Essay: My City',               due:'2026-03-19', status:'submitted' },
  ],
  financials: [
    { month:'Oct', collected:18400, pending:2200 },
    { month:'Nov', collected:19100, pending:1800 },
    { month:'Dec', collected:17800, pending:3100 },
    { month:'Jan', collected:20200, pending:900  },
    { month:'Feb', collected:19600, pending:1400 },
    { month:'Mar', collected:16800, pending:2600 },
  ],
  invoices: [
    { id:'inv1', studentName:'Youssef Benali', amount:2400, status:'paid',    date:'2026-02-01', num:'INV-2026-001' },
    { id:'inv2', studentName:'Fatima Zahra',   amount:2400, status:'pending', date:'2026-03-01', num:'INV-2026-002' },
    { id:'inv3', studentName:'Karim Idrissi',  amount:2400, status:'paid',    date:'2026-02-10', num:'INV-2026-003' },
    { id:'inv4', studentName:'Amine Tazi',     amount:2400, status:'pending', date:'2026-03-01', num:'INV-2026-004' },
  ],
}

// ── Zustand store ─────────────────────────────────────────────
export const useAppStore = create((set) => ({
  students:      MOCK.students,
  classes:       MOCK.classes,
  announcements: MOCK.announcements,
  homework:      MOCK.homework,
  financials:    MOCK.financials,
  invoices:      MOCK.invoices,

  // Mutators
  addAnnouncement: (a) => set((s) => ({ announcements: [a, ...s.announcements] })),
  addHomework:     (h) => set((s) => ({ homework: [h, ...s.homework] })),
  addStudent:      (st)=> set((s) => ({ students: [...s.students, st] })),
  toggleAttendance:(id)=> set((s) => ({
    students: s.students.map(st => st.id===id ? {...st, present:!st.present} : st)
  })),
  updateGrade:     (id,avg) => set((s) => ({
    students: s.students.map(st => st.id===id ? {...st, avg} : st)
  })),
  markRead:        (id)=> set((s) => ({
    announcements: s.announcements.map(a => a.id===id ? {...a, read:true} : a)
  })),

  // Load real Firestore data (call after login)
  loadFromFirestore: (schoolId) => {
    const cols = ['students','classes','announcements','homework']
    cols.forEach(col => {
      const q = query(collection(db, col), where('schoolId','==',schoolId))
      onSnapshot(q, snap => {
        set({ [col]: snap.docs.map(d => ({ id:d.id, ...d.data() })) })
      })
    })
  },
}))
