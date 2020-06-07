import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Loader from './components/loader';
import { useRoutes } from './routes';
import { useSelector } from 'react-redux';
import { useAuth } from './hooks/auth-hook';
import './index.css';


function App() {
  const token = useSelector((state) => {
    return state.token;
  });
  const { login, storageName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userName);
    }
    setReady(true);
  }, [login]);
  
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
