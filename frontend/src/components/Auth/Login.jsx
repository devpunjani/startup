import { useState, useContext } from "react";  
import { AuthContext } from "../../context/AuthContext.jsx";  
import { useNavigate } from "react-router-dom";  
import "./Login.css";

const Login = () => {  
  const { login } = useContext(AuthContext);  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setError(null);  
    setLoading(true);  

    try {  
      const res = await login(email, password);  
      if (res && res.role) {  
        // Navigate based on user role  
        if (res.role === "entrepreneur") {  
          navigate("/entrepreneur-dashboard");  
        } else if (res.role === "investor") {  
          navigate("/investor-dashboard");  
        } else {  
          setError("Unauthorized role.");  
        }  
      } else {  
        setError("Invalid email or password.");  
      }  
    } catch (err) {  
      setError("Login failed. Try again.");  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div className="login-container">  
      <h2 className="login-heading">Login</h2>  
      <form onSubmit={handleSubmit} className="login-form">  
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
        
        {error && <p className="error">{error}</p>}  
        <button type="submit" className="btn" disabled={loading}>  
          {loading ? "Logging in..." : "Login"}  
        </button>  
      </form>  
      <p className="register-link">  
        Not Registered ? <a href="/register">Register</a>  
      </p>  
    </div>  
  );  
};  

export default Login;