import React, { useState } from 'react';  

const ContactUs = () => {  
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');  
  const [message, setMessage] = useState('');  
  const [success, setSuccess] = useState(null);  
  const [error, setError] = useState(null);  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    setSuccess(null);  
    setError(null);  

    // Handle form submission, for example, send an email or API request  
    if (name && email && message) {  
      setSuccess('Your message has been sent successfully!');  
      // Reset form fields  
      setName('');  
      setEmail('');  
      setMessage('');  
    } else {  
      setError('Please fill in all fields.');  
    }  
  };  

  return (  
    <div style={{ maxWidth: '30%', color:'black', margin: '2% auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>  
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Contact Us</h1>  
      {error && <p style={{ color: 'red' }}>{error}</p>}  
      {success && <p style={{ color: 'green' }}>{success}</p>}  
      <form onSubmit={handleSubmit}>  
        <input  
          type="text"  
          placeholder="Your Name"  
          value={name}  
          onChange={(e) => setName(e.target.value)}  
          required  
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}  
        />  
        <input  
          type="email"  
          placeholder="Your Email"  
          value={email}  
          onChange={(e) => setEmail(e.target.value)}  
          required  
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}  
        />  
        <textarea  
          placeholder="Your Message"  
          value={message}  
          onChange={(e) => setMessage(e.target.value)}  
          required  
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}  
        />  
        <button type="submit" style={{ padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', width: '100%' }}>  
          Send Message  
        </button>  
      </form>  
    </div>  
  );  
};  

export default ContactUs;