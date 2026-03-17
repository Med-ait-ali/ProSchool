import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#0e1e34',
          color: '#e2e8f0',
          border: '1px solid #1a3050',
          borderRadius: '8px',
          fontSize: '13px',
        },
        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}
    />
  </React.StrictMode>,
)
