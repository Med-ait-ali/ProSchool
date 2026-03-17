// ============================================================
// PROSCHOOL — CENTRAL CONFIGURATION FILE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// White-label: Edit ONLY this file to fully rebrand for
// any new client. Logo, colors, name — all in one place.
// ============================================================

const schoolSettings = {
  // ── Identity ─────────────────────────────────────────────
  name:        'ProSchool',
  tagline:     'Excellence in Education',
  logoText:    'PS',           // Initials shown if no logo image
  logoImage:   null,           // e.g. '/logo.png' — place in /public
  address:     'Casablanca, Morocco',
  phone:       '+212 522 000 000',
  email:       'contact@proschool.ma',
  website:     'https://proschool.ma',

  // ── Branding / Theme ─────────────────────────────────────
  theme: {
    primary:    '#38bdf8',   // Main accent — neon sky blue
    accent:     '#22d3ee',   // Secondary accent — cyan
    primaryHover: '#0ea5e9',
    gradient:   'from-sky-400 to-cyan-400',
  },

  // ── Features Toggle (per client customization) ───────────
  features: {
    financials:        true,   // Financial dashboard + invoicing
    announcements:     true,   // Internal ticketing system
    homeworkUpload:    true,   // Teacher → Parent homework flow
    parentPortal:      true,   // Parent dashboard access
    attendanceTracking: true,  // Daily attendance
    gradeManagement:   true,   // Grade entry by teachers
  },

  // ── Academic Year ─────────────────────────────────────────
  academicYear:  '2025–2026',
  currency:      'MAD',
  termFee:       2400,

  // ── Footer / Credits ──────────────────────────────────────
  footerCredit:  'Created By Med Ait Ali Oulhoucien',
  year:          2026,
}

export default schoolSettings
