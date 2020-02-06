import React from 'react';
import './App.css';
import ProfileContainer from "./Profile/Profile";
import HeaderContainer from "./Header/HeaderContainer";
import Sidebar from "./Sidebar/Sidebar";
import {Route, withRouter} from "react-router";
import Dialogs from "./Dialogs/Dialogs";
import UsersContainer from "./Users/usersContainer";
import Login from "./Login/Login";
import {connect, Provider} from "react-redux";
import {initialize} from './redux/appReducer';
import {compose} from "redux";
import Preloader from "./common/Preloader/Preloader";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";


class App extends React.Component {
    componentDidMount() {
        this.props.initialize();
    }

    render() {
        if (!this.props.isInitialize) {
            return <Preloader/>;
        }
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
    }
};

const mapStateToProps = (state) => ({
    isInitialize: state.app.isInitialize
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initialize})
)(App);


const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
};

export default MainApp;