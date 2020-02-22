import React from 'react';
import './App.css';
import ProfileContainer from "./Profile/Profile";
import HeaderContainer from "./Header/HeaderContainer";
import Sidebar from "./Sidebar/Sidebar";
import {Route, withRouter} from "react-router";
import Dialogs from "./Dialogs/Dialogs";
import {connect, Provider} from "react-redux";
import {initialize} from './redux/appReducer';
import {compose} from "redux";
import Preloader from "./common/Preloader/Preloader";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";
import {suspenseComponent} from "./hoc/suspenseComponent";

const UsersContainer = React.lazy(() => import('./Users/usersContainer'));
const Login = React.lazy(() => import('./Login/Login'));

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
                    <Route path='/users' render={suspenseComponent(UsersContainer)}/>
                    <Route path='/login' render={suspenseComponent(Login)}/>
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