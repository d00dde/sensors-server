import React, { useEffect } from 'react';
import Page from './page-wrapper';
import SensorsList from '../components/sensors-list';
import { useDispatch, useSelector } from 'react-redux';
import { fetch, setModal } from '../redux/actions';
import { useHttp } from '../hooks/http-hook';

export default () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { userName, language } = useSelector((state) => {
    return {
      userName: state.name,
      language: state.language.sensorsList,
    };
  });
  useEffect(() => {
    dispatch(fetch(request, 'sensors', 'getSensors', null));
  }, [request, dispatch]);

  const addHandler = () => {
    dispatch(setModal('addSensor'));
  };

  return (
    <Page className="sensors-page">
      <div className="toolbar">
        <div className="name">{userName}</div>
        <div className="add-btn" onClick={addHandler}>
          {language.addBtn}
        </div>
      </div>
      <SensorsList />
    </Page>
  );
};
