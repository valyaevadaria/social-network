import React from 'react';
import Post from "./Post/Post";

const MyPosts = (props) => {
    const postsElements = props.posts.map(el => <Post postMessage={el.text} likes={el.likesCount}/>);

    //const newPostElement = React.createRef();

    const addPost = () => {
      props.addPost();
    };

    const onPostChange = (e) => {
        const text = e.target.value;//newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              //ref={newPostElement}
                              value={props.newPostText}
                    ></textarea>
                </div>
                <button onClick={addPost}>Add new post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;