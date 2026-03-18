import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  authProvider?: 'local' | 'google';
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Hydrate from localStorage synchronously — this eliminates the auth-check flicker
// because the store already knows the auth state before the first render.
function loadFromStorage(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false };
  }
  try {
    const token = localStorage.getItem('token');
    const raw   = localStorage.getItem('user');
    if (token && raw) {
      return { user: JSON.parse(raw), token, isAuthenticated: true };
    }
  } catch {
    // corrupt storage — clear it
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return { user: null, token: null, isAuthenticated: false };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadFromStorage,
  reducers: {
    // Call after login / register / google-auth
    setCredentials(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user            = action.payload.user;
      state.token           = action.payload.token;
      state.isAuthenticated = true;

      // Persist to localStorage so the next page load hydrates correctly
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user',  JSON.stringify(action.payload.user));
    },

    // Call on logout
    clearCredentials(state) {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
