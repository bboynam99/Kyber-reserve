import React, { Component } from 'react';
import Navigation from './Navigation';

class Header extends Component {
    menu = ['dashboard', 'rates keeper', 'rates crosser', 'raw prices', 'configuration', 'exchange balance'];

    constructor(){
        super();
        this.state = {
            menuActive: 0
        }
    }
    render() {
        return (
            <header>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                        <a className="navbar-brand" href="">
                            <img src="/img/logo.png" alt="" />
                        </a>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarToggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Navigation menu={this.menu} menuActive={this.state.menuActive}/>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
