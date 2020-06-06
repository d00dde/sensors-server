import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokenAndName } from '../redux/actions';
const storageName = 'userData';

export const useAuth = () => {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  const login = useCallback((jwtToken, name) => {
    dispatch(setTokenAndName(jwtToken, name));
    localStorage.setItem(
      storageName,
      JSON.stringify({
        setUserName: name,
        token: jwtToken,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    dispatch(setTokenAndName(null, null));
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userName);
    }
    setReady(true);
  }, [login]);

  return { login, logout, ready };
};
