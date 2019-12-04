import React from 'react';

const Post = (props) => {
    return (
        <div>
            <p>{props.postMessage}</p>
            <p>like {props.likes}</p>
        </div>
    );
};

export default Post;