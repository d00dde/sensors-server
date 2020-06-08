import { createContext } from 'react';

export const AuthContext = createContext({
  token: null,
  userName: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});
