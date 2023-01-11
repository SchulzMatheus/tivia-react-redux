import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './pages/Login';
import Game from './pages/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={
              (props) => (<Login
                { ...props }
              />)
            }
          />
          <Route
            exact
            path="/game"
            render={
              (props) => (<Game
                { ...props }
              />)
            }
          />
        </Switch>
      </div>
    );
  }
}

export default connect()(App);
