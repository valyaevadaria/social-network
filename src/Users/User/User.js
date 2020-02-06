import React from 'react';
import users from './User.module.css';
import profilePhoto from '../../content/images/profile-photo-png.png';
import {NavLink} from 'react-router-dom';

const User = (props) => {
    const deleteFriend = () => props.followUnfollowFlow(props.id, true);
    const addFriend = () => props.followUnfollowFlow(props.id, false);
    const isDisabled = (userId) => props.followingInProgress.some(id => id === userId);

    return (
        <div>
            <div>
                <h3>{props.name}</h3>
                <div className={users.photo}>
                    <NavLink to={`/profile/` + props.id}>
                        <img src={props.photo === null ? profilePhoto : props.photo}/>
                    </NavLink>
                </div>
                <span>{props.userStatus}</span>
            </div>
            {(props.followed) ?
                <button disabled={isDisabled(props.id)} onClick={deleteFriend}>Unfollow</button>
                : <button disabled={isDisabled(props.id)} onClick={addFriend}>Follow</button>}
        </div>
    );
};

export default User;