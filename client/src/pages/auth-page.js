import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http-hook';
// import { AuthContext } from '../context/auth-context';
import { useAuth } from '../hooks/auth-hook';
import styled from 'styled-components';

const AuthPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Inputs = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
`;
const Input = styled.input`
  font-size: 1.2rem;
  margin: 10px;
  padding: 4px;
  border: 2px solid #2196f3;
  border-radius: 5px;
`;
const Controls = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.div`
  margin: 15px;
  padding: 10px;
  background-color: #2196f3;
  border: 2px solid #2196f3;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: #eee;
    color: #2196f3;
    cursor: pointer;
  }
`;
const GreenButton = styled(Button)`
  background-color: #1de9b6;
  border: 2px solid #1de9b6;
  &:hover {
    background-color: #eee;
    color: #1de9b6;
  }
`;

export default () => {
  const { login } = useAuth();
  const { loading, error, request, clearErrors } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const inputsHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const registerHandler = async () => {
    try {
      const dummyForm = {
        name: 'John',
        email: 'd48564@gmail.com',
        password: '123456',
      };
      const data = await request('/api/auth/register', 'POST', {
        ...dummyForm,
      });
      //console.log('Data: ', data);
    } catch (error) {}
  };
  const loginHandler = async () => {
    try {
      const dummyForm = {
        name: 'John',
        email: 'd48564@gmail.com',
        password: '123456',
      };
      const data = await request('/api/auth/login', 'POST', { ...dummyForm });
      // message(data.message);
      login(data.token, data.userName);
    } catch (error) {}
  };

  return (
    <AuthPage>
      <Inputs>
        <Input
          placeholder="Name"
          type="text"
          name="name"
          onChange={inputsHandler}
          value={form.name}
        />
        <Input
          placeholder="Email"
          type="text"
          name="email"
          onChange={inputsHandler}
          value={form.email}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={inputsHandler}
          value={form.password}
        />
      </Inputs>
      <Controls>
        <GreenButton onClick={registerHandler} disabled={loading}>
          Регистрация
        </GreenButton>
        <Button onClick={loginHandler} disabled={loading}>
          Вход
        </Button>
      </Controls>
    </AuthPage>
  );
};
