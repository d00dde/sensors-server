import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from './modal';
import Input from './Input';
import { useHttp } from '../../hooks/http-hook';
import { useAuth } from '../../hooks/auth-hook';
import validators from './validators';

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
    if (!validateForm(form, setMsg, lang.messages)) {
      return;
    }
    if (await loginReq(request, login, form)) {
      history.push('/sensors');
      closeModal();
    }
  };

  return (
    <Modal closeModal={closeModal} msg={msg} submit={loginHandler}>
      <div className="title">{lang.title}</div>
      <Input
        label={lang.email}
        ph={lang.emailPh}
        name="email"
        onChange={inputsHandler}
        defVal='d48564@gmail.com'
      />
      <Input
        label={lang.password}
        type="password"
        ph={lang.passwordPh}
        name="password"
        onChange={inputsHandler}
        defVal='123456'
      />
      <div className="btn" onClick={loginHandler}>
        {lang.loginButton}
      </div>
    </Modal>
  );
};
function validateForm(form, setMsg, messages) {
  if (!validators.validateEmail(form.email)) {
    setMsg(messages.emailNoValid);
    return false;
  }
  if (!validators.validatePassword(form.password)) {
    setMsg(messages.passwordNoValid);
    return false;
  }
  setMsg('');
  return true;
}

async function loginReq(request, login, form) {
  const resp = await request('loginUser', {
    email: form.email,
    password: form.password,
  });
  if (!resp) {
    return false;
  }
  login(resp.userName, resp.role, resp.token);
  return true;
}
