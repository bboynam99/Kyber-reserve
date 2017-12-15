import React from 'react';

const Navigation = (props) => {
    return (
        <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-100 justify-content-end">
                {props.menu.map((item, i) => {
                    let active = props.menuActive === i ? 'active' : '';
                    return (
                        <li className={"nav-item " + active} key={i}>
                            <a className='nav-link' href="#f">
                                {item}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Navigation;
