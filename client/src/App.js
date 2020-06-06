import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Loader from './components/loader';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './context/auth-context';
import './index.css';

function App() {
  const { login, logout, token, userName, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userName, isAuthenticated }}
    >
      <Router>
        <div>
          {isAuthenticated && <Navbar />}
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
