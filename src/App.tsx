import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateEvent from './components/CreateEvent';


interface EventData {
  _id: string;
  eventName: string;
  location: string;
  date: string;
  organizer: string;
  description: string;
}

const EventList = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(err => console.error("Could not fetch events", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Community Events</h2>
      <div className="row">
        {events.length === 0 ? (
          <div className="col-12">
            <p className="alert alert-info">No events yet! Use the "Add New Event" tab to create one.</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{event.eventName}</h5>
                  <p className="card-text"><strong> Location:</strong> {event.location}</p>
                  <p className="card-text"><strong> Date:</strong> {event.date}</p>
                  <p className="card-text">{event.description}</p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <small className="text-muted">Organized by {event.organizer}</small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Event Manager</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">View Events</Link>
            <Link className="nav-link" to="/create">Add New Event</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;


