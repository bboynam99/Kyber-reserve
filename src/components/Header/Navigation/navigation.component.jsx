import React, { Component } from 'react';
import NavigationView from "./navigation.view"

class Navigation extends Component {
  menu = ['dashboard', 'rates keeper', 'rates crosser', 'raw prices', 'configuration', 'exchange balance'];

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