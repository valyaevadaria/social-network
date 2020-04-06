import {authAPI, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";

const SET_USER:string = 'SET_USER';

export type initialState = typeof initialState;

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
};

type ActionsType = setAuthUserDataActionType

const authReducer = (state = initialState, action: ActionsType): initialState => {
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

type pyloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};

type setAuthUserDataActionType = {
    type: typeof SET_USER
    payload: pyloadType
};

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({ type: SET_USER, payload: {userId, email, login, isAuth}});

type ThunkActionType = ThunkAction<Promise<void>, StateType, unknown, ActionsType>

export const authUser = (): ThunkActionType => async (dispatch) => {
    const data = await authAPI.isAuth();
        if (data.resultCode === ResultCodesEnum.Success) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
};

export const login = (login: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.setLogin(login, password, rememberMe);
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(authUser());
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0]
                : 'Some error! Please, send a message about it to support@travel.com';
            dispatch(stopSubmit('login', {_error: message}));
        }
};

export const logout = (): ThunkActionType => async (dispatch) => {
    const response = await authAPI.makeLogout();
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
};

export default authReducer;