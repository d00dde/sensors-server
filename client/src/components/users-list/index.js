import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/actions';
import './users-list.scss';

export default () => {
  const dispatch = useDispatch();
  const { users, language } = useSelector((state) => {
    return {
      users: state.users,
      language: state.language.usersList,
    };
  });
  /* const updateHandler = (id) => {
    dispatch(setSensorId(id));
    dispatch(setModal('updateSensor'));
  };
  const deleteHandler = (id) => {
    dispatch(setSensorId(id));
    dispatch(setModal('deleteSensor'));
  }; */
  console.log(users)
  const usersList = users.map((user) => {
    
    return ( <div></div>)
      /* <div key={_id} className="sensor-item">
        <span>{description}</span>
        <div className="update-btn" onClick={() => updateHandler(_id)}>
          {language.updateBtn}
        </div>
        <div className="delete-btn" onClick={() => deleteHandler(_id)}>
          {language.deleteBtn}
        </div>
      </div>
    );*/
  });
  return <div className="sensors-list">{usersList}</div>;
};
