import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainPage from './pages/main-page';
import UsersPage from './pages/users-page';
import SensorsPage from './pages/sensors-page';
import EventsPage from './pages/events-page';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
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
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
