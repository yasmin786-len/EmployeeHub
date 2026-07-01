import api from './api';

/**
 * Service layer wrapping all Employee-related API calls.
 * Components should import from here rather than calling axios directly.
 */

export const getAllEmployees = () => api.get('/employees').then((res) => res.data);

export const getEmployeeById = (id) => api.get(`/employees/${id}`).then((res) => res.data);

export const addEmployee = (employeeData) =>
  api.post('/employees', employeeData).then((res) => res.data);

export const updateEmployee = (id, employeeData) =>
  api.put(`/employees/${id}`, employeeData).then((res) => res.data);

export const deleteEmployee = (id) => api.delete(`/employees/${id}`).then((res) => res.data);

export const searchEmployees = (keyword) =>
  api.get('/employees/search', { params: { keyword } }).then((res) => res.data);
