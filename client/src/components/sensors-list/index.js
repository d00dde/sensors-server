import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sensor = styled.div`
  padding: 10px;
  margin: 5px;
  display: flex;
  background-color: green;
  font-size: 1.2rem;
`;
const SensorLink = styled(Link)`
  display: block;
  width: 50%;
  height: 100%;
`;
const DeleteButton = styled.div`
  width: 50%;
  height: 100%;
  background-color: tomato;
  cursor: pointer;
`;

export default ({ sensors, updateHandler, deleteHandler }) => {
  if (!sensors.length) {
    return <h2 className="center">Добавьте датчик.</h2>;
  }
  return (
    <>
      {sensors.map((sensor, index) => {
        return (
          <Sensor key={sensor._id}>
            <SensorLink
              /*to={`detail/${sensor._id}`}*/
              onClick={() => updateHandler(sensor._id)}
            >
              {sensor._id}
            </SensorLink>
            <DeleteButton onClick={() => deleteHandler(sensor._id)}>
              Del
            </DeleteButton>
          </Sensor>
        );
      })}
    </>
  );
};
