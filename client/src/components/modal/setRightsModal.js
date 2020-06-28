import React from 'react';
import Modal from './modal';
import { useHttp } from '../../hooks/http-hook';
import { useSelector, useDispatch } from 'react-redux';
import { fetch } from '../../redux/actions';

export default ({ lang, closeModal }) => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { user_id, user_role } = useSelector(({ user_id, user_role }) => {
    return { user_id, user_role }
  });
  const getRoleToChange = () => {
    switch(user_role){
      case 'user':
        return { role: 'admin', lang: lang.setAdmin };
      case 'admin':
        return { role: 'user', lang: lang.setUser };
      default:
        return { role: '', lang: '' };
    }
  };

  const setRightsHandler = async () => {
    if (await setRights(user_id, getRoleToChange().role, request)) {
      dispatch(fetch(request, 'users', 'getUsers', null));
    }
    closeModal();
  };
  return (
    <Modal 
      closeModal={closeModal} 
      submit={closeModal}
      noMessage={true}
    >
      <div className="title">{lang.title}</div>
      <div className='buttons'>
        <div 
          className="btn-set" 
          onClick={setRightsHandler}
        >
          {getRoleToChange().lang}
        </div>
        <div 
          className="btn-cancel" 
          onClick={closeModal}
        >
          {lang.cancel}
        </div>
      </div>
    </Modal>
  );
};

async function setRights(id, role, request) {
  const resp = await request('setRights', { role }, id);
  if (!resp) {
    return false;
  }
  return true;
}
