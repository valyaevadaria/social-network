import React from 'react';
import users from './User.module.css';
import profilePhoto from '../../content/images/profile-photo-png.png';
import Preloader from '../../common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';
import {tuggleFollowProgress} from "../../redux/reduceUsers";
import {usersAPI} from "../../api/api";

const Users = (props) => {
    return (
        <div>
            {
                props.users.map(element => {
                    const deleteFriend = () => props.follow(element.id, true);
                    const addFriend = () => props.follow(element.id, false);
                    const isDisabled = (userId) => props.followingInProgress.some(id => id === userId);
                    return (
                        <div>
                            <div>
                                <h3>{element.name}</h3>
                                <div className={users.photo}>
                                    <NavLink to={`/profile/` + element.id}>
                                        <img src={element.photos.small === null ? profilePhoto : element.photos.small}/>
                                    </NavLink>
                                </div>
                                <span>{props.status}</span>
                            </div>
                            {(element.followed) ?
                                <button disabled={isDisabled(element.id)} onClick={deleteFriend}>Unfollow</button>
                                : <button disabled={isDisabled(element.id)} onClick={addFriend}>Follow</button>}
                        </div>
                    )
                })
            }
            <div className='users.showMore'>
                {props.isFetching ? <Preloader /> : null}
                <button onClick={props.onAddUsers}>Show more</button>
            </div>
        </div>
    );
};

export default Users;