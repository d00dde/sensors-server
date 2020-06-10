import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Loader from './components/loader';
import Modal from './components/modals';
import { useRoutes } from './routes';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from './redux/actions';
import { useAuth } from './hooks/auth-hook';
import './App.css';

function App() {
  const token = useSelector(({ token }) => token);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState('register');
  const { login, storageName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.name, data.role, data.token);
    }
    dispatch(setLanguage('default'));
    setReady(true);
  }, [login]);

  if (!ready) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Router>
        <Navbar />
        <div>{routes}</div>
      </Router>
      <Modal showModal={showModal} />
    </div>
  );
}

export default App;
