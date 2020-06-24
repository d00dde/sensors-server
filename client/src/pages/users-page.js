import React, { useEffect } from 'react';
import Page from './page-wrapper';
import UsersList from '../components/users-list';
import { useDispatch } from 'react-redux';
import { fetch } from '../redux/actions';
import { useHttp } from '../hooks/http-hook';

export default () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  useEffect(() => {
    dispatch(fetch(request, 'users', 'getUsers', null));
  }, [request, dispatch]);
  return (
    <Page className="users-page">
    <UsersList />
    </Page>
  );
};
