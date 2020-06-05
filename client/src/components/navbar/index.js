import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
// import './navbar.css';
import styled from 'styled-components';
const Wrapper = styled.nav`
  /*height: 50px;*/
  display: flex;
  padding: 10px;
  padding-right: 30px;
  justify-content: flex-end;
  background-color: #78909c;
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
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <Wrapper>
      <Logout href="/" onClick={logoutHandler}>
        Выйти
      </Logout>
    </Wrapper>
  );
};
