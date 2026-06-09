import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import ReportGenerator from './pages/ReportGenerator'
import CopyCrafter from './pages/CopyCrafter'
import Conversations from './pages/Conversations'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportGenerator />} />
        <Route path="/copy" element={<CopyCrafter />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App