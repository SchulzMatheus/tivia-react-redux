import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';

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
          <Route path="/config" component={ Config } />
        </Switch>
      </div>
    );
  }
}

export default connect()(App);
