import React, { useState, useContext, useEffect } from 'react';
import Loader from '../components/loader';
import SensorsList from '../components/sensors-list';
import { useSelector } from 'react-redux';
import { useHttp } from '../hooks/http-hook';
import styled from 'styled-components';

const AddButton = styled.div`
  width: 100px;
  padding: 10px;
  background-color: #2196f3;
  border: 2px solid #2196f3;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: #eee;
    color: #2196f3;
    cursor: pointer;
  }
`;

export default () => {
  const [sensors, setSensors] = useState([]);
  const { request, loading } = useHttp();
  const { token, userName } = useSelector((state) => {
    return {
      token: state.token, 
      userName: state.userName,
    };
  });

  useEffect(() => {
    async function getSensors() {
      try {
        console.log(token);
        const response = await request('/sensor', 'GET', null, {
          Authorization: `Bearer ${token}`,
        });
        
        setSensors(response);
      } catch (err) {}
    }
    getSensors();
  }, [token, request]);

  const addHandler = async () => {
    try {
      const data = {
        description: '42',
        channels: [
          { channel: 'telegram', address: '@D00dde1' },
          { channel: 'tel', address: '+380972074557' },
        ],
      };
      const response = await request('/sensor/add', 'POST', data, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const updateHandler = async (_id) => {
    try {
      const data = {
        description: '42',
        channels: [
          { channel: 'email', address: '@D00dde2' },
          { channel: 'tel', address: '+380972074557' },
        ],
      };
      await request(`/sensor/${_id}`, 'PUT', data, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const deleteHandler = async (_id) => {
    try {
      await request(`/sensor/${_id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <h2>{userName}</h2>
      <AddButton onClick={addHandler}>Add</AddButton>
      {!loading && sensors && (
        <SensorsList
          sensors={sensors}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
};
