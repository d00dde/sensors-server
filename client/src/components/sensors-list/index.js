import React from 'react';
import { Link } from 'react-router-dom';

export default ({ sensors }) => {
  if (!sensors.length) {
    return <h2 className="center">Добавьте датчик.</h2>;
  }
  return (
    <>
      {sensors.map((sensor, index) => {
        return <Link to={`detail/${sensor._id}`}>{index}</Link>;
      })}
    </>
  );
};
