<<<<<<< HEAD
import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userName, setUserName] = useState(null);

=======
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setTokenAndName } from '../redux/actions';
const storageName = 'userData';

export const useAuth = () => {
  const dispatch = useDispatch();
>>>>>>> dfcb5e39007eeeee11de9464fd2861a70b4a76f3
  const login = useCallback((jwtToken, name) => {
    setToken(jwtToken);
    setUserName(name);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        setUserName: name,
        token: jwtToken,
      }),
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userName);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userName, ready };
=======
  return { login, logout, storageName };
>>>>>>> dfcb5e39007eeeee11de9464fd2861a70b4a76f3
};
