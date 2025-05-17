import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="brand">
        <Link to="/">StartupConnect</Link>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/browse">Browse Startups</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/discuss">Discuss Forum</Link></li>

          {user && role === "entrepreneur" && (
            <>
              <li><Link to="/entrepreneur-dashboard">Dashboard</Link></li>
              <li><Link to="/add-startup">Add Startup</Link></li>
            </>
          )}

          {user && role === "investor" && (
            <>
              <li><Link to="/investor-Dashboard">Dashboard</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className="auth-buttons">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Log In</button>
            </Link>
            <Link to="/register">
              <button className="signup-btn">Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;