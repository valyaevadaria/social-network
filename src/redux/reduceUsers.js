import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TUGGLE_FETCH = 'TUGGLE_FETCH';
const TUGGLE_IS_FOLLOWING_PROGRESS = 'TUGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    totalUsersCount: 0,
    countOnPage: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const reduceUsers = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
              ...state,
              users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };
        case SET_USERS:
            return {
              ...state,
              users: [...state.users, ...action.users]
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            };
        case SET_CURRENT_PAGE:
            return {
              ...state,
              currentPage: action.current
            };
        case TUGGLE_FETCH:
            return {
                ...state,
                isFetching: action.flag
            };
        case TUGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.flag ?
                    [ ...state.followingInProgress, action.userId ] :
                    state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

const followSucsess = (userId) => ({ type: FOLLOW, userId });
const unfollowSucsess = (userId) => ({ type: UNFOLLOW, userId });
const setUsers = (users) => ({ type: SET_USERS, users});
const setTotalCount = (count) => ({ type: SET_TOTAL_COUNT, count});
const setCurrentPage = (current) => ({ type: SET_CURRENT_PAGE, current});
const tuggleFetch = (flag) => ({ type: TUGGLE_FETCH, flag});
const tuggleFollowProgress = (flag, userId) => ({ type: TUGGLE_IS_FOLLOWING_PROGRESS, flag, userId});

export const getUsers = (currentPage, countOnPage) => async dispatch => {
    dispatch(tuggleFetch(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, countOnPage);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(tuggleFetch(false));
};

export const followUnfollowFlow = (userId, isFollow) => async dispatch => {
    dispatch(tuggleFollowProgress(true, userId));
    let data = await (isFollow ? usersAPI.unfollow : usersAPI.follow)(userId);
    if (data.resultCode === 0) {
        dispatch((isFollow ? unfollowSucsess : followSucsess)(userId));
    }
    dispatch(tuggleFollowProgress(false, userId));
};

export default reduceUsers;

/* another refactoring follow/unfollow
* const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
*   dispatch(toggleFollowingProgress(true, userId));
*   let response = await apiMethod(userId);
*   if (response.data.resultCode == 0) {
*       dispatch(actionCreator(userId));
*   }
*   dispatch(toggleFollowingProgress(false, userId));
* }
*
* export const follow = (userId) => {
*   return async (dispatch) => {
*       const apiMethod = usersAPI.follow.bind(userAPI);
*       const actionCreator = followSuccess;
*       followUnfollow(dispatch, userId, apiMethod, actionCreator);
*   }
* }
*
* This method is better when we don't want to change code which use these thunks.
* Although my decision is shorter and simple.
* */

