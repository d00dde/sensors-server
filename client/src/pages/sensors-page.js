import React, { useState, useContext, useEffect } from 'react';
import Page from './page-wrapper';
import SensorsList from '../components/sensors-list';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../hooks/http-hook';
import { fetch, setModal } from '../redux/actions';

export default () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { userName, language, sensors } = useSelector((state) => {
    return {
      userName: state.name,
      language: state.language.sensorsList,
      sensors: state.sensors,
    };
  });

  useEffect(() => {
    dispatch(fetch(request, 'sensors','getSensors', null));
  }, [request]);

  const addHandler = () => {
    dispatch(setModal('addSensor'));
  }
  const sensorsList = sensors && sensors.length ? <SensorsList /> : language.noSensors;

  return (
    <Page className='sensors-page'>
      <div className='toolbar'>  
        <div className='name'>{userName}</div>
        <div className='add-btn' onClick={addHandler}>{language.addBtn}</div>
      </div>
      {sensorsList}
    </Page>
  );
};
