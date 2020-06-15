import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/actions';
import './sensors-list.scss';

export default () => {
  const dispatch = useDispatch();
  const { sensors, language } = useSelector((state) => {
    return {
      sensors: state.sensors,
      language: state.language.sensorsList,
    };
  });
  const updateHandler = async (_id) => {
    console.log('update');
  };
  const deleteHandler = async (_id) => {
    console.log('delete');
  };

  const sensorsList =
    sensors && sensors.length ? (
      sensors.map(({ _id, description }) => {
        return (
          <div key={_id} className="sensor-item">
            <span>{description}</span>
            <div className="update-btn" onClick={updateHandler}>
              {language.updateBtn}
            </div>
            <div className="delete-btn" onClick={deleteHandler}>
              {language.deleteBtn}
            </div>
          </div>
        );
      })
    ) : (
      <div className="no-sensors">{language.noSensors}</div>
    );
  return <div className="sensors-list">{sensorsList}</div>;
};
