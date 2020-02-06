import {createSelector} from "reselect";

export const getUserData = (state) => {
    return state.profilePage.userData;
};

const getUserStatus = (state) => {
    return state.profilePage.userStatus.data;
};

export const changedUserStatus = createSelector(getUserStatus, (status) => {
    if (!status){
        return status;
    }
    return status.toUpperCase();
});

export const getUserId = (state) => {
    return state.auth.userId;
};