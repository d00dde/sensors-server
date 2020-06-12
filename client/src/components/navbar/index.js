import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../../redux/actions';
import { useAuth } from '../../hooks/auth-hook';
import Button from './button';
import './navbar.scss';

export default () => {
  const { language, token, role } = useSelector((state) => {
    return {
      language: state.language.navbar,
      token: state.token,
      role: state.role
    };
  });
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const history = useHistory();

  const logoutHandler = (e) => {
    logout();
    history.push('/');
  };
  const loginHandler = (e) => {
    dispatch(setModal('login'));
  };

  const regButton = !token 
      ? <div 
          className='btn alt'
          onClick={() => dispatch(setModal('register'))}
        >
          {language.register}
        </div>
      : null;
  const loginButton = !token
      ? <div className='btn' onClick={loginHandler}>{language.login}</div>
      : <div className='btn' onClick={logoutHandler}>{language.logout}</div>
  const links = createLinks(language, token, role);

  return (
    <nav className='nav-wrapper'>
      <Link className='logo' to="/" />
      <div className='controls'>
        {links}
        {regButton}
        {loginButton}
      </div>
    </nav>
  );
};

function createLinks(language, token, role){
  if(!token)
    return null;
  if(role === "user")
    return (
      <Button 
        title={language.sensors} 
        width='100'
        offset='-175'
        to='/sensors'
      />
    );
  return (
    <>
      <Button 
        title={language.users} 
        width='180'
        offset='-290'
        to='/users'
      />
      <Button 
        title={language.sensors} 
        width='100'
        offset='-175'
        to='/sensors'
      />
    </>
  );
}