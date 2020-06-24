import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, setValue } from '../../redux/actions';
import './sensors-list.scss';

export default ({ userId }) => {
  const dispatch = useDispatch();
  const { sensors, language } = useSelector((state) => {
    return {
      sensors: state.sensors,
      language: state.language.sensorsList,
    };
  });
  const updateHandler = (id) => {
    dispatch(setValue('sensor_id', id));
    if(userId) {
      dispatch(setModal('updateSensorAdmin'));
    } else {
      dispatch(setModal('updateSensor'));
    }
  };
  const deleteHandler = (id) => {
    dispatch(setValue('sensor_id', id));
    if(userId) {
      dispatch(setModal('deleteSensorAdmin'));
    } else {
      dispatch(setModal('deleteSensor'));
    }
  };
  const sensorsList =
    sensors && sensors.length ? (
      sensors.map(({ _id, description, channels }) => {
        return (
          <div key={_id} className="sensor-item">
            <Link to={`/events/${_id}`}>{description}</Link>
            <div className="update-btn" onClick={() => updateHandler(_id)}>
              {language.updateBtn}
            </div>
            <div className="delete-btn" onClick={() => deleteHandler(_id)}>
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
