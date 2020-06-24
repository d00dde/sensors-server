import React, { useState } from 'react';
import Modal from './modal';
import Input from './Input';
import CheckInput from './CheckInput';
import { useHttp } from '../../hooks/http-hook';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetch } from '../../redux/actions';
import validators from './validators';
import constants from '../../constants';

const availableChannels = constants.availableChannels;

export default ({ lang, closeModal }) => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const userId = useLocation().pathname.split('/').pop();
  const [form, setForm] = useState({
    description: 'TEST',
    systemID: '42',
    secret: 'secret',
  });
  const [channels, setChannels] = useState(() => {
    return availableChannels.map((channel) => {
      return {channel, enabled: false, address: ''};
    });
  });
  const [msg, setMsg] = useState('');
  const inputsHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const changeHandler = (type, channel, value) => {
    setChannels(channels.map((item) => {
      if(item.channel !== channel)
        return item;
      item[type] = value;
      return item;
    }));
  };
  const addHandler = async () => {
    if (!validateForm(form, channels, setMsg, lang.messages)) {
      return;
    }
    if (await addReq(request, form, channels, userId)) {
      dispatch(fetch(request, 'sensors', 'getSensorsAdmin', null, userId));
      closeModal();
    }
  };
  const channelsInputs = channels.map((item) => {
    return (
      <CheckInput
        key={item.channel}
        label={lang.channels[item.channel].title}
        ph={lang.channels[item.channel].placeholder}
        channel={item.channel}
        enabled={item.enabled}
        address={item.address}
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
        onChange={inputsHandler}
        value={form.description}
      />
      <Input
        label={lang.systemID}
        ph={lang.systemIDPh}
        name="systemID"
        onChange={inputsHandler}
        value={form.systemID}
      />
      <Input
        label={lang.secret}
        ph={lang.secretPh}
        name="secret"
        onChange={inputsHandler}
        value={form.secret}
      />
      {channelsInputs}
      <div className="btn" onClick={addHandler}>
        {lang.addButton}
      </div>
    </Modal>
  );
};
function validateForm(form, channels, setMsg, messages) {
  if (!validators.validateDescription(form.description)) {
    setMsg(messages.descriptionIsEmpty);
    return false;
  }
  if (!validators.validateSystemID(form.systemID)) {
    setMsg(messages.systemIDNoValid);
    return false;
  }
  if (!validators.validateSecret(form.secret)) {
    setMsg(messages.secretNoValid);
    return false;
  }

  if(!validators.channelsIsNoEmpty(channels)) {
    setMsg(messages.noChannels);
    return false;   
  }

  if(!channels.every((channel) => {
    return !(channel.enabled && !validators.channelValidAddress(channel)) 
  })) {
    setMsg(messages.noValidChannelAddress);
    return false;
  }
  setMsg('');
  return true;
}

async function addReq(request, form, channels, userId) {
  const resp = await request(
    'addSensorAdmin',
    {
      ...form,
      channels: prepareChannels(channels),
    }, 
    userId
  );
  if (!resp) {
    return false;
  }
  return true;
}

function prepareChannels(channels) {
  return channels
      .filter((item) => item.enabled)
      .map((item) => {
        return {
          channel: item.channel,
          address: item.address,
        }
      });
}
