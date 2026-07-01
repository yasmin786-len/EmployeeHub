import Navbar from './Navbar';
import Footer from './Footer';
import './AppLayout.css';

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-content">
        <main className="app-main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
