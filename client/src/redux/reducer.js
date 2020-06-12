import types from './actionTypes';

const initState = () => {
  return {
    language: {},
    modalName: '',
    name: '',
    role: '',
    token: '',
    users: null,
    sensors: null,
    loading: false,
    error: null,
  };
};

export const reducer = (state = initState(), action) => {
  //console.log('action: ', action.type);
  //console.log('data: ', action.payload);
  switch (action.type) {
    case types.SET_DATA:
      return {
        ...state,
        [action.payload.fieldName]: action.payload.data,
      };
    case types.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case types.SET_AUTH:
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
        token: action.payload.token,
      };
    case types.SET_MODAL:
      return {
        ...state,
        modalName: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
