import types from './actionTypes';
import rus from '../language/rus';
import eng from '../language/eng';
// import server from '../server';

export const setAuth = (name, role, token) => {
  return {
    type: types.SET_AUTH,
    payload: { name, token, role },
  };
};
export const setError = (message) => {
  return {
    type: types.SET_ERROR,
    payload: message,
  };
};
export const setLoading = (isLoading) => {
  return {
    type: types.SET_LOADING,
    payload: isLoading,
  };
};
export const setModal = (modalName) => {
  return {
    type: types.SET_MODAL,
    payload: modalName,
  };
};

export const fetchUsersData = () => async (dispatch) => {
  try {
    // const usersData = await server.getData();
    dispatch({
      type: types.SET_USERS_DATA,
      payload: 'usersData',
    });
  } catch (e) {
    dispatch({
      type: types.SET_ERROR,
      payload: e,
    });
  }
};
export const setLanguage = (langName) => {
  let language = {};
  switch (langName) {
    case 'eng':
      language = eng;
      break;
    case 'rus':
      language = rus;
      break;
    default:
      language = rus;
  }
  return {
    type: types.SET_LANGUAGE,
    payload: language,
  };
};
