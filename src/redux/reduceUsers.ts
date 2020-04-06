import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TUGGLE_FETCH = 'TUGGLE_FETCH';
const TUGGLE_IS_FOLLOWING_PROGRESS = 'TUGGLE_IS_FOLLOWING_PROGRESS';

export type initialState = typeof initialState;

export type userType = {
    id: number
    name: string
    status: string
    photos: any
    followed: boolean
}

const initialState = {
    users: [] as Array<userType>,
    totalUsersCount: 0,
    countOnPage: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type ActionsTypes = followSucsessType | unfollowSucsessType | setUsersType | setTotalCountType |
    setCurrentPageType | tuggleFetchType | tuggleFollowProgressType

const reduceUsers = (state = initialState, action: ActionsTypes): initialState => {
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

type followSucsessType = {
    type: typeof FOLLOW
    userId: number
}
const followSucsess = (userId: number): followSucsessType => ({ type: FOLLOW, userId });
type unfollowSucsessType = {
    type: typeof UNFOLLOW
    userId: number
}
const unfollowSucsess = (userId: number): unfollowSucsessType => ({ type: UNFOLLOW, userId });
type setUsersType = {
    type: typeof SET_USERS
    users: Array<userType>
}
const setUsers = (users: Array<userType>): setUsersType => ({ type: SET_USERS, users});
type setTotalCountType = {
    type: typeof SET_TOTAL_COUNT
    count: number
}
const setTotalCount = (count: number): setTotalCountType => ({ type: SET_TOTAL_COUNT, count});
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    current: number
}
const setCurrentPage = (current: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, current});
type tuggleFetchType = {
    type: typeof TUGGLE_FETCH
    flag: boolean
}
const tuggleFetch = (flag: boolean): tuggleFetchType => ({ type: TUGGLE_FETCH, flag});
type tuggleFollowProgressType = {
    type: typeof TUGGLE_IS_FOLLOWING_PROGRESS
    flag: boolean
    userId: number
}
const tuggleFollowProgress = (flag: boolean, userId: number): tuggleFollowProgressType => ({ type: TUGGLE_IS_FOLLOWING_PROGRESS, flag, userId});

export const getUsers = (currentPage: number, countOnPage: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(tuggleFetch(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, countOnPage);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(tuggleFetch(false));
};

export const followUnfollowFlow = (userId: number, isFollow: boolean) => async (dispatch: Dispatch<ActionsTypes>) => {
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

