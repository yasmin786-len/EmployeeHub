import { useState, useEffect } from 'react';
import './EmployeeForm.css';

const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
];

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: '',
  designation: '',
  salary: '',
  joiningDate: '',
  status: 'ACTIVE',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = 'First name is required';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required';

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!values.department.trim()) errors.department = 'Department is required';
  if (!values.designation.trim()) errors.designation = 'Designation is required';

  if (values.salary === '' || values.salary === null) {
    errors.salary = 'Salary is required';
  } else if (Number.isNaN(Number(values.salary)) || Number(values.salary) <= 0) {
    errors.salary = 'Salary must be a positive number';
  }

  if (!values.joiningDate) errors.joiningDate = 'Joining date is required';

  return errors;
}

function EmployeeForm({ initialValues, onSubmit, isSubmitting, submitLabel, serverFieldErrors }) {
  const [values, setValues] = useState({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({ ...EMPTY_FORM, ...initialValues });
    }
  }, [initialValues]);

  // Merge server-side validation errors (e.g. duplicate email) into local error state
  useEffect(() => {
    if (serverFieldErrors) {
      setErrors((prev) => ({ ...prev, ...serverFieldErrors }));
    }
  }, [serverFieldErrors]);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      department: true,
      designation: true,
      salary: true,
      joiningDate: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        ...values,
        salary: Number(values.salary),
      });
    }
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            className={`form-input ${showError('firstName') ? 'form-input-error' : ''}`}
            value={values.firstName}
            onChange={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            placeholder="e.g. Aarav"
          />
          {showError('firstName') && <span className="form-error-text">{errors.firstName}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            className={`form-input ${showError('lastName') ? 'form-input-error' : ''}`}
            value={values.lastName}
            onChange={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            placeholder="e.g. Sharma"
          />
          {showError('lastName') && <span className="form-error-text">{errors.lastName}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className={`form-input ${showError('email') ? 'form-input-error' : ''}`}
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="name@company.com"
          />
          {showError('email') && <span className="form-error-text">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            className={`form-input ${showError('phone') ? 'form-input-error' : ''}`}
            value={values.phone}
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            placeholder="+91-9876543210"
          />
          {showError('phone') && <span className="form-error-text">{errors.phone}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="department">Department</label>
          <select
            id="department"
            className={`form-select ${showError('department') ? 'form-input-error' : ''}`}
            value={values.department}
            onChange={handleChange('department')}
            onBlur={handleBlur('department')}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          {showError('department') && <span className="form-error-text">{errors.department}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="designation">Designation</label>
          <input
            id="designation"
            type="text"
            className={`form-input ${showError('designation') ? 'form-input-error' : ''}`}
            value={values.designation}
            onChange={handleChange('designation')}
            onBlur={handleBlur('designation')}
            placeholder="e.g. Senior Software Engineer"
          />
          {showError('designation') && <span className="form-error-text">{errors.designation}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="salary">Salary (Annual, ₹)</label>
          <input
            id="salary"
            type="number"
            min="0"
            step="0.01"
            className={`form-input ${showError('salary') ? 'form-input-error' : ''}`}
            value={values.salary}
            onChange={handleChange('salary')}
            onBlur={handleBlur('salary')}
            placeholder="e.g. 75000"
          />
          {showError('salary') && <span className="form-error-text">{errors.salary}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="joiningDate">Joining Date</label>
          <input
            id="joiningDate"
            type="date"
            className={`form-input ${showError('joiningDate') ? 'form-input-error' : ''}`}
            value={values.joiningDate}
            onChange={handleChange('joiningDate')}
            onBlur={handleBlur('joiningDate')}
          />
          {showError('joiningDate') && <span className="form-error-text">{errors.joiningDate}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="status">
            Status <span className="form-label-optional">(optional)</span>
          </label>
          <select
            id="status"
            className="form-select"
            value={values.status}
            onChange={handleChange('status')}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
