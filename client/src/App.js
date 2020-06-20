import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Loader from './components/loader';
import Modal from './components/modal';
import { useRoutes } from './hooks/routes-hook';
import { useDispatch } from 'react-redux';
import { setLanguage } from './redux/actions';
import { useAuth } from './hooks/auth-hook';
import './App.css';

function App() {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const { login, storageName } = useAuth();
  const routes = useRoutes();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.name, data.role, data.token);
    }
    dispatch(setLanguage('default'));
    setReady(true);
  }, [login, dispatch, storageName]);

  if(!ready)
    return (
      <div className="wrapper">
        <Loader />
      </div>
    );
  return (
    <div className="wrapper">
      <Router>
        <Navbar />
        <div>{routes}</div>
        <Modal />
      </Router>
    </div>
  );
}

export default App;
