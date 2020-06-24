import React, { useState } from 'react';
import Modal from './modal';
import Input from './Input';
import CheckInput from './CheckInput';
import { useHttp } from '../../hooks/http-hook';
import { useDispatch } from 'react-redux';
import { fetch } from '../../redux/actions';
import validators from './validators';
import constants from '../../constants';

const availableChannels = constants.availableChannels;

export default ({ lang, closeModal }) => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [channels, setChannels] = useState(() => {
    return availableChannels.map((channel) => {
      return {channel, enabled: false, address: ''};
    });
  });
  const [msg, setMsg] = useState('');
  const changeHandler = (type, channel, value) => {
    setChannels(channels.map((item) => {
      if(item.channel !== channel)
        return item;
      item[type] = value;
      return item;
    }));
  };

  const addHandler = async () => {
    if (!validateForm(description, channels, setMsg, lang.messages)) {
      return;
    }
    if (await addReq(request, description, channels)) {
      dispatch(fetch(request, 'sensors', 'getSensors', null));
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
        onChange={(e) => setDescription(e.target.value.trim())}
        value={description}
      />
      {channelsInputs}
      <div className="btn" onClick={addHandler}>
        {lang.addButton}
      </div>
    </Modal>
  );
};
function validateForm(description, channels, setMsg, messages) {
  if (!validators.validateDescription(description)) {
    setMsg(messages.descriptionIsEmpty);
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

async function addReq(request, description, channels) {
  const resp = await request('addSensor', {
    description,
    channels: prepareChannels(channels),
  });
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
