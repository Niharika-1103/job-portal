export const setAuth = (token, role) => {
  localStorage.setItem('token', token || '');
  localStorage.setItem('role', role || '');
};

export const getRole = () => localStorage.getItem('role') || '';

export const isAuthenticated = () => Boolean(localStorage.getItem('token'));

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

