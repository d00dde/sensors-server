import React, { useState, useContext, useEffect } from 'react';
import Loader from '../components/loader';
import SensorsList from '../components/sensors-list';
import { AuthContext } from '../context/auth-context';
import { useHttp } from '../hooks/http-hook';

export default () => {
  const [sensors, setSensors] = useState([]);
  const { request, loading } = useHttp();
  const { token, userName } = useContext(AuthContext);

  useEffect(() => {
    async function getSensors() {
      try {
        const response = await request('/api/sensor', 'GET', null, {
          Authorization: `Bearer ${token}`,
        });
        setSensors(response);
      } catch (err) {}
    }
    // getSensors();
  }, [token, request]);

  if (loading) {
    return <Loader />;
  }
  console.log(userName);
  return (
    <>
      <h2>{userName}</h2>
      {!loading && sensors && <SensorsList sensors={sensors} />}
    </>
  );
};
