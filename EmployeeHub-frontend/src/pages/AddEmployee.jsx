import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { addEmployee } from '../services/employeeService';

function AddEmployee() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [serverFieldErrors, setServerFieldErrors] = useState(null);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setError('');
    setServerFieldErrors(null);

    addEmployee(values)
      .then((created) => {
        navigate('/employees', {
          state: { flashMessage: `${created.firstName} ${created.lastName} was added successfully.` },
        });
      })
      .catch((err) => {
        setError(err.message || 'Failed to add employee.');
        if (err.fieldErrors) setServerFieldErrors(err.fieldErrors);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">Workforce</span>
          <h1 className="page-title">Add Employee</h1>
          <p className="page-subtitle">Fill in the details below to add a new team member.</p>
        </div>
        <Link to="/employees" className="btn btn-ghost">Cancel</Link>
      </div>

      {error && <div className="inline-banner inline-banner-error">{error}</div>}

      <div className="panel panel-padded">
        <EmployeeForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Employee"
          serverFieldErrors={serverFieldErrors}
        />
      </div>
    </div>
  );
}

export default AddEmployee;
