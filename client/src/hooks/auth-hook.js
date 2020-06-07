import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setTokenAndName } from '../redux/actions';
const storageName = 'userData';

export const useAuth = () => {
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

  return { login, logout, storageName };
};
