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
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const inputsHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    if (!validateForm(form, setMsg, lang.messages)) {
      return;
    }
    if (await registerAndLogin(request, login, form)) {
      history.push('/sensors');
      closeModal();
    }
  };

  return (
    <Modal closeModal={closeModal} msg={msg} submit={registerHandler}>
      <div className="title">{lang.title}</div>
      <Input
        label={lang.email}
        ph={lang.emailPh}
        name="email"
        onChange={inputsHandler}
      />
      <Input
        label={lang.name}
        ph={lang.namePh}
        name="name"
        onChange={inputsHandler}
      />
      <Input
        label={lang.password}
        type="password"
        ph={lang.passwordPh}
        name="password"
        onChange={inputsHandler}
      />
      <Input
        label={lang.confirmPassword}
        type="password"
        ph={lang.confirmPasswordPh}
        name="confirmPassword"
        onChange={inputsHandler}
      />
      <div className="btn" onClick={registerHandler}>
        {lang.regButton}
      </div>
    </Modal>
  );
};
function validateForm(form, setMsg, messages) {
  if (!validators.validateEmail(form.email)) {
    setMsg(messages.emailNoValid);
    return false;
  }
  if (!validators.validateName(form.name)) {
    setMsg(messages.nameNoValid);
    return false;
  }
  if (!validators.validatePassword(form.password)) {
    setMsg(messages.passwordNoValid);
    return false;
  }
  if (!validators.passwordsIsEqual(form.password, form.confirmPassword)) {
    setMsg(messages.passwordsNoEqual);
    return false;
  }
  setMsg('');
  return true;
}

async function registerAndLogin(request, login, form) {
  let resp = await request('registerUser', {
    email: form.email,
    name: form.name,
    password: form.password,
  });
  if (!resp) {
    return false;
  }
  resp = await request('loginUser', {
    email: form.email,
    password: form.password,
  });
  if (!resp) {
    return false;
  }
  login(resp.userName, resp.role, resp.token);
  return true;
}
