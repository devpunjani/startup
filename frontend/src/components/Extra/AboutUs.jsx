import React from "react";
import "./AboutUs.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About StartupConnect 🚀</h1>
        <p>Empowering Innovation. Enabling Connections. Elevating Startups.</p>
      </div>

      <div className="about-section">
        <h2>🌟 Our Vision</h2>
        <p>
          At StartupConnect, we envision a world where every idea has the opportunity to thrive.
          We aim to create a dynamic ecosystem that connects innovative entrepreneurs with visionary investors,
          mentors, and collaborators. Whether you're just getting started or scaling up, we are here to support
          your journey every step of the way.
        </p>
      </div>

      <div className="about-section">
        <h2>💼 What We Do</h2>
        <ul>
          <li>🔹 Facilitate funding by connecting startups with investors.</li>
          <li>🔹 Enable entrepreneurs to pitch their ideas seamlessly.</li>
          <li>🔹 Provide a rich dashboard for investors to track and manage portfolios.</li>
          <li>🔹 Host events and workshops to fuel entrepreneurial growth.</li>
          <li>🔹 Build a thriving community forum for discussion, feedback, and mentorship.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🤝 Who We Serve</h2>
        <p>
          <strong>Entrepreneurs:</strong> Get discovered, secure funding, and grow your idea into a successful venture.<br />
          <strong>Investors:</strong> Discover promising startups, evaluate pitches, and manage investments with ease.<br />
          <strong>Mentors & Partners:</strong> Share knowledge, collaborate, and help guide the next generation of innovators.
        </p>
      </div>

      <div className="about-section">
        <h2>🔐 Why Trust Us?</h2>
        <p>
          Our platform is built with cutting-edge technology to ensure secure, efficient, and transparent interactions.
          We use JWT-based authentication, role-based access control, and encrypted storage to keep your data safe.
        </p>
      </div>

      <div className="about-section">
        <h2>📈 Our Impact</h2>
        <ul>
          <li>✅ 1000+ startups registered</li>
          <li>✅ 500+ funding rounds completed</li>
          <li>✅ 200+ investors actively supporting innovation</li>
          <li>✅ 50+ successful exit stories</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🌍 Join the Movement</h2>
        <p>
          Whether you're an ambitious founder, a seasoned investor, or a passionate innovator—StartupConnect is your platform
          to grow, connect, and make an impact. Join us today and help shape the future of entrepreneurship.
        </p>
      </div>

    </div>
  );
};

export default About;
