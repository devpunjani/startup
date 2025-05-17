import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import { useContext } from "react";  

import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./components/Home";  
import Login from "./components/Auth/Login";  
import Register from "./components/Auth/Register";

import AboutUs from "./components/Extra/aboutus";
import ContactUs from "./components/Extra/ContactUs";
import PrivacyPolicy from "./components/Extra/PrivacyPolicy";
import TermsOfService from "./components/Extra/TermsOfService";
import Events from "./components/Extra/Events";
import Discuss from "./components/Dashboard/Discuss"

import BrowseStartup from "./components/Dashboard/BrowseStartup";
import EntrepreneurDashboard from "./components/Dashboard/EntrepreneurDashboard";
import AddStartup from "./components/Dashboard/AddStartup";
import EditStartup from "./components/Dashboard/EditStartup";
import AddPitch from "./components/Dashboard/AddPitch";  
import ViewStartup from "./components/Dashboard/ViewStartup";

import InvestorDashboard from "./components/Dashboard/InvestorDashboard";  

import AuthProvider from "./context/AuthContext";  
import { AuthContext } from "./context/AuthContext";  
import "./App.css"

import Entrepreneur from "./components/Dashboard/Entrepreneur";
  
const ProtectedRoute = ({ element, role }) => {  
  const { user } = useContext(AuthContext);  
  if (!user || user.role !== role) {  
    return <h2>Access Denied</h2>;  
  }  
  return element;  
};  

function App() {  
  return (  
      <div className="app-container">  
        <AuthProvider>  
          <Navbar />  
        
          <div className="main-content">  
            <Routes>  
              
              <Route path="/" element={<Home />} />  
              <Route path="/login" element={<Login />} />  
              <Route path="/register" element={<Register />} /> 

              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/events" element={<Events />} />   
              <Route path="/discuss" element={<Discuss />} />   
                    
              <Route path="/browse" element={<BrowseStartup />} />
              <Route path="/entrepreneur-dashboard" element={<ProtectedRoute element={<EntrepreneurDashboard />} role="entrepreneur" />} />
              <Route path="/add-startup" element={<ProtectedRoute element={<AddStartup />} role="entrepreneur" />} />
              <Route path="/add-pitch/:id" element={<ProtectedRoute element={<AddPitch />} role="entrepreneur" />} />
              <Route path="/edit/:id" element={<ProtectedRoute element={<EditStartup />} role="entrepreneur" />} />
              <Route path="/startup/:id" element={<ViewStartup />}/>
              
              <Route path="/investor-dashboard" element={<ProtectedRoute element={<InvestorDashboard />} role="investor" />} />  
                
              <Route path="/entre" element={<Entrepreneur />}/>
              
            </Routes>  
          </div>  

          <Footer />  
        </AuthProvider>  
      </div>  
)};

export default App;