import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom'
import Config from './pages/Config';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <main>
      <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ Config } />
      </Switch>
    </div>
      </main>
    </div>
  );
}
