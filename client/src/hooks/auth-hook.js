import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth, clearData } from '../redux/actions';
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
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch(setAuth(null, null, null));
    dispatch(clearData());
    localStorage.removeItem(storageName);
  }, [dispatch]);
  const getName = useCallback(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if(!data)
      return false;
    return data.name;
  }, []);

  return { login, logout, storageName, getName };
};
