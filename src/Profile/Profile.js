import React from 'react';
import Description from "./Description/Description";
import MyPostsContainer from "./MyPosts/MyPoststContainer";

const Profile = (props) => {
    return (
      <div>
        <Description/>
        <MyPostsContainer/>
      </div>
    );
};

export default Profile;
