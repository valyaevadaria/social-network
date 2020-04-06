import {createSelector} from "reselect";
import {StateType} from "../store";

export const getUserData = (state: StateType) => {
    return state.profilePage.userData;
};

const getUserStatus = (state: StateType) => {
    return state.profilePage.userStatus;
};

export const changedUserStatus = createSelector(getUserStatus, (status) => {
    if (!status){
        return status;
    }
    return status.toUpperCase();
});

export const getUserId = (state: StateType) => {
    return state.auth.userId;
};