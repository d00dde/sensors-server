import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModal, setValue } from '../../redux/actions';
import './users-list.scss';

export default () => {
  const dispatch = useDispatch();
  const { users, userRole, language } = useSelector((state) => {
    return {
      users: state.users,
      userRole: state.role,
      language: state.language.usersList,
    };
  });
  const clickHandler = (name) => {
    dispatch(setValue('name', name));
  };
  const modalHandler = (id, modalName, role = '') => {
    dispatch(setValue('user_id', id));
    if(role)
      dispatch(setValue('user_role', role));
    dispatch(setModal(modalName));
  };

  const showButtons = (id, role) => (
    <>
      <div className="change-btn" onClick={() => modalHandler(id, 'setRights', role)}>
        {language.setRights}
      </div>
      <div className="delete-btn" onClick={() => modalHandler(id, 'deleteUser')}>
        {language.deleteBtn}
      </div>
    </>
  );
  const usersList = users && users.map(({id, email, name, role}) => {
    return (
      <div key={id} className="user-item">
        <Link to={`sensors/${id}`} onClick={() => clickHandler(name)}>
          <table className='info'>
            <tbody>
              <tr>
                <td>{language.email}:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>{language.name}:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>{language.role}:</td>
                <td>{role}</td>
              </tr>
            </tbody>
          </table>
        </Link>
        {role !== 'master' && userRole === 'master' ? showButtons(id, role) : null}
      </div>
    );
  });
  return <div className="users-list">{usersList}</div>;
};
