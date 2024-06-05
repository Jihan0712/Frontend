import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import UserInformation from './pages/UserInformation'
import PrintResult from './pages/PrintResult'
import StatisticsPage from './pages/StatisticsPage'

function App() {
  const { user } = useAuthContext()
  const location = useLocation()
  const showSidebar = location.pathname !== '/login' && location.pathname !== '/signup'

  return (
    <div className="App">
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "content-with-sidebar" : "content"}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/user-information" element={user ? <UserInformation /> : <Navigate to="/login" />} />
          <Route path="/print-result" element={user ? <PrintResult /> : <Navigate to="/login" />} />
          <Route path="/statistics" element={user ? <StatisticsPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  )
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default AppWithRouter
