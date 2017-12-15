import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import './assets/css/app.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();