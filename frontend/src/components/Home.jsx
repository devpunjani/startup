import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      // If not logged in, redirect to login with the intended path as state
      navigate('/login', { state: { from: path } });
      return;
    }

    // If logged in, check user type and redirect accordingly
    if (path === '/entrepreneur-dashboard' && user.role === 'entrepreneur') {
      navigate('/entrepreneur-dashboard');
    } else if (path === '/investor-dashboard' && user.role === 'investor') {
      navigate('/investor-dashboard');
    } else {
      // If user type doesn't match, show appropriate message
      alert(`You need to be logged in as ${path === '/entrepreneur-dashboard' ? 'an entrepreneur' : 'an investor'} to access this page.`);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">

        <div className="home-text">
          <h1>Welcome to<br></br>Startup Connect 🚀</h1>
          <p>
            Connecting entrepreneurs with investors to bring ideas to life.
          </p>
          <div className="button-group">
            <button
              className="btn primary"
              onClick={() => handleNavigation('/entrepreneur-dashboard')}
            >
              Apply for Funding
            </button>
            <button
              className="btn secondary"
              onClick={() => handleNavigation('/investor-dashboard')}
            >
              Become an Investor
            </button>
          </div>
        </div>

        <div className="home-image">
          <img src="/startup.jpg" alt="Startup Illustration" />
        </div>

      </div>
    </div>
  );
};

export default Home;