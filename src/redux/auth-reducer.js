import {authAPI} from "../api/api";
import React from "react";
import {stopSubmit} from "redux-form";

const SET_USER = 'SET_USER';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
              ...state,
              ...action.payload
            };
        default:
            return state;
    };
};

const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER, payload: {userId, email, login, isAuth}});

export const authUser = () => async dispatch => {
    const data = await authAPI.isAuth();
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
};

export const login = (login, password, rememberMe) => async dispatch => {
    const response = await authAPI.setLogin(login, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(authUser());
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0]
                : 'Some error! Please, send a message about it to support@travel.com';
            dispatch(stopSubmit('login', {_error: message}));
        }
};

export const logout = () => async dispatch => {
    const response = await authAPI.makeLogout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
};

export default authReducer;