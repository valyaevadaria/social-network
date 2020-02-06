import React from 'react';
import {Field, reduxForm} from "redux-form";
import {login, logout} from "../redux/auth-reducer";
import {Input} from "../common/formsControls/formsControls";
import {maxLengthSymbols, required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import style from "../common/formsControls/formsControls.module.css";

const maxLength40 = maxLengthSymbols(40);
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {(error) &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <Field component={Input} name={'email'} type={'text'} placeholder={'E-mail'}
                       validate={[ required, maxLength40 ]} />
            </div>
            <div>
                <Field component={Input} name={'password'} type={'password'} placeholder={'Password'}
                       validate={[ required, maxLength40 ]} />
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type='checkbox' /> remember me
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