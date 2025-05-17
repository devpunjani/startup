import React from "react";  
import "./Footer.css";  
import { Link } from "react-router-dom";  

const Footer = () => {  
  return (  
    <footer className="footer">  
      <div className="footer-left">  
        <div className="footer-brand">  
          <Link to="/">StartupConnect</Link>  
        </div>  
        <p className="footer-tagline">  
          Connecting innovative startups with visionary investors.  
        </p>  
      </div>  

      <nav>  
        <ul className="footer-links">  
          <li><Link to="/terms">Terms of Service</Link></li>  
          <li><Link to="/privacy">Privacy Policy</Link></li>  
          <li><Link to="/contact">Contact Us</Link></li>  
        </ul>  
      </nav>  

      <div className="footer-copy">  
        © 2025 StartupConnect. All rights reserved.  
      </div>  
    </footer>  
  );  
};  

export default Footer;