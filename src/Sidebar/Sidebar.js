import React from 'react';
import sidebar from './Sidebar.module.css';
import {NavLink} from "react-router-dom";


const Sidebar = () => {
    return (
        <div className={sidebar.nav}>
            <div className={sidebar.menu}>
                <NavLink to='/profile'>Profile</NavLink>
                <NavLink to='/dialogs'>Dialogs</NavLink>
                <NavLink to='/users'>Friends</NavLink>
            </div>

        </div>
    );
};

export default Sidebar;