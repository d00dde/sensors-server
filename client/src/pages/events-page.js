import React, { useEffect } from 'react';
import Page from './page-wrapper';
import EventsList from '../components/events-list';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetch } from '../redux/actions';
import { useHttp } from '../hooks/http-hook';

export default () => {
  const dispatch = useDispatch();
  const role = useSelector(({role}) => role);
  const { request } = useHttp();
  const sensorId = useParams().id;
  useEffect(() => {
  	if(role === 'user') {
  		dispatch(fetch(request, 'events', 'getEvents', null, sensorId));
  	} else {
  		dispatch(fetch(request, 'events', 'getEventsAdmin', null, sensorId));
  	}
  }, [request, dispatch, sensorId, role]);
  return (
    <Page className="users-page">
    <EventsList />
    </Page>
  );
};