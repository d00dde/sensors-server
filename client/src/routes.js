import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SensorsPage from './pages/sensors-page';
// import CreatePage from './pages/create-page';
import DetailPage from './pages/detail-page';
import AuthPage from './pages/auth-page';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/sensors" exact>
          <SensorsPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/sensors" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
