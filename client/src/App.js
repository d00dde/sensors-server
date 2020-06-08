import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Loader from './components/loader';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth-hook';
<<<<<<< HEAD
import { AuthContext } from './context/auth-context';
=======
>>>>>>> dfcb5e39007eeeee11de9464fd2861a70b4a76f3
import './index.css';


function App() {
<<<<<<< HEAD
  const { login, logout, token, userName, ready } = useAuth();
=======
  const token = useSelector((state) => {
    return state.token;
  });
  const { login, storageName } = useAuth();
>>>>>>> dfcb5e39007eeeee11de9464fd2861a70b4a76f3
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
