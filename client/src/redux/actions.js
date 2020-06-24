import types from './actionTypes';
import rus from '../language/rus';
import eng from '../language/eng';

export const setAuth = (name, role, token) => {
  return {
    type: types.SET_AUTH,
    payload: { name, token, role },
  };
};
export const clearData = () => {
  return {
    type: types.CLEAR_DATA,
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

export const fetch = (
  request,
  fieldName,
  requestName,
  body = null,
  id = null,
) => async (dispatch) => {
  const response = await request(requestName, body, id);
  dispatch({
    type: types.SET_DATA,
    payload: {
      fieldName,
      data: response,
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
/*export const setSensorId = (id) => {
  return {
    type: types.SET_SENSOR_ID,
    payload: id,
  };
};*/
export const setValue = (fieldName, value) => {
  return {
    type: types.SET_DATA,
    payload: {
      fieldName,
      data: value,
    },
  };
};
