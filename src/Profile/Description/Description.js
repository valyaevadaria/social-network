import React from 'react';
import profile from '../Profile.module.css';
import profilePhoto from '../../content/images/profile-photo-png.png';
import Preloader from "../../common/Preloader/Preloader";
import UserStatus from "./UserStatus";

const Description = (props) => {
   const user = props.profile;
    if (!user) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={profile.fon}>
                <img src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80' />
            </div>
            <div className={profile.description}>
                <div className={profile.avatar}>
                    <img src={user.photos.small === null ? profilePhoto : user.photos.small} />
                </div>
                <div>
                    <p>{user.fullName}</p>
                    <UserStatus status={props.userStatus.data} updateStatus={props.updateStatus}/>
                </div>
            </div>
        </div>
    );
};

export default Description;