import React, { useEffect } from 'react';
import Page from './page-wrapper';
import SensorsList from '../components/sensors-list';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetch, setModal, setValue } from '../redux/actions';
import { useHttp } from '../hooks/http-hook';
import { useAuth } from '../hooks/auth-hook';

export default () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const userId = useParams().id;
  const { getName } = useAuth();
  const { userName, language } = useSelector((state) => {
    return {
      userName: state.name,
      language: state.language.sensorsList,
    };
  });
  useEffect(() => {
    if(userId) {
      dispatch(fetch(request, 'sensors', 'getSensorsAdmin', null, userId));
    } else {
      dispatch(setValue('name', getName()));
      dispatch(fetch(request, 'sensors', 'getSensors')); 
    }
  }, [request, dispatch, getName, userId]);

  const addHandler = () => {
    if(userId) {
      dispatch(setModal('addSensorAdmin'));
    } else {
      dispatch(setModal('addSensor'));
    }
  };

  return (
    <Page className="sensors-page">
      <div className="toolbar">
        <div className="name">{userName}</div>
        <div className="add-btn" onClick={addHandler}>
          {language.addBtn}
        </div>
      </div>
      <SensorsList userId={userId}/>
    </Page>
  );
};
