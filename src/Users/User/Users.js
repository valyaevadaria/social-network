import React from 'react';
import users from './User.module.css';
import profilePhoto from '../../content/images/profile-photo-png.png';
import Preloader from '../../common/Preloader/Preloader';

const Users = (props) => {
    return (
        <div>
            {
                props.users.map(element => {
                    const deleteFriend = () => props.deleteFriend(element.id);
                    const addFriend = () => props.addFriend(element.id);

                    return (
                        <div>
                            <div>
                                <h3>{element.name}</h3>
                                <div className={users.photo}>
                                    <img src={element.photos.small === null ? profilePhoto : element.photos.small}/>
                                </div>
                                <span>{props.status}</span>
                            </div>
                            {(element.followed) ? <button onClick={deleteFriend}>Unfollow</button> : <button onClick={addFriend}>Follow</button>}
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