import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository" component={Repository} />
  </Switch>
)

export default Routes;

/**
 * exact força o endereço ser exatamente o path no caso /
 * Switch força o dom exibir apenas uma Route por vez
 */