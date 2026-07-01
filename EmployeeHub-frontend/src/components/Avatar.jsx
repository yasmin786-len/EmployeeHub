import { getInitials, getDepartmentColor } from '../services/formatters';
import './Avatar.css';

function Avatar({ firstName, lastName, department, size = 'md' }) {
  const initials = getInitials(firstName, lastName);
  const { bg, fg } = getDepartmentColor(department);

  return (
    <span
      className={`avatar avatar-${size}`}
      style={{ backgroundColor: bg, color: fg }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export default Avatar;
