import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <Link to="/">
          <h1>{user.email}</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <Link to="/">Data page</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/print-result">Print Result</Link>
              <button onClick={handleClick} className="logout-button">Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
