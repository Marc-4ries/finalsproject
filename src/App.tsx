import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// REMOVE the extra "dist/"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CreateEvent from './components/CreateEvent';

const EventList = () => (
  <div className="container mt-5">
    <h2>Community Events</h2>
    <p>Event list will be displayed here.</p>
  </div>
);

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

      {/* Routing Logic - Requirement: Proper Routing */}
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
