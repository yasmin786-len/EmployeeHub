import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCard from '../components/EmployeeCard';
import Loader from '../components/Loader';
import ConfirmationModal from '../components/ConfirmationModal';
import { getAllEmployees, searchEmployees, deleteEmployee } from '../services/employeeService';
import './Employees.css';

function Employees() {
  const location = useLocation();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.flashMessage || '');
  const [keyword, setKeyword] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Clear the flash message from history state so a refresh/back-nav doesn't re-show it,
  // and auto-dismiss it after a few seconds.
  useEffect(() => {
    if (location.state?.flashMessage) {
      navigate(location.pathname, { replace: true, state: {} });
      const timer = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployees = useCallback(() => {
    setIsLoading(true);
    setError('');
    getAllEmployees()
      .then(setEmployees)
      .catch((err) => setError(err.message || 'Failed to load employees.'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearch = (term) => {
    setKeyword(term);
    setIsSearching(true);
    setError('');
    searchEmployees(term)
      .then(setEmployees)
      .catch((err) => setError(err.message || 'Search failed.'))
      .finally(() => setIsSearching(false));
  };

  const handleDeleteRequest = (employee) => {
    setEmployeeToDelete(employee);
  };

  const handleDeleteConfirm = () => {
    if (!employeeToDelete) return;
    setIsDeleting(true);
    deleteEmployee(employeeToDelete.id)
      .then(() => {
        setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete.id));
        setSuccessMessage(`${employeeToDelete.firstName} ${employeeToDelete.lastName} was removed successfully.`);
        setEmployeeToDelete(null);
        setTimeout(() => setSuccessMessage(''), 4000);
      })
      .catch((err) => {
        setError(err.message || 'Failed to delete employee.');
        setEmployeeToDelete(null);
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">Workforce</span>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">
            {employees.length} {employees.length === 1 ? 'employee' : 'employees'} on record
          </p>
        </div>
        <Link to="/add-employee" className="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Employee
        </Link>
      </div>

      {successMessage && <div className="inline-banner inline-banner-success">{successMessage}</div>}
      {error && <div className="inline-banner inline-banner-error">{error}</div>}

      <div className="employees-toolbar">
        <SearchBar value={keyword} onSearch={handleSearch} placeholder="Search by name, email, department…" />
        <div className="view-toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'table' ? 'view-toggle-btn-active' : ''}`}
            onClick={() => setViewMode('table')}
            aria-label="Table view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" />
            </svg>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'cards' ? 'view-toggle-btn-active' : ''}`}
            onClick={() => setViewMode('cards')}
            aria-label="Card view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" />
              <rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="panel">
        {isLoading || isSearching ? (
          <Loader label={isSearching ? 'Searching…' : 'Loading employees…'} />
        ) : employees.length === 0 ? (
          <div className="state-block">
            <div className="state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.4-4.4" />
              </svg>
            </div>
            <p className="state-title">{keyword ? 'No matching employees' : 'No employees yet'}</p>
            <p className="state-text">
              {keyword
                ? `We couldn't find anyone matching "${keyword}". Try a different search term.`
                : 'Add your first employee to start building your workforce directory.'}
            </p>
            {!keyword && <Link to="/add-employee" className="btn btn-primary">Add Employee</Link>}
          </div>
        ) : viewMode === 'table' ? (
          <EmployeeTable employees={employees} onDeleteRequest={handleDeleteRequest} />
        ) : (
          <div className="employee-card-grid">
            {employees.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} onDeleteRequest={handleDeleteRequest} />
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!employeeToDelete}
        title="Delete this employee?"
        message={
          employeeToDelete
            ? `This will permanently remove ${employeeToDelete.firstName} ${employeeToDelete.lastName} from your records. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        isDanger
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setEmployeeToDelete(null)}
      />
    </div>
  );
}

export default Employees;
