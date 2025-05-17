import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./InvestorDashboard.css";

const InvestmentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pitches, setPitches] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPitches = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/pitches");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPitches(data);
    } catch (err) {
      setError("Error fetching pitches: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitches();
  }, []);

  const handleApprove = async (pitchId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/pitches/${pitchId}/approve`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Pitch approved successfully");
      setMessageType("success");
      fetchPitches();

      // Clear success message after 2 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2000);
    } catch (err) {
      setMessage("Error: " + err.message);
      setMessageType("error");
    }
  };

  const handleViewDetails = (startupId) => {
    navigate(`/startup/${startupId}`);
  };

  if (loading) {
    return (
      <div className="investor-db-container">
        <div className="investor-db-content">
          <h1 className="investor-db-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="investor-db-container">
      <div className="investor-db-content">
        <h1 className="investor-db-title">Investor Dashboard</h1>

        {message && (
          <div className={`investor-db-message${messageType === 'success' ? '-success' : ''}`}>
            {message}
          </div>
        )}
        {error && <div className="investor-db-message">{error}</div>}

        <div className="investor-db-pitch-list">
          {pitches
            .filter((pitch) => pitch.status === "pending" || pitch.status === "approved")
            .map((pitch) => (
              <div className="investor-db-pitch-card" key={pitch._id}>
                <h3 className="investor-db-pitch-title">{pitch.title}</h3>
                <p className="investor-db-pitch-text">
                  <strong>Pitch Amount:</strong> ₹{pitch.amount}
                </p>
                <p className="investor-db-pitch-text">
                  <strong>Description:</strong> {pitch.description}
                </p>
                <p className="investor-db-pitch-text">
                  <strong>Status:</strong>{" "}
                  <span className={`investor-db-status investor-db-status-${pitch.status.toLowerCase()}`}>
                    {pitch.status}
                  </span>
                </p>

                <div className="investor-db-actions">
                  {pitch.status === "pending" && (
                    <button
                      className="investor-db-button investor-db-button-approve"
                      onClick={() => handleApprove(pitch._id)}
                    >
                      Approve Pitch
                    </button>
                  )}
                  <button
                    className="investor-db-button investor-db-button-details"
                    onClick={() => handleViewDetails(pitch.startupId)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
