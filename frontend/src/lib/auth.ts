export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const getUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

export const saveAuth = (token: string, user: AuthUser) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => !!getToken();
