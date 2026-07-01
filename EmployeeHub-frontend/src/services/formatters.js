/**
 * Shared formatting and presentation helpers used across components.
 */

const DEPARTMENT_COLORS = {
  engineering: { bg: '#E8F0FE', fg: '#1D4ED8' },
  'human resources': { bg: '#FCE9F3', fg: '#BE185D' },
  finance: { bg: '#E7F6ED', fg: '#15803D' },
  marketing: { bg: '#FFF1E0', fg: '#B45309' },
  sales: { bg: '#EEF0FE', fg: '#4338CA' },
  operations: { bg: '#E0F7FA', fg: '#0E7490' },
  default: { bg: '#EEF0FE', fg: '#4F46E5' },
};

export function getInitials(firstName = '', lastName = '') {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}` || '?';
}

export function getDepartmentColor(department = '') {
  const key = department.trim().toLowerCase();
  return DEPARTMENT_COLORS[key] || DEPARTMENT_COLORS.default;
}

export function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '—';
  const num = Number(value);
  if (Number.isNaN(num)) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
