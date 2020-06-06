import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Loader from './components/loader';
import { useRoutes } from './routes';
import { useSelector } from 'react-redux';
import { useAuth } from './hooks/auth-hook';
// import { AuthContext } from './context/auth-context';
import './index.css';

function App() {
  const token = useSelector((state) => {
    return state.token;
  });
  const { ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return <Loader />;
  }
  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar />}
        {routes}
      </div>
    </Router>
  );
}

export default App;
