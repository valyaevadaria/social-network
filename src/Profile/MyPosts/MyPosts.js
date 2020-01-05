import React from 'react';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const NewPostForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field component={'textarea'} name={'newPostText'}></Field>
          </div>
          <button>Add new post</button>
      </form>
  );
};

const NewPostReduxForm = reduxForm({form: 'newPost'})(NewPostForm);

const MyPosts = (props) => {
    const postsElements = props.posts.map(el => <Post postMessage={el.text} likes={el.likesCount}/>);

    const addPost = (formData) => {
      props.addPost(formData.newPostText);
    };

    return (
        <div>
            <h3>My Posts</h3>
            <NewPostReduxForm onSubmit={addPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;