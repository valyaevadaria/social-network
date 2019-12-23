import React from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";

const stateToPropsForRedirect = (state) => ({ isAuth: state.auth.isAuth });

export const AuthRedirect = (Component) => {
    class AuthRedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to='/login'/>
            }
            return <Component {...this.props}/>
        }
    }

    return connect(stateToPropsForRedirect)(AuthRedirectComponent);
};