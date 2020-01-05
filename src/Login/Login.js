import React from 'react';
import {Field, reduxForm} from "redux-form";
import {loginUser} from "../redux/auth-reducer";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'} name={'login'} type={'text'} placeholder={'Login'}/>
            </div>
            <div>
                <Field component={'input'} name={'password'} type={'password'} placeholder={'Password'}/>
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type='checkbox'/> remember me
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

const Login = () => {
    const onSubmit = (formData) => {
        loginUser(formData.login, formData.password, formData.rememberMe);
    };

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;