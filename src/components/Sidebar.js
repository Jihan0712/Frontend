import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import './Sidebar.css'

const Sidebar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <Link to="/">
            <h1>Thesis</h1>
          </Link>
        </div>
        <div className="sidebar-user">
          {user && (
            <span>{user.email}</span>
          )}
        </div>
        <nav>
          <ul className="sidebar-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/user-info">User Information</Link></li>
            <li><Link to="/print-result">Print Result</Link></li>
            <li><Link to="/customer-view">Customer View</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
          </ul>
        </nav>
        {user && (
          <div className="sidebar-footer">
            <button onClick={handleClick} className="logout-button">Log out</button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
