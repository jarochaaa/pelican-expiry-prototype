import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import AuditsScreen from './screens/AuditsScreen'
import TaskDetailScreen from './screens/TaskDetailScreen'
import ProductInputScreen from './screens/ProductInputScreen'
import LanguageScreen from './screens/LanguageScreen'

function App() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <PhoneFrame>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/audits" replace />} />
            <Route path="/audits" element={<AuditsScreen />} />
            <Route path="/language" element={<LanguageScreen />} />
            <Route path="/tasks/:taskId" element={<TaskDetailScreen />} />
            <Route path="/tasks/:taskId/products/:productId" element={<ProductInputScreen />} />
          </Routes>
        </HashRouter>
      </PhoneFrame>
    </div>
  )
}

export default App
