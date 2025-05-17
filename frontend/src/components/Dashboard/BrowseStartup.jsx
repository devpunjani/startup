import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import React from 'react';  
import './EntrepreneurDashboard.css';  

const BrowseStartup = () => {
  const { user } = useContext(AuthContext);
  const [pitches, setPitches] = useState([]);
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchStartups();
  }, []);

  const handleView = (id) => {
    navigate(`/startup/${id}`);
  }
  
  const fetchStartups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/startups/`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch startups");
      setStartups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (  
    <div className="dashboard">  

      <header className="dashboard-header">  
        <h1>Browse Startups</h1> 
      </header>  

      {loading && <p>Loading startups...</p>}
      {error && <p className="error">{error}</p>}

      <div className="cards-container"> 

      {startups.length === 0 ? (
        <p>No startups created yet.</p>
      ) : (

        startups.map((startup) => (
        <div key={startup._id} className="card">  

          {startup.logo && (
              <img
                src={`http://localhost:5000/uploads/${startup.logo}`}
                alt={`${startup.name} logo`}
                className="startup-logo"
              />
          )}

          <h2>{startup.name}</h2>  
          <p className="category">{startup.industry} • Founded {startup.year}</p>  
          <p><strong>Stage:</strong> {startup.stage}</p>  
          <p><strong>Funding:</strong> Seeking ₹{startup.fundingStatus}</p>  
          <p className="description">{startup.description}</p>  
          <button className="view-startup-btn" onClick={() => handleView(startup._id)}>View Startup</button> 
        </div>
      ))
      )}

      </div>

    </div>  
  );  
};  

export default BrowseStartup;