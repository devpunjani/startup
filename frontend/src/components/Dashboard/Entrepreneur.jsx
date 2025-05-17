import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import AddPitch from "./AddPitch.jsx";
import StartupManagement from "./AddStartup.jsx";

const EntrepreneurDashboard = () => {
  const { user } = useContext(AuthContext);
  const [pitches, setPitches] = useState([]);
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPitches();
    fetchStartups();
  }, []);


  // 🔹 Fetch entrepreneur's pitches
  const fetchPitches = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/pitches?userId=${user._id}');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch pitches");
      setPitches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch entrepreneur's startups
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
    <div className="dashboard-container">
      <h2>Welcome, {user?.name} (Entrepreneur)</h2>
      <p>Manage your startups and pitches here.</p>

      {/* 🔹 Add Pitch Section */}
      <AddPitch refreshPitches={fetchPitches} />

      {/* 🔹 Manage Startups Section */}
      <StartupManagement />

      {/* 🔹 Pitches List */}
      <h3>Your Pitches</h3>
      {loading && <p>Loading pitches...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {pitches.length === 0 ? (
          <p>No pitches submitted yet.</p>
        ) : (
          pitches.map((pitch) => (
            <li key={pitch._id}>
              <strong>{pitch.title}</strong>
              <em>{pitch.description}</em> <br />
              <span>Funding Amount: ${pitch.amount}</span>
              - {pitch.status} <br />
</li>

          ))
        )}
      </ul>


      {/* 🔹 Startups List */}
<h3>Your Startups</h3>
{loading && <p>Loading startups...</p>}
{error && <p className="error">{error}</p>}
<ul>
  {startups.length === 0 ? (
    <p>No startups created yet.</p>
  ) : (
    startups.map((startup) => (
      <li key={startup._id}>
        <strong>{startup.name}</strong> - {startup.industry} <br />
        <em>{startup.description}</em> <br />
        <span>Stage: {startup.stage}</span><br />
        <span>Funding Status: {startup.fundingStatus}</span><br />
        <span>Email: {startup.email}</span><br />
        <span>Website: {startup.website}</span><br />
        <span>Phone: {startup.phone}</span><br />
        <span>Founders:</span>
        <ul>
          {startup.founders.map((founder, index) => (
            <li key={index}>
              {founder.name} - {founder.role} ({founder.equity_share}% equity)
            </li>
          ))}
        </ul>
        <br />
      </li>
    ))
  )}
</ul>

    </div>
  );
};

export default EntrepreneurDashboard;