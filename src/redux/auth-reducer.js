import {authAPI} from "../api/api";
import React from "react";

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

export const authUser = () => dispatch => {
    authAPI.isAuth().then(data => {
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
};

export const login = (login, password, rememberMe) => dispatch => {
    authAPI.setLogin(login, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authUser());
            } else {
                alert('Data is wrong! Try again');
            }
        });
};

export const logout = () => dispatch => {
    authAPI.makeLogout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};

export default authReducer;