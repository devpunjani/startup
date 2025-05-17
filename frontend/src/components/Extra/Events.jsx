import React from "react";
import "./Events.css";

const events = [
    {
      title: "Startup Pitch Night",
      date: "April 25, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "T-Hub, Hyderabad",
      description: "An evening where emerging startups pitch to investors and VCs. Great networking opportunity!",
    },
    {
      title: "Women in Tech Meetup",
      date: "May 2, 2025",
      time: "5:00 PM - 7:00 PM",
      location: "WeWork, Bangalore",
      description: "A gathering for women founders and tech professionals to connect, share and grow.",
    },
    {
      title: "AI & Startups Webinar",
      date: "May 10, 2025",
      time: "Online - 3:00 PM IST",
      location: "Zoom",
      description: "Free webinar exploring the impact of AI on startup scalability and investor readiness.",
    },
    {
      title: "Founders’ Roundtable",
      date: "May 15, 2025",
      time: "11:00 AM - 1:00 PM",
      location: "91Springboard, Delhi",
      description: "An invite-only gathering of early-stage founders for deep-dive discussions and feedback loops.",
    },
    {
      title: "Hack4Change: Sustainability Hackathon",
      date: "May 20, 2025",
      time: "9:00 AM - 9:00 PM",
      location: "IIT Madras Research Park",
      description: "Build tech-driven solutions to tackle climate and sustainability challenges. Cash prizes up for grabs!",
    },
    {
      title: "Investor Connect: FinTech Focus",
      date: "May 25, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Online - Invite Only",
      description: "A curated demo day for FinTech founders to connect with seed and angel investors.",
    },
    {
      title: "Build & Brand Bootcamp",
      date: "May 28, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Startup Incubation Hub, Pune",
      description: "A one-day bootcamp on product strategy, branding and go-to-market tactics for startup teams.",
    },
    {
      title: "NextGen Founders Fest",
      date: "June 1, 2025",
      time: "12:00 PM - 8:00 PM",
      location: "BITS Pilani, Goa Campus",
      description: "A student-led startup fest with panels, pitch battles, and music to celebrate entrepreneurship.",
    },
    {
      title: "XR for Impact Summit",
      date: "June 5, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "IIIT Hyderabad",
      description: "How AR/VR startups are reshaping education, healthcare and climate solutions.",
    },
    {
      title: "Social Enterprise Storytelling Workshop",
      date: "June 10, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Online - Google Meet",
      description: "Hands-on workshop to help founders craft compelling narratives for their social ventures.",
    },
  ];
  

const Event = () => {
  return (
    <div className="events-container">
      <h1 className="events-title">📅 Upcoming Events</h1>
      <div className="event-list">
        {events.map((event, index) => (
          <div className="event-post" key={index}>
            <div className="event-date">
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </div>
            <div className="event-content">
              <h2 className="event-name">{event.title}</h2>
              <p className="event-info">🕒 {event.time}</p>
              <p className="event-info">📍 {event.location}</p>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
