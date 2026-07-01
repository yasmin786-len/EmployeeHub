import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../services/formatters';
import './EmployeeCard.css';

function EmployeeCard({ employee, onDeleteRequest }) {
  const navigate = useNavigate();

  return (
    <div className="employee-card">
      <div className="employee-card-top">
        <Avatar
          firstName={employee.firstName}
          lastName={employee.lastName}
          department={employee.department}
          size="md"
        />
        <div className="employee-card-heading">
          <p className="employee-card-name">
            {employee.firstName} {employee.lastName}
          </p>
          <p className="employee-card-role">{employee.designation}</p>
        </div>
        <StatusBadge status={employee.status} />
      </div>

      <div className="employee-card-meta">
        <div className="employee-card-meta-row">
          <span className="employee-card-meta-label">Department</span>
          <span className="employee-card-meta-value">{employee.department}</span>
        </div>
        <div className="employee-card-meta-row">
          <span className="employee-card-meta-label">Email</span>
          <span className="employee-card-meta-value employee-card-truncate">{employee.email}</span>
        </div>
        <div className="employee-card-meta-row">
          <span className="employee-card-meta-label">Salary</span>
          <span className="employee-card-meta-value employee-card-salary">
            {formatCurrency(employee.salary)}
          </span>
        </div>
        <div className="employee-card-meta-row">
          <span className="employee-card-meta-label">Joined</span>
          <span className="employee-card-meta-value">{formatDate(employee.joiningDate)}</span>
        </div>
      </div>

      <div className="employee-card-actions">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate(`/employee/${employee.id}`)}>
          View
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate(`/edit-employee/${employee.id}`)}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm employee-card-delete-btn"
          onClick={() => onDeleteRequest(employee)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
