import React from 'react';
import './App.css';
import Profile from "./Profile/Profile";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import {Route} from "react-router";
import Dialogs from "./Dialogs/Dialogs";
import UsersContainer from "./Users/usersContainer";

const App = (props) => {
  return (
    <div className='app-wrapper'>
        <Header/>
        <div className='content'>
            <Route path='/profile' render={() => <Profile/>}/>
            <Route path='/dialogs' render={() => <Dialogs/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
        </div>
        <Sidebar/>
    </div>
  );
};

export default App;
