import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainPage from '../pages/main-page';
import UsersPage from '../pages/users-page';
import SensorsPage from '../pages/sensors-page';
import EventsPage from '../pages/events-page';

export const useRoutes = () => {
  const { token, role } = useSelector(({token, role}) => {
    return {token, role};
  });
  if (!token){
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } 
  if (role === 'user') {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/sensors">
          <SensorsPage />
        </Route>
        <Route path="/events/:id">
          <EventsPage />
        </Route>
        <Redirect to="/sensors" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/sensors">
          <SensorsPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/events/:id">
          <EventsPage />
        </Route>
        <Redirect to="/sensors" />
      </Switch>
    );
  }
};
