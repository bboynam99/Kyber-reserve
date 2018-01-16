import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavigationView = (props) => {
    return (
        <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-end">
                {props.menu.map((item, i) => {
                    let active = props.menuActive === i ? 'active' : '';
                    return (
                        <li className={"nav-item " + active} key={i}>
                            <NavLink activeClassName="active" className='nav-link' to={item.path}>{item.name}</NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default NavigationView;