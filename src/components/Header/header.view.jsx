import React from 'react';
import Navigation from './Navigation/navigation.component';

import logo from "../../assets/img/logo.png"

const HeaderView = () => {
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          <a className="navbar-brand" href="">
            <img src={logo} alt="" />
          </a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarToggler">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Navigation/>
        </nav>
      </div>
    </header>
  );
}

export default HeaderView;