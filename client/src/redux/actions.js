import types from './actionTypes';
import rus from '../language/rus';
import eng from '../language/eng';


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

export const fetch = (request, fieldName, requestName, body = null, id = null) => async (dispatch) => {
  const responce = await request(requestName, body, id);
  if(!responce.ok){
      dispatch({
      type: types.SET_ERROR,
      payload: responce.data.message,
    });
  }
  dispatch({
    type: types.SET_DATA,
    payload: {
      fieldName,
      data: responce.data,
    },
  });
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