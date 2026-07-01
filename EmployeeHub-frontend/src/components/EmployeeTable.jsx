import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../services/formatters';
import './EmployeeTable.css';

function EmployeeTable({ employees, onDeleteRequest }) {
  const navigate = useNavigate();

  return (
    <div className="table-scroll">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th className="employee-table-actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="employee-table-id">#{emp.id}</td>
              <td>
                <div className="employee-table-name-cell">
                  <Avatar firstName={emp.firstName} lastName={emp.lastName} department={emp.department} size="sm" />
                  <span className="employee-table-name">
                    {emp.firstName} {emp.lastName}
                  </span>
                </div>
              </td>
              <td className="employee-table-muted">{emp.email}</td>
              <td className="employee-table-muted">{emp.phone}</td>
              <td>{emp.department}</td>
              <td className="employee-table-muted">{emp.designation}</td>
              <td className="employee-table-salary">{formatCurrency(emp.salary)}</td>
              <td className="employee-table-muted">{formatDate(emp.joiningDate)}</td>
              <td>
                <StatusBadge status={emp.status} />
              </td>
              <td className="employee-table-actions-cell">
                <div className="employee-table-actions">
                  <button
                    type="button"
                    className="btn btn-icon btn-ghost"
                    title="View employee"
                    aria-label="View employee"
                    onClick={() => navigate(`/employee/${emp.id}`)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-ghost"
                    title="Edit employee"
                    aria-label="Edit employee"
                    onClick={() => navigate(`/edit-employee/${emp.id}`)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5.5 17z" />
                      <path d="M14 6.5 17.5 10" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-ghost employee-table-delete-btn"
                    title="Delete employee"
                    aria-label="Delete employee"
                    onClick={() => onDeleteRequest(emp)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 7h15M9.5 7V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3V7m1.8 0-.7 12.2a1.8 1.8 0 0 1-1.8 1.7H8.5a1.8 1.8 0 0 1-1.8-1.7L6 7" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
