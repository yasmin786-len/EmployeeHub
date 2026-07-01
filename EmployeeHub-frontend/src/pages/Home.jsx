import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Avatar from '../components/Avatar';
import StatusBadge from '../components/StatusBadge';
import { getAllEmployees } from '../services/employeeService';
import { formatCurrency, formatDate } from '../services/formatters';
import './Home.css';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getAllEmployees()
      .then((data) => {
        if (isMounted) setEmployees(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Failed to load dashboard data.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalEmployees = employees.length;
  const activeCount = employees.filter((e) => e.status === 'ACTIVE').length;
  const inactiveCount = totalEmployees - activeCount;
  const totalPayroll = employees.reduce((sum, e) => sum + Number(e.salary || 0), 0);
  const departmentCount = new Set(employees.map((e) => e.department)).size;
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 5);

  if (isLoading) return <Loader fullPage label="Loading your dashboard…" />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">Dashboard</span>
          <h1 className="page-title">Welcome back 👋</h1>
          <p className="page-subtitle">Here's what's happening across your workforce today.</p>
        </div>
        <Link to="/add-employee" className="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Employee
        </Link>
      </div>

      {error && <div className="inline-banner inline-banner-error">{error}</div>}

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-indigo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
              <circle cx="17" cy="8.5" r="2.4" /><path d="M15.8 12.3c2 .2 3.7 1.8 4.2 4.4" />
            </svg>
          </div>
          <p className="stat-card-value">{totalEmployees}</p>
          <p className="stat-card-label">Total Employees</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4 12.5 5 5L20 7" />
            </svg>
          </div>
          <p className="stat-card-value">{activeCount}</p>
          <p className="stat-card-label">Active</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M9 12h6" />
            </svg>
          </div>
          <p className="stat-card-value">{inactiveCount}</p>
          <p className="stat-card-label">Inactive</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M8 14h2" />
            </svg>
          </div>
          <p className="stat-card-value">{departmentCount}</p>
          <p className="stat-card-label">Departments</p>
        </div>
      </div>

      <div className="panel panel-padded payroll-banner">
        <div>
          <p className="page-subtitle" style={{ marginTop: 0 }}>Total Monthly Payroll</p>
          <p className="payroll-banner-value">{formatCurrency(totalPayroll)}</p>
        </div>
        <Link to="/employees" className="btn btn-secondary">View all employees</Link>
      </div>

      <div className="panel">
        <div className="panel-padded panel-section-header">
          <h2 className="panel-section-title">Recently Joined</h2>
          <Link to="/employees" className="panel-section-link">See all →</Link>
        </div>

        {recentEmployees.length === 0 ? (
          <div className="state-block">
            <div className="state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
              </svg>
            </div>
            <p className="state-title">No employees yet</p>
            <p className="state-text">Add your first employee to see them appear here.</p>
            <Link to="/add-employee" className="btn btn-primary">Add Employee</Link>
          </div>
        ) : (
          <ul className="recent-list">
            {recentEmployees.map((emp) => (
              <li key={emp.id} className="recent-list-item">
                <Link to={`/employee/${emp.id}`} className="recent-list-link">
                  <Avatar firstName={emp.firstName} lastName={emp.lastName} department={emp.department} size="sm" />
                  <div className="recent-list-text">
                    <span className="recent-list-name">{emp.firstName} {emp.lastName}</span>
                    <span className="recent-list-meta">{emp.designation} · {emp.department}</span>
                  </div>
                  <span className="recent-list-date">{formatDate(emp.joiningDate)}</span>
                  <StatusBadge status={emp.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
