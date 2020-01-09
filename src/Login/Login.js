import React from 'react';
import {Field, reduxForm} from "redux-form";
import {login, logout} from "../redux/auth-reducer";
import {Input} from "../common/formsControls/formsControls";
import {maxLengthSymbols, required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const maxLength40 = maxLengthSymbols(40);
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} type={'text'} placeholder={'E-mail'}
                       validate={[ required, maxLength40 ]} />
            </div>
            <div>
                <Field component={Input} name={'password'} type={'password'} placeholder={'Password'}
                       validate={[ required, maxLength40 ]} />
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type='checkbox'
                       validate={[ required, maxLength40 ]} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
        form: 'login'
    })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Redirect to='/profile'/>;
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};



export default connect( state => ({isAuth: state.auth.isAuth}), {login, logout})(Login);