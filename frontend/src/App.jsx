import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
// import Dashboard from './pages/Dashboard'
// import CopyCrafter from './pages/CopyCrafter'
// import ReportGenerator from './pages/ReportGenerator'
// import Conversations from './pages/Conversations'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onEnterApp={() => {}} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/copy" element={<CopyCrafter />} /> */}
        {/* <Route path="/report" element={<ReportGenerator />} /> */}
        {/* <Route path="/conversations" element={<Conversations />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App