import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {year} EmployeeHub. Built for modern HR teams.</p>
      <p className="app-footer-meta">Employee Management System v1.0</p>
    </footer>
  );
}

export default Footer;
