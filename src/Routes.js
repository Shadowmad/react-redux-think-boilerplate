// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import Home from './containers/Home/Home';

type Props = {};
type State = {};

export default class Routes extends Component<Props, State> {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
        </Switch>
      </App>
    );
  }
};
