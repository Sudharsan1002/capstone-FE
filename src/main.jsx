import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Apiprovider } from './contexts/Apicontext.jsx'
import { Authprovider } from './contexts/Authcontext.jsx'

createRoot(document.getElementById("root")).render(
  <Router>
    <Apiprovider>
      <Authprovider>
        <App />
      </Authprovider>
    </Apiprovider>
  </Router>
);
