import React from 'react';
import {addNewPostCreator, updateNewPostTextCreator} from "../../redux/reduceProfile";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            const action = addNewPostCreator();
            dispatch(action);
        },

        updateNewPostText: (text) => {
            const action = updateNewPostTextCreator(text);
            dispatch(action);
        }
    };
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;