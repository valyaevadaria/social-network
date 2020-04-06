import {authUser} from "./auth-reducer";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";

const INITIALIZED_SUCCESS: string = 'INITIALIZED_SUCCESS';

export type initialState = {
    isInitialize: boolean
};

const initialState: initialState = {
    isInitialize: false
};

type ActionsTypes = initializedSuccessAction

const appReducer = (state = initialState, action: ActionsTypes): initialState => {
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

type initializedSuccessAction = {
    type: typeof INITIALIZED_SUCCESS
};

const initializedSuccess = (): initializedSuccessAction => ({type: INITIALIZED_SUCCESS});

type ThunkActionType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>

export const initialize = (): ThunkActionType => async (dispatch) => {
    const promise = dispatch(authUser());
    promise.then(() => dispatch(initializedSuccess()));
};

export default appReducer;