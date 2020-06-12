import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from './modal';
import Input from './Input';
import { useHttp } from '../../hooks/http-hook';
import { useAuth } from '../../hooks/auth-hook';

export default ({ lang, closeModal }) => {
  const { request } = useHttp();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '', 
  });
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const inputsHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    if(!validateForm(form, setMsg, lang.messages)){
      return;
    }
    if (await registerAndLogin (request, login, setMsg, lang, form)){
      history.push('/sensors');
      closeModal();
    }
  };

  return (
    <Modal 
      closeModal={closeModal} 
      msg={msg}
      submit={loginHandler}
    >
      <div className='title'>{lang.title}</div>
      <Input 
        label={lang.email} 
        ph={lang.emailPh} 
        name='email' 
        onChange={inputsHandler}
      />
      <Input 
        label={lang.password} 
        type='password' 
        ph={lang.passwordPh} 
        name='password' 
        onChange={inputsHandler}
      />
      <div 
        className='btn' 
        onClick={loginHandler}
      >
        {lang.loginButton}
      </div>
    </Modal>
  );
};
function validateForm(form, setMsg, messages) {
  if(!validateEmail(form.email)){
    setMsg(messages.emailNoValid);
    return false;
  }
  if(!validatePassword(form.password)){
    setMsg(messages.passwordNoValid);
    return false;
  }
  setMsg('');
  return true;
}

function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validatePassword(password) {
  return password.trim().length > 5;
}

async function registerAndLogin (request, login, setMsg, lang, form) {
  const resp = await request('loginUser', {
    email:form.email,
    password:form.password,
  });
  if(!resp){
    setMsg(lang.messages.serverError);
    return false;
  }
  if(!resp.ok) {
    setMsg(resp.data.message);
    return false;
  }
  login(resp.data.userName, resp.data.role, resp.data.token);
  return true;
}
