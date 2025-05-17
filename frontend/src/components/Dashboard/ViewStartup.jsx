import React from 'react';
import './ViewStartup.css';
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ViewStartup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [pitches, setPitches] = useState([]);
  const [loadingPitch, setLoadingPitch] = useState(true);
  const [pitchError, setPitchError] = useState(null);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        setLoadingPitch(true);
        const response = await fetch(`http://localhost:5000/api/pitches/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch pitch");
        setPitches(data); // Array of pitches
      } catch (err) {
        setPitchError(err.message);
      } finally {
        setLoadingPitch(false);
      }
    };

    if (id) fetchPitches();
  }, [id]);


  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/startups/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch startup data");
        setStartup(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStartup();
  }, [id]);

  const handleAdd = (id) => {
    navigate(`/add-pitch/${id}`);
  };


  if (loading) return <div className="loading">Loading...</div>;
  if (!startup) return <div className="error-message">Startup not found</div>;

  return (
    <div className="view-startup-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Startups
      </button>

      <div className="startup-main-content">
        {/* Left Section */}
        <div className="startup-card">
          <div className="startup-header">
            <div>
              {startup.logo && (
                <img
                  src={`http://localhost:5000/uploads/${startup.logo}`}
                  alt={`${startup.name} logo`}
                  className="startup-logo"
                />
              )}
              <h2>{startup.name}</h2>
              <p>{startup.industry} • Founded {startup.year}</p>
            </div>
            <span className="funding-stage">{startup.stage}</span>
          </div>

          <br></br>

          <div className="about-section">
            <h3>About</h3>
            <p>
              {startup.description}
            </p>

            <div className="info-grid">
              <div>
                <strong>🏢 Industry</strong>
                <p>{startup.industry}</p>
              </div>
              <div>
                <strong>👥 Team Size</strong>
                <p>{startup.founders.length} founders</p>
              </div>
              <div>
                <strong>📅 Founded</strong>
                <p>{startup.year}</p>
              </div>
              <div>
                <strong>💰 Funding</strong>
                <p>Seeking ₹{startup.fundingStatus}</p>
              </div>
            </div>

            {startup.founders && startup.founders.length > 0 && (
              <div className="founding-team-section">
                <h3>Founding Team</h3>
                <div className="team-cards">
                  {startup.founders.map((founder, index) => (
                    <div className="team-card" key={index}>
                      <div className="avatar">
                        {founder.name?.charAt(0).toUpperCase() || 'F'}
                      </div>
                      <div>
                        <strong>{founder.name}</strong>
                        <p>{founder.role}</p>
                        <p className="equity">Equity: {founder.equity_share}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pitch-details">
            {String(startup.owner) === String(user?._id) && !loadingPitch && pitches.length === 0 && (
              <div>
                <button className="add-pitch" onClick={() => handleAdd(startup._id)}>Add Pitch</button>
              </div>
            )}

            {loadingPitch ? (
              <p>Loading pitch...</p>
            ) : pitchError ? (
              <p className="error-message">{pitchError}</p>
            ) : pitches.length > 0 && (
              <div className="pitches-section">
                <h3>Pitch</h3>
                <div className="pitch-card-container">
                  {pitches.map((pitch) => (
                    <div key={pitch._id} className="pitch-card">
                      <h4 className="pitch-title">{pitch.title}</h4>
                      <p className="pitch-description">{pitch.description}</p>
                      <p className="pitch-amount"><strong>Amount:</strong> ₹{pitch.amount}</p>
                      <p className={`pitch-status status-${pitch.status}`}>{pitch.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Section */}
        <div className="contact-section">
          <div className="contact-card">
            <h3>Contact Information</h3>
            <p><strong>Email</strong><br />{startup.email}</p>
            <p><strong>Phone</strong><br />{startup.phone}</p>
            <p><strong>Website</strong><br /><a href={startup.website} target="_blank" rel="noreferrer">{startup.website}</a></p>
            <button className="primary-button">Contact Startup</button>
          </div>

          <div className="interested-card">
            <h3>Interested?</h3>
            <p>If you're interested in this startup, you can schedule a meeting or request more information.</p>
            <button className="primary-button">Schedule Meeting</button>
            <button className="secondary-button">Request More Info</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewStartup;
