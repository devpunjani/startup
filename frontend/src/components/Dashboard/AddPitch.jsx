import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AddPitch.css"

const AddPitch = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !user._id) {
      setError("User ID not found. Please login again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/pitches/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          startupId:id,
          title,
          description,
          amount,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit pitch");

      setSuccess("Pitch submitted successfully!");
      setTitle("");
      setDescription("");
      setAmount("");

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pitch-form-container">
  <h2 className="pitch-form-title">Submit a Pitch</h2>

  {error && <p className="pitch-error">{error}</p>}
  {success && <p className="pitch-success">{success}</p>}

  <form onSubmit={handleSubmit} className="pitch-form">
    <input
      type="text"
      placeholder="Pitch Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="pitch-input"
    />
    <textarea
      placeholder="Pitch Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="pitch-textarea"
    />
    <input
      type="number"
      placeholder="Funding Amount (INR)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      required
      className="pitch-input"
    />
    <button type="submit" className="pitch-submit-btn">Submit Pitch</button>
  </form>
</div>

  );
};

export default AddPitch;