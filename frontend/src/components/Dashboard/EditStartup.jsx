import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './AddStartup.css'; 

const EditStartup = () => {
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

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

  const validateForm = () => {
    const errors = {};
    if (!startup.name) errors.name = "Startup name is required";
    if (!startup.industry) errors.industry = "Industry is required";
    if (!startup.description) errors.description = "Description is required";
    if (!startup.year) errors.year = "Founding year is required";
    if (startup.founders.length === 0) errors.founders = "At least one founder is required";
    startup.founders.forEach((founder, index) => {
      if (!founder.name) errors[`founderName${index}`] = "Founder name is required";
      if (!founder.role) errors[`founderRole${index}`] = "Founder role is required";
      if (!founder.equity_share) errors[`founderEquity${index}`] = "Equity share is required";
      if (founder.equity_share < 0 || founder.equity_share > 100) {
        errors[`founderEquity${index}`] = "Equity share must be between 0 and 100";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditStartup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFormErrors({});
    if (!user || !user._id) {
      setError("User ID not found. Please login again.");
      return;
    }
    if (!validateForm()) return;
  
    try {
      const formData = new FormData();
      formData.append("entrepreneurId", user._id);
      formData.append("name", startup.name);
      formData.append("industry", startup.industry);
      formData.append("year", startup.year);
      formData.append("description", startup.description);
      formData.append("stage", startup.stage);
      formData.append("fundingStatus", startup.fundingStatus);
      formData.append("email", startup.email);
      formData.append("phone", startup.phone);
      formData.append("website", startup.website);
      formData.append("founders", JSON.stringify(startup.founders)); // Send founders as a stringified array
      if (startup.logo instanceof File) {
        formData.append("logo", startup.logo);
      }
  
      const response = await fetch(`http://localhost:5000/api/startups/edit/${id}`, {
        method: "PUT",
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to edit startup");
  
      setSuccess("Startup edited successfully!");
      setTimeout(() => navigate("/entrepreneur-dashboard"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  
  

  const handleFounderChange = (index, field, value) => {
    const updatedFounders = [...startup.founders];
    updatedFounders[index][field] = value;
    setStartup({ ...startup, founders: updatedFounders });
  };
  

  const addFounder = () => {
    setStartup({
      ...startup,
      founders: [...startup.founders, { name: "", role: "", equity_share: 0 }]
    });
  };

  const removeFounder = (index) => {
    const updatedFounders = startup.founders.filter((_, i) => i !== index);
    setStartup({ ...startup, founders: updatedFounders });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!startup) return <div className="error-message">Startup not found</div>;

  

  return (
    <div className="add-startup-container">
      <h2>Edit Startup</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleEditStartup}>
        <input
          type="text"
          placeholder="Startup Name"
          value={startup.name}
          onChange={(e) => setStartup({ ...startup, name: e.target.value })}
          className={formErrors.name ? "error-input" : ""}
        />
        {formErrors.name && <span className="error-text">{formErrors.name}</span>}

        <input
          type="text"
          placeholder="Industry"
          value={startup.industry}
          onChange={(e) => setStartup({ ...startup, industry: e.target.value })}
          className={formErrors.industry ? "error-input" : ""}
        />
        {formErrors.industry && <span className="error-text">{formErrors.industry}</span>}

        <input
          type="text"
          placeholder="Founding Year"
          value={startup.year}
          onChange={(e) => setStartup({ ...startup, year: e.target.value })}
          className={formErrors.year ? "error-input" : ""}
        />
        {formErrors.year && <span className="error-text">{formErrors.year}</span>}

        <textarea
          placeholder="Description"
          value={startup.description}
          onChange={(e) => setStartup({ ...startup, description: e.target.value })}
          className={formErrors.description ? "error-input" : ""}
        />
        {formErrors.description && <span className="error-text">{formErrors.description}</span>}

        <input
          type="text"
          placeholder="Funding Stage"
          value={startup.stage}
          onChange={(e) => setStartup({ ...startup, stage: e.target.value })}
        />

        <input
          type="text"
          placeholder="Funding Status (INR)"
          value={startup.fundingStatus}
          onChange={(e) => setStartup({ ...startup, fundingStatus: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setStartup({ ...startup, logo: e.target.files[0] })}
        />

        <input
          type="email"
          placeholder="Email"
          value={startup.email}
          onChange={(e) => setStartup({ ...startup, email: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Phone"
          value={startup.phone}
          onChange={(e) => setStartup({ ...startup, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="Website"
          value={startup.website}
          onChange={(e) => setStartup({ ...startup, website: e.target.value })}
        />

        <div>
          <label>Founders:</label>
          {formErrors.founders && <span className="error-text">{formErrors.founders}</span>}

          {startup.founders.map((founder, index) => (
            <div key={index} className="founder-container">
              <input
                type="text"
                placeholder="Founder Name"
                value={founder.name}
                onChange={(e) => handleFounderChange(index, "name", e.target.value)}
                className={formErrors[`founderName${index}`] ? "error-input" : ""}
              />
              {formErrors[`founderName${index}`] && (
                <span className="error-text">{formErrors[`founderName${index}`]}</span>
              )}

              <input
                type="text"
                placeholder="Role"
                value={founder.role}
                onChange={(e) => handleFounderChange(index, "role", e.target.value)}
                className={formErrors[`founderRole${index}`] ? "error-input" : ""}
              />
              {formErrors[`founderRole${index}`] && (
                <span className="error-text">{formErrors[`founderRole${index}`]}</span>
              )}

              <input
                type="number"
                placeholder="Equity Share (%)"
                value={founder.equity_share}
                min="0"
                max="100"
                onChange={(e) =>
                  handleFounderChange(index, "equity_share", parseInt(e.target.value))
                }
                className={formErrors[`founderEquity${index}`] ? "error-input" : ""}
              />
              {formErrors[`founderEquity${index}`] && (
                <span className="error-text">{formErrors[`founderEquity${index}`]}</span>
              )}

              {startup.founders.length > 1 && (
                <button
                  type="button"
                  className="remove-founder-button"
                  onClick={() => removeFounder(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addFounder}>Add Founder</button>
        </div>
        <br />
        <button type="submit">Update Startup</button>
      </form>
    </div>
  );
};

export default EditStartup;