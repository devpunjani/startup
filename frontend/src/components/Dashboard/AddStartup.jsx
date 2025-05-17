import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './AddStartup.css';  // Import the CSS file  
import { useNavigate } from "react-router-dom";

const AddStartup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [year, setYear] = useState("");
  const [stage, setStage] = useState("");
  const [fundingStatus, setFundingStatus] = useState("");
  const [logo, setLogo] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const [logoFileName, setLogoFileName] = useState(''); // State for displaying chosen file name  

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoFileName(file ? file.name : ''); // Update file name state  
  };

  const [founders, setFounders] = useState([{ name: "", role: "", equity_share: "" }]);

  const handleFounderChange = (index, field, value) => {
    const updatedFounders = [...founders];
    updatedFounders[index][field] = value;
    setFounders(updatedFounders);
  };

  const addFounder = () => {
    setFounders([...founders, { name: "", role: "", equity_share: "" }]);
  };

  const removeFounder = (index) => {
    const updatedFounders = [...founders];
    updatedFounders.splice(index, 1);
    setFounders(updatedFounders);
  };

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleAddStartup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !user._id) {
      setError("User ID not found. Please login again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("entrepreneurId", user._id);
      formData.append("name", name);
      formData.append("industry", industry);
      formData.append("year", year);
      formData.append("description", description);
      formData.append("stage", stage);
      formData.append("fundingStatus", fundingStatus);
      formData.append("logo", logo);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("website", website);
      formData.append("founders", JSON.stringify(founders));

      const response = await fetch("http://localhost:5000/api/startups/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add startup");

      setSuccess("Startup added successfully!");

      // Reset all fields  
      setName("");
      setIndustry("");
      setYear("");
      setDescription("");
      setStage("");
      setFundingStatus("");
      setLogo(null);
      setEmail("");
      setPhone("");
      setWebsite("");
      setFounders([{ name: "", role: "", equity_share: "" }]);

      navigate("/entrepreneur-dashboard");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-startup-container">
      <h2>Add Startup</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleAddStartup}>
        <input
          type="text"
          placeholder="Startup Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Founding Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Funding Stage (e.g., Seed, Series A)"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Funding Status (INR)"
          value={fundingStatus}
          onChange={(e) => setFundingStatus(e.target.value)}
        />

        <label htmlFor="logo-upload" style={{ display: 'block', color: '#666', margin: '1px 6px', marginTop: '-5px' }}>Upload Logo</label>

        <input
          type="file"
          accept="image/*"
          id="logo-upload"
          onChange={handleLogoChange}
          style={{ display: 'block' }}
        />
        <p style={{ color: '#666', fontSize: '12px', marginTop: '-10px', marginBottom: '5px', marginLeft: '1px' }}>
          Please upload a logo in JPG or PNG format.
        </p>
        {logoFileName && (
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '5px', marginLeft: '1px' }}>
            Selected File: {logoFileName}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        {/* Dynamic Founders Section */}
        <div>
          <label>Founders:</label>
          {founders.map((founder, index) => (
            <div key={index} className="founder-container">
              <input
                type="text"
                placeholder="Founder Name"
                value={founder.name}
                onChange={(e) => handleFounderChange(index, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Role"
                value={founder.role}
                onChange={(e) => handleFounderChange(index, "role", e.target.value)}
              />
              <input
                type="number"
                placeholder="Equity Share (%)"
                value={founder.equity_share}
                min="0"
                max="100"
                onChange={(e) => handleFounderChange(index, "equity_share", e.target.value)}
              />
              {founders.length > 1 && (
                <button type="button" className="remove-founder-button" onClick={() => removeFounder(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFounder}>Add Founder</button>
        </div>
        <br />
        <button type="submit">Add Startup</button>
      </form>
    </div>
  );
};

export default AddStartup;