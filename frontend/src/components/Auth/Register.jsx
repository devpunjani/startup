import { useState, useContext } from "react";  
import { AuthContext } from "../../context/AuthContext.jsx";  
import { useNavigate } from "react-router-dom";  
import "./Register.css";  

const Register = () => {  
  const { register } = useContext(AuthContext);  
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [role, setRole] = useState("entrepreneur"); // Default role  
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setError(null);  
    setLoading(true);  

    try {  
      const res = await register(name, email, password, role);  
      if (res && res.success) {  
        alert("Registration Successful");  
        navigate("/login");  
      } else {  
        setError(res?.message || "Registration failed.");  
      }  
    } catch (err) {  
      setError("Error registering. Please try again.");  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div className="register-container">  
      <h2 className="register-heading">Register</h2>  
      <form onSubmit={handleSubmit} className="register-form">  
        <input  
          type="text"  
          placeholder="Name"  
          value={name}  
          onChange={(e) => setName(e.target.value)}  
          required  
        />  
        <input  
          type="email"  
          placeholder="Email"  
          value={email}  
          onChange={(e) => setEmail(e.target.value)}  
          required  
        />  
        <input  
          type="password"  
          placeholder="Password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          required  
        />  
        <select value={role} onChange={(e) => setRole(e.target.value)} required>  
          <option value="entrepreneur">Entrepreneur</option>  
          <option value="investor">Investor</option>  
        </select>  
        
        {error && <p className="error">{error}</p>}  
        <button type="submit" className="btn" disabled={loading}>  
          {loading ? "Registering..." : "Register"}  
        </button>  
      </form>
      <p className="register-link">  
        Already Registered ? <a href="/login">Log In</a>  
      </p>  
    </div>  
  );  
};  

export default Register;