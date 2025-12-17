import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ClientHome } from './pages/ClientHome'
import { AdminDashboard } from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientHome />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
