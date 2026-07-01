import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/employees', label: 'Employees', icon: 'users' },
  { to: '/add-employee', label: 'Add Employee', icon: 'plus' },
];

const ICONS = {
  home: (
    <path d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.8 12.3c2 .2 3.7 1.8 4.2 4.4" />
    </>
  ),
  plus: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
};

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">EM</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">EmployeeHub</span>
          <span className="sidebar-brand-tag">Workforce OS</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
            }
          >
            <svg
              className="sidebar-link-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[item.icon]}
            </svg>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer-note">
        <p className="sidebar-footer-title">Need help?</p>
        <p className="sidebar-footer-text">Manage your workforce data with confidence.</p>
      </div>
    </aside>
  );
}

export default Navbar;
