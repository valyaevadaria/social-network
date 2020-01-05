import {authAPI} from "../api/api";

const SET_USER = 'SET_USER';
const SET_LOGIN = 'SET_LOGIN';

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
const setLoginData = () => ({ type: 'SET_LOGIN'});

export const authUser = () => dispatch => {
    authAPI.isAuth().then(data => {
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login));
        }
    });
};

export const loginUser = (login, password, rememberMe) => {
    authAPI.setLogin(login, password, rememberMe)
        .then(response => {
            response.data.resultCode === 0 ?
                alert('User is authorized successful!') :
                alert('Data is wrong! Try again');
        });
};

export default authReducer;