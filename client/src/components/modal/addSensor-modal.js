import React, { useState } from 'react';
import Modal from './modal';
import Input from './Input';
import CheckInput from './Check-input';
//import { useHttp } from '../../hooks/http-hook';
//import validators from './validators';

const availableChannels = ['telegram', 'viber'];

export default ({ lang, closeModal }) => {
  /*const { request } = useHttp();
  const { login } = useAuth();*/
  const [description, setDescription] = useState('');
  const [channels, setChannels] = useState(() => {
    const channels = {};
    availableChannels.forEach((channel) => {
      channels[channel] = {enabled: false, value: ''};
    });
    return channels;
  });
  const [msg, setMsg] = useState('');
  const changeHandler = (type, channel, value) => {
    setChannels({
      ...channels,
      [channel]: {
        ...channels[channel],
        [type]: value
      }
    });
  };

  const addHandler = async () => {
    /*if (!validateForm(form, setMsg, lang.messages)) {
      return;
    }
    if (await loginReq(request, login, form)) {
      closeModal();
    }*/
  };
  console.log(channels);
  const channelsInputs = availableChannels.map((channel) => {
    return (
      <CheckInput
        key={channel}
        label={lang.channels[channel].title}
        ph={lang.channels[channel].placeholder}
        channel={channel}
        enabled={channels[channel].enabled}
        value={channels[channel].value}
        changeHandler={changeHandler}
      />
    );
  })

  return (
    <Modal closeModal={closeModal} msg={msg} submit={addHandler}>
      <div className="title">{lang.title}</div>
      <Input
        label={lang.description}
        ph={lang.descriptionPh}
        name="description"
        onChange={(e) => setDescription(e.target.value.trim())}
      />
      {channelsInputs}
      <div className="btn" onClick={addHandler}>
        {lang.addButton}
      </div>
    </Modal>
  );
};
/*function validateForm(form, setMsg, messages) {
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
}*/
