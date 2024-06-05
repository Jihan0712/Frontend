import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage'; // Import the renamed component

function App() {
  const { user } = useAuthContext();
  const location = useLocation();
  const showSidebar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="App">
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "content-with-sidebar" : "content"}>
        <Routes>
          <Route 
            path="/" 
            element={user ? <DashboardPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </div>
  );
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
