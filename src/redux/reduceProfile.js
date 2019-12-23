import {usersAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
    posts: [
        { id: 1, text: 'I will be good', likesCount: 5 },
        { id: 2, text: 'Hi, Friends!', likesCount: 10 },
        { id: 3, text: 'My English is getting better.', likesCount: 18 }
    ],
    newPostText: 'new',
    userData: null
};

const reduceProfile = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = { id: 4, text: state.newPostText, likesCount: 0 };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userData: action.userData
            }
        default:
            return state;
    };
};

export const addNewPostCreator = () => ({ type: ADD_POST });
export const updateNewPostTextCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
const setProfile = (userData) => ({ type: SET_USER_PROFILE, userData})

export const setUserProfile = (userId) => dispatch => {
    usersAPI.setProfile(userId)
        .then( data => {
            dispatch(setProfile(data));
        });
};

export default reduceProfile;