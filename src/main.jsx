import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'; // <--- OJO AQUI
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider> {/* <--- Y AQUI */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
