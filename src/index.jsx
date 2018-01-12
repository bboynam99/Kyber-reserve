import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Routes from './routes'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from "react-redux"
import { persistor, store } from "./store"

import "./assets/chart/amcharts.js"

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </PersistGate>,

  // <AppContainer>
  //     <Routes />
  // </AppContainer>,
  document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </PersistGate>,

      // <AppContainer>
      //   <NextApp/>
      // </AppContainer>,
      document.getElementById('app')
    );
  });
}
