import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, setSensorId } from '../../redux/actions';
import './sensors-list.scss';

export default () => {
  const dispatch = useDispatch();
  const { sensors, language } = useSelector((state) => {
    return {
      sensors: state.sensors,
      language: state.language.sensorsList,
    };
  });
  const updateHandler = (id) => {
    dispatch(setSensorId(id));
    dispatch(setModal('updateSensor'));
  };
  const deleteHandler = (id) => {
    dispatch(setSensorId(id));
    dispatch(setModal('deleteSensor'));
  };

  const sensorsList =
    sensors && sensors.length ? (
      sensors.map(({ _id, description, channels }) => {
        return (
          <div key={_id} className="sensor-item">
            <span>{description}</span>
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
