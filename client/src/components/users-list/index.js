import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModal, setValue } from '../../redux/actions';
import './users-list.scss';

export default () => {
  const dispatch = useDispatch();
  const { users, language } = useSelector((state) => {
    return {
      users: state.users,
      language: state.language.usersList,
    };
  });
  const clickHandler = (name) => {
    dispatch(setValue('name', name));
    //dispatch(setModal('updateSensor'));
  };
  /* const deleteHandler = (id) => {
    dispatch(setSensorId(id));
    dispatch(setModal('deleteSensor'));
  }; */
  const usersList = users.map(({id, email, name, role}) => {
    return (
      <Link 
        key={id} 
        className="user-item" 
        to={`sensors/${id}`} 
        onClick={() => clickHandler(name)}
      >
        <div className='info'>
          <span>{email}</span>
          <span>{name}</span>
        </div>
        <span>{role}</span>
      </Link>
    );
  });
  return <div className="users-list">{usersList}</div>;
};
