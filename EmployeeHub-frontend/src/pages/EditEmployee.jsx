import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import Loader from '../components/Loader';
import { getEmployeeById, updateEmployee } from '../services/employeeService';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [serverFieldErrors, setServerFieldErrors] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getEmployeeById(id)
      .then((data) => {
        if (isMounted) {
          setInitialValues({
            ...data,
            salary: data.salary !== undefined && data.salary !== null ? String(data.salary) : '',
          });
        }
      })
      .catch((err) => {
        if (isMounted) setLoadError(err.message || 'Failed to load employee details.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setError('');
    setServerFieldErrors(null);

    updateEmployee(id, values)
      .then((updated) => {
        navigate(`/employee/${updated.id}`, {
          state: { flashMessage: 'Employee details updated successfully.' },
        });
      })
      .catch((err) => {
        setError(err.message || 'Failed to update employee.');
        if (err.fieldErrors) setServerFieldErrors(err.fieldErrors);
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) return <Loader fullPage label="Loading employee details…" />;

  if (loadError) {
    return (
      <div className="page">
        <div className="state-block">
          <div className="state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <p className="state-title">Couldn't load this employee</p>
          <p className="state-text">{loadError}</p>
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
          <h1 className="page-title">Edit Employee</h1>
          <p className="page-subtitle">
            Updating details for {initialValues?.firstName} {initialValues?.lastName}
          </p>
        </div>
        <Link to={`/employee/${id}`} className="btn btn-ghost">Cancel</Link>
      </div>

      {error && <div className="inline-banner inline-banner-error">{error}</div>}

      <div className="panel panel-padded">
        <EmployeeForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
          serverFieldErrors={serverFieldErrors}
        />
      </div>
    </div>
  );
}

export default EditEmployee;
