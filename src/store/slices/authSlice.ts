import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'supervisor' | 'normal';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

// Initialize state from localStorage
const getInitialState = (): AuthState => {
  console.log('Initializing auth state from localStorage...');
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  console.log('Found token in localStorage:', !!token);
  console.log('Found user in localStorage:', !!userStr);
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log('Successfully loaded auth state from localStorage', { user: user.email, hasToken: !!token });
      return {
        user,
        token,
        isAuthenticated: true,
        isInitialized: true,
      };
    } catch (error) {
      console.log('Error parsing user data from localStorage, clearing...', error);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  
  console.log('No valid auth data found, initializing empty state');
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: true,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; access_token: string }>) => {
      const { user, access_token } = action.payload;
      console.log('Setting credentials:', { user: user.email, hasToken: !!access_token });
      
      state.user = user;
      state.token = access_token;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Credentials saved to localStorage');
    },
    logout: (state) => {
      console.log('Logging out user...');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Cleared auth data from localStorage');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;