import types from './actionTypes';
// import server from '../server';

export const setTokenAndName = (token, name) => {
  return {
    type: types.SET_TOKEN_AND_NAME,
    payload: { token, name },
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
