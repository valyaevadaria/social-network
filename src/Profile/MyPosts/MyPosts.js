import React from 'react';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthSymbols, required} from "../../utils/validators/validators";
import {Textarea} from "../../common/formsControls/formsControls";

const maxLength50 = maxLengthSymbols(50);
const NewPostForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field component={Textarea} name={'newPostText'}
                     validate={[ required, maxLength50 ]}/>
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