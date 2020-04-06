import {profileAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";

const ADD_POST: string = 'ADD_POST';
const DELETE_POST: string = 'DELETE_POST';
const SET_USER_PROFILE: string = 'SET_USER_PROFILE';
const SET_USER_STATUS: string = 'SET_USER_STATUS';

type postType = {
    id: number
    text: string
    likesCount: number
}

export type initialState = typeof initialState

const initialState = {
    posts: [
        { id: 1, text: 'I will be good', likesCount: 5 },
        { id: 2, text: 'Hi, Friends!', likesCount: 10 },
        { id: 3, text: 'My English is getting better.', likesCount: 18 }
    ] as Array<postType>,
    userData: null as object | null,
    userStatus: ''
}

type ActionsTypes = addNewPostType | deletePostType | setProfileType | setStatusType

const reduceProfile = (state = initialState, action: any): initialState => {
    switch (action.type) {
        case ADD_POST:
            const newPost = { id: 4, text: action.newPostText, likesCount: 0 };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userData: action.userData
            };
        case SET_USER_STATUS:
            return {
              ...state,
              userStatus: action.status
            };
        default:
            return state;
    };
};

type addNewPostType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addNewPostCreator = (newPostText: string): addNewPostType => ({ type: ADD_POST, newPostText });
type deletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): deletePostType => ({ type: DELETE_POST, postId });
type setProfileType = {
    type: typeof SET_USER_PROFILE
    userData: object
}
const setProfile = (userData: object): setProfileType => ({ type: SET_USER_PROFILE, userData});
type setStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
const setStatus = (status: any): setStatusType => ({ type: SET_USER_STATUS, status });

type ThunkActionType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>

export const setUserProfile = (userId: number): ThunkActionType => async (dispatch) => {
    const response = await profileAPI.setProfile(userId);
    dispatch(setProfile(response.data));
};

export const getStatus = (userId: number): ThunkActionType => async (dispatch: any) => {
  const status = await profileAPI.getStatus(userId);
  dispatch(setStatus(await status));
};

export const updateUserStatus = (status: string): ThunkActionType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
};

export default reduceProfile;