import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { Header } from './components/Header'

// import App from './app';
import { TokenInfo } from './components/TokenInfo'
import { RateChange } from './components/RateChange';
import Sample from './components/Sample';
// import 'styles/index.scss';
import './assets/css/app.scss';

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={TokenInfo} />
      <Route path="/dashboard" component={TokenInfo} />
      <Route path="/rates_keeper" component={RateChange} />
      <Route path="/sample" component={Sample} />
    </div>
  </Router>
);

export default Routes;
