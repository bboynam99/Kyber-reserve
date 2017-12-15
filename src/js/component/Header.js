import React, { Component } from 'react';

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
                        <a className="navbar-brand" href="#">
                            <img src="assets/img/logo.png" alt="" />
                        </a>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarToggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarToggler">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-end">
                                {this.menu.map((item,i) => {
                                    let active = this.state.menuActive === i ? 'active' : '';
                                    return (
                                        <li className={"nav-item " + active} key={i}>
                                            <a className='nav-link'  href="#">
                                                {item}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
