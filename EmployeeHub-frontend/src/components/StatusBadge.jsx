import './StatusBadge.css';

function StatusBadge({ status }) {
  const isActive = status === 'ACTIVE';
  return (
    <span className={`status-badge ${isActive ? 'status-badge-active' : 'status-badge-inactive'}`}>
      <span className="status-badge-dot" />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

export default StatusBadge;
