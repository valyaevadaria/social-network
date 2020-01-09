import React from 'react';
import header from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={header.head}>
            <div className={header.loginBlock}>
                { props.auth.isAuth ?
                    <div>
                        <div>{props.auth.login}</div>
                        <button onClick={props.logout}>Logout</button>
                    </div> :
                <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </div>
    );
};

export default Header;