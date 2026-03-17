<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react"/>
  <img src="https://img.shields.io/badge/Firebase-Free_Tier-ff6d00?style=flat-square&logo=firebase"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss"/>
  <img src="https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
</p>

<h1 align="center">🏫 ProSchool — Premium School Management SaaS</h1>

<p align="center">
  A production-ready, white-label school management platform.<br/>
  Built with React · Firebase (100% free tier) · Tailwind CSS · Vite
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏛️ **Admin Dashboard** | Students, classes, financials, announcements |
| 👨‍🏫 **Teacher Portal** | Attendance tracking, grade entry, homework upload |
| 👪 **Parent Portal** | Child progress, fee status, real-time messages |
| 🔐 **RBAC Auth** | Firebase Auth + role-based route protection |
| 💰 **Financial Dashboard** | Fee tracking, invoice generation (printable) |
| 📢 **Internal Messaging** | Real-time announcements — replaces WhatsApp |
| 📚 **Homework Flow** | Teacher uploads → parent notified instantly |
| 🎨 **White-Label Ready** | Rebrand entire app in `config/schoolSettings.js` |
| 📱 **Mobile First** | Fully responsive on all screen sizes |
| 🆓 **100% Free Stack** | Firebase Spark Plan · GitHub Pages · Netlify |

---

## 🆓 Free Tier — No Credit Card Required

| Service | Free Limit | Usage |
|---|---|---|
| **Firebase Auth** | Unlimited users | Authentication |
| **Firestore** | 50K reads/day · 20K writes/day | Database |
| **Firebase Storage** | 5 GB | Homework PDFs |
| **GitHub Pages** | Unlimited | Hosting (static) |
| **Netlify** | 100 GB bandwidth/month | Hosting (recommended) |

> ✅ A school with 500 students will use ~5% of the free quota.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/proschool.git
cd proschool
npm install
```

### 2. Firebase Setup (5 minutes, 100% free)
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. **Create Project** → Give it a name
3. **Build → Authentication** → Enable Email/Password
4. **Build → Firestore Database** → Create in production mode
5. **Build → Storage** → Get started
6. **Project Settings → Your Apps** → Add Web App → Copy config

```bash
cp .env.example .env.local
# Paste your Firebase config values into .env.local
```

### 3. Deploy Security Rules
```bash
npm install -g firebase-tools
firebase login
firebase init      # Select: Firestore, Storage, Hosting
firebase deploy --only firestore:rules,storage:rules
```

### 4. Create Your First Admin User
In Firebase Console → Authentication → Add user  
Then in Firestore → `users` collection → Add document:
```json
{
  "uid": "YOUR_FIREBASE_UID",
  "name": "School Admin",
  "email": "admin@yourschool.com",
  "role": "admin",
  "schoolId": "school_001"
}
```

### 5. Run Locally
```bash
npm run dev
# → http://localhost:5173/proschool
```

---

## 🌐 Deploy to GitHub Pages (Free)

```bash
# 1. In vite.config.js — base is already set to '/proschool/'
# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Add to package.json scripts (already included):
#    "deploy": "npm run build && gh-pages -d dist"

# 4. Deploy
npm run deploy
# → https://YOUR_USERNAME.github.io/proschool/
```

---

## 🌐 Deploy to Netlify (Recommended — Better Performance)

1. Push to GitHub
2. [netlify.com](https://netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables from `.env.local`
6. Deploy → Done!

---

## 🎨 White-Label Customization

Edit **one file** to fully rebrand for a new client:

```js
// src/config/schoolSettings.js
const schoolSettings = {
  name:      'Al Nour Academy',     // ← School name
  tagline:   'Illuminating Futures',
  logoText:  'AN',                  // ← Initials (or use logoImage)
  theme: {
    primary:  '#10b981',            // ← Brand color (any hex)
    gradient: 'from-emerald-400 to-teal-400',
  },
  currency:  'SAR',                 // ← Currency
  footerCredit: 'Created By Med Ait Ali Oulhoucien',
}
```

---

## 📁 Project Structure

```
src/
├── config/schoolSettings.js    ← White-label config
├── context/AuthContext.jsx     ← Auth + role state
├── routes/ProtectedRoute.jsx   ← RBAC guard
├── services/                   ← Firebase services
│   ├── firebase.js
│   ├── auth.service.js
│   ├── students.service.js
│   ├── announcements.service.js
│   └── homework.service.js
├── layouts/DashboardLayout.jsx
├── components/
│   ├── ui/index.jsx            ← Reusable UI components
│   ├── Sidebar.jsx
│   └── Footer.jsx
└── pages/
    ├── auth/     → Login, Unauthorized
    ├── admin/    → Overview, Students, Classes, Financials, Announcements
    ├── teacher/  → Overview, Attendance, Grades, Homework
    └── parent/   → Home, Progress, Fees, Messages
```

---

## 🗄️ Firestore Schema

```
schools/{schoolId}
users/{userId}          → role: admin | teacher | parent
students/{studentId}    → grades, attendance, fees
classes/{classId}       → teacherId, studentIds
homework/{hwId}         → attachmentUrl, notifyParents
announcements/{annId}   → type: info | urgent | homework
```

---

## 📜 License

MIT © 2026 ProSchool — Created By **Med Ait Ali Oulhoucien**

---

<p align="center">
  Built with ❤️ for schools across Morocco and beyond.<br/>
  <strong>Star ⭐ this repo if it helped you!</strong>
</p>
