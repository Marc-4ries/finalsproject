import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CreateEvent from './Components/CreateEvents';
import Contact from './Components/Contact';
import HiddenWeb from './Components/HiddenWeb';
import AdminDashboard from './Components/AdminDashboard';

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
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/events'
      );
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-5">
        Community Event Manager
      </h1>
      <div className="row">
        {events.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              No Events Available
            </div>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="col-md-4 mb-4"
            >
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body">
                  <h4 className="text-primary">
                    {event.eventName}
                  </h4>
                  <p>
                    <strong>Location:</strong>{" "}
                    {event.location}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {event.date}
                  </p>
                  <p>
                    {event.description}
                  </p>
                </div>
                <div className="card-footer">
                  <small>
                    Organized by {event.organizer}
                  </small>
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
          <Link
            className="navbar-brand fw-bold"
            to="/"
          >
            Event Manager
          </Link>
          <div className="navbar-nav">
            <Link
              className="nav-link"
              to="/"
            >
              EventList
            </Link>
            <Link
              className="nav-link"
              to="/create"
            >
              Create Event
            </Link>

            <Link
              className="nav-link"
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="nav-link"
              to="/hiddenweb"
            >
              HiddenWeb
            </Link>

            <Link
              className="nav-link"
              to="/admin"
            >
              AdminDashboard
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<EventList />}
        />
        <Route
          path="/create"
          element={<CreateEvent />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/hiddenweb"
          element={<HiddenWeb />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;


