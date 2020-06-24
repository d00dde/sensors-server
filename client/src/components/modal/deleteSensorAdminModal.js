import React from 'react';
import Modal from './modal';
import { useHttp } from '../../hooks/http-hook';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetch } from '../../redux/actions';

export default ({ lang, closeModal }) => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const id = useSelector(({ sensor_id }) => sensor_id);
  const userId = useLocation().pathname.split('/').pop();

  const deleteHandler = async () => {
    if (await delReq(id, request)) {
      dispatch(fetch(request, 'sensors', 'getSensorsAdmin', null, userId));
      closeModal();
    }
  };

  return (
    <Modal 
      closeModal={closeModal} 
      submit={deleteHandler}
      noMessage={true}
    >
      <div className="title">{lang.title}</div>
      <div className='buttons'>
        <div 
          className="btn-delete" 
          onClick={deleteHandler}
        >
          {lang.yes}
        </div>
        <div 
          className="btn-cancel" 
          onClick={closeModal}
        >
          {lang.no}
        </div>
      </div>
    </Modal>
  );
};

async function delReq(id, request) {
  const resp = await request('deleteSensorAdmin', { }, id);
  if (!resp) {
    return false;
  }
  return true;
}
