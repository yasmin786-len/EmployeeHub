import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <span className="not-found-code">404</span>
      <h1 className="not-found-title">This page wandered off</h1>
      <p className="not-found-text">
        The page you're looking for doesn't exist or may have been moved.
        Let's get you back to managing your team.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">Go to Dashboard</Link>
        <Link to="/employees" className="btn btn-secondary">View Employees</Link>
      </div>
    </div>
  );
}

export default NotFound;
