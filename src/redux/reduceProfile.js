import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

const initialState = {
    posts: [
        { id: 1, text: 'I will be good', likesCount: 5 },
        { id: 2, text: 'Hi, Friends!', likesCount: 10 },
        { id: 3, text: 'My English is getting better.', likesCount: 18 }
    ],
    userData: null,
    userStatus: ''
};

const reduceProfile = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = { id: 4, text: action.newPostText, likesCount: 0 };
            return {
                ...state,
                posts: [...state.posts, newPost],
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

export const addNewPostCreator = (newPostText) => ({ type: ADD_POST, newPostText });
const setProfile = (userData) => ({ type: SET_USER_PROFILE, userData});
const setStatus = (status) => ({ type: SET_USER_STATUS, status });

export const setUserProfile = (userId) => dispatch => {
    profileAPI.setProfile(userId)
        .then( response => {
            dispatch(setProfile(response.data));
        });
};

export const getUserStatus = (userId) => dispatch => {
  profileAPI.getStatus(userId)
      .then( status => {
         dispatch(setStatus(status));
      });
};

export const updateUserStatus = (status) => dispatch => {
    profileAPI.updateStatus(status)
        .then( response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
};

export default reduceProfile;