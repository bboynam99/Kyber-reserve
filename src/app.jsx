import React from 'react';
import { Header } from './components/Header'
import { TokenInfo } from './components/TokenInfo'

import 'normalize.css';
import './assets/css/app.scss';


const App = () => (
  <div>
    <Header/>
    <TokenInfo/>
  </div>
);

export default App;
