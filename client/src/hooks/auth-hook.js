import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions';
const storageName = 'userData';

export const useAuth = () => {
  const dispatch = useDispatch();
  const login = useCallback((name, role, token) => {
    dispatch(setAuth(name, role, token));
    localStorage.setItem(
      storageName,
      JSON.stringify({
        name,
        role,
        token,
      }),
    );
  }, []);
  const logout = useCallback(() => {
    dispatch(setAuth(null, null, null));
    localStorage.removeItem(storageName);
  }, []);

  return { login, logout, storageName };
};
