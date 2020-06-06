import types from './actionTypes';

const initState = () => {
  return {
    token: null,
    name: null,
    usersData: null,
    error: null,
  };
};

export const reducer = (state = initState(), action) => {
  //console.log('action: ', action.type);
  //console.log('data: ', action.payload);
  switch (action.type) {
    case types.SET_TOKEN_AND_NAME:
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
      };
    case types.SET_USERS_DATA:
      return {
        ...state,
        usersData: action.payload,
        error: null,
      };
    case types.SET_ERROR:
      return {
        ...state,
        usersData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
