import './Loader.css';

function Loader({ label = 'Loading…', fullPage = false }) {
  return (
    <div className={`loader-wrap${fullPage ? ' loader-wrap-fullpage' : ''}`}>
      <span className="loader-spinner" aria-hidden="true" />
      <p className="loader-label">{label}</p>
    </div>
  );
}

export default Loader;
