import React from 'react';
import header from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={header.head}>
            <div className={header.loginBlock}>
                { props.auth.isAuth ? props.auth.login :
                <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </div>
    );
};

export default Header;