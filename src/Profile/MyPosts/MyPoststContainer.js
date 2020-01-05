import React from 'react';
import {addNewPostCreator} from "../../redux/reduceProfile";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            const action = addNewPostCreator(newPostText);
            dispatch(action);
        }
    };
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;