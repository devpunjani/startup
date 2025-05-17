import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import React from 'react';  
import './EntrepreneurDashboard.css';  

const EntrepreneurDashboard = () => {
  const { user } = useContext(AuthContext);
  const [pitches, setPitches] = useState([]);
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchStartups();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting startup with ID:", id);
  
    if (!window.confirm("Are you sure you want to delete this startup?")) return;
  
    try {
      const res = await fetch(`http://localhost:5000/api/startups/delete/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete startup");
      }
  
      alert("Startup deleted successfully");
      fetchStartups();
  
    } catch (err) {
      console.error("Error deleting startup:", err);
      alert("Failed to delete the startup.");
    }
  };
  
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/startup/${id}`);
  }
  
  const fetchStartups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/startups?userId=${user._id}`);
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
        <h1>Entrepreneur Dashboard</h1> 
        <button className="add-startup-btn" onClick={() => window.location.href = "/add-startup"}>+ Add Startup</button>  
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
          <div className="actions">  
            <button className="edit-startup-btn" onClick={() => handleEdit(startup._id)}>Edit Startup</button>
            <button className="delete-startup-btn" onClick={() => handleDelete(startup._id)}>Delete Startup</button>
          </div>
        </div>
      ))
      )}

      </div>

    </div>  
  );  
};  

export default EntrepreneurDashboard;