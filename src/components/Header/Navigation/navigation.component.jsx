import React, { Component } from 'react';
import NavigationView from "./navigation.view"

class Navigation extends Component {
  menu = [
      {
        name: "dashboard",
        path: "/dashboard"
      },
      {
        name: "rates keeper",
        path: "/rates_keeper"
      },
      {
        name: "rates crosse",
        path: "/rates_crosse"
      },
      {
        name: "raw prices",
        path: "/raw_prices"
      },
      {
        name: "configuration",
        path: "/configuration"
      },
      {
        name: "exchange balance",
        path: "/exchange_balance"
      }
    ];

  constructor() {
    super();
    this.state = {
      menuActive: 0
    }
  }
  render() {
    return (
      <NavigationView
        menu={this.menu}
        menuActive={this.state.menuActive} />
    );
  }
}

export default Navigation;