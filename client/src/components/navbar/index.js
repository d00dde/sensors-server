import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/auth-hook';
import styled from 'styled-components';

const Wrapper = styled.nav`
  /*height: 50px;*/
  display: flex;
  padding: 10px;
  padding: 10px 30px;
  justify-content: space-between;
  background-color: #78909c;
`;
const Logo = styled.a`
  display: block;
  background-image: url('./images/logo.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const Logout = styled.a`
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #2196f3;
  border: 2px solid #2196f3;
  transition: 0.3s;
  &:hover {
    background-color: #eee;
    color: #2196f3;
  }
`;

export default () => {
  const { language, token } = useSelector((state) => {
    return {
      language: state.language.navbar,
      token: state.token,
    };
  });
  const { logout } = useAuth();
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <Wrapper>
      <Logo />
      <Logout href="/" onClick={logoutHandler}>
        {!!token ? language.logout : language.login}
      </Logout>
    </Wrapper>
  );
};
