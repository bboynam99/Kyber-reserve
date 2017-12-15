import React, { Component } from 'react';
import Header from './component/header/Header';
import Dashboard from './component/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default App;
