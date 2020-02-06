import React from "react";
import {authUser} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    isInitialize: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                isInitialize: true
            };
        default:
            return state;
    }
};

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initialize = () => dispatch => {
    const promise = dispatch(authUser());
    promise.then(() => dispatch(initializedSuccess()));
};

export default appReducer;