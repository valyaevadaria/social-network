import {authAPI} from "../api/api";

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
              ...action.data,
                isAuth: true
            };
        default:
            return state;
    };
};

const setAuthUserData = (userId, email, login) => ({ type: SET_USER, data: {userId, email, login}});

export const authUser = () => dispatch => {
    authAPI.isAuth().then(data => {
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login));
        }
    });
};

export default authReducer;