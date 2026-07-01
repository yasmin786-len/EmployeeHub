import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Avatar from '../components/Avatar';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import { getEmployeeById, deleteEmployee } from '../services/employeeService';
import { formatCurrency, formatDate, formatDateTime } from '../services/formatters';
import './ViewEmployee.css';

function DetailRow({ label, value, mono }) {
  return (
    <div className="detail-row">
      <span className="detail-row-label">{label}</span>
      <span className={`detail-row-value ${mono ? 'detail-row-mono' : ''}`}>{value}</span>
    </div>
  );
}

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [flashMessage, setFlashMessage] = useState(location.state?.flashMessage || '');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getEmployeeById(id)
      .then((data) => {
        if (isMounted) setEmployee(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Failed to load employee.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => setFlashMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    deleteEmployee(id)
      .then(() => {
        navigate('/employees', {
          state: { flashMessage: `${employee.firstName} ${employee.lastName} was removed successfully.` },
        });
      })
      .catch((err) => {
        setError(err.message || 'Failed to delete employee.');
        setIsDeleteModalOpen(false);
      })
      .finally(() => setIsDeleting(false));
  };

  if (isLoading) return <Loader fullPage label="Loading employee details…" />;

  if (error && !employee) {
    return (
      <div className="page">
        <div className="state-block">
          <div className="state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <p className="state-title">Employee not found</p>
          <p className="state-text">{error}</p>
          <Link to="/employees" className="btn btn-primary">Back to Employees</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">Workforce</span>
          <h1 className="page-title">Employee Profile</h1>
        </div>
        <div className="view-employee-header-actions">
          <Link to="/employees" className="btn btn-ghost">Back</Link>
          <Link to={`/edit-employee/${employee.id}`} className="btn btn-secondary">Edit</Link>
          <button type="button" className="btn btn-danger" onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </button>
        </div>
      </div>

      {flashMessage && <div className="inline-banner inline-banner-success">{flashMessage}</div>}
      {error && <div className="inline-banner inline-banner-error">{error}</div>}

      <div className="view-employee-grid">
        <div className="panel panel-padded view-employee-profile-card">
          <Avatar
            firstName={employee.firstName}
            lastName={employee.lastName}
            department={employee.department}
            size="lg"
          />
          <h2 className="view-employee-name">{employee.firstName} {employee.lastName}</h2>
          <p className="view-employee-role">{employee.designation}</p>
          <StatusBadge status={employee.status} />

          <div className="view-employee-id-chip">Employee ID #{employee.id}</div>
        </div>

        <div className="panel panel-padded view-employee-details-card">
          <h3 className="view-employee-section-title">Contact Information</h3>
          <DetailRow label="Email Address" value={employee.email} />
          <DetailRow label="Phone Number" value={employee.phone} mono />

          <h3 className="view-employee-section-title view-employee-section-title-spaced">Employment Details</h3>
          <DetailRow label="Department" value={employee.department} />
          <DetailRow label="Designation" value={employee.designation} />
          <DetailRow label="Salary" value={formatCurrency(employee.salary)} mono />
          <DetailRow label="Joining Date" value={formatDate(employee.joiningDate)} />
          <DetailRow label="Status" value={<StatusBadge status={employee.status} />} />
          <DetailRow label="Record Created" value={formatDateTime(employee.createdAt)} mono />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete this employee?"
        message={`This will permanently remove ${employee.firstName} ${employee.lastName} from your records. This action cannot be undone.`}
        confirmLabel="Delete"
        isDanger
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}

export default ViewEmployee;
