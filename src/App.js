import React from 'react';
import './App.css';
import ProfileContainer from "./Profile/Profile";
import HeaderContainer from "./Header/HeaderContainer";
import Sidebar from "./Sidebar/Sidebar";
import {Route} from "react-router";
import Dialogs from "./Dialogs/Dialogs";
import UsersContainer from "./Users/usersContainer";
import Login from "./Login/Login";

const App = (props) => {
  return (
    <div className='app-wrapper'>
        <HeaderContainer/>
        <div className='content'>
            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
            <Route path='/dialogs' render={() => <Dialogs/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/login' render={() => <Login/>}/>
        </div>
        <Sidebar/>
    </div>
  );
};

export default App;
