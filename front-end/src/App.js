import './styles/settings.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import Routes from './components/Routes/Routes';

function App() {
  return (
    <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
}

export default App;
