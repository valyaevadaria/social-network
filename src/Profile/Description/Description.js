import React from 'react';
import profile from '../Profile.module.css';
import profilePhoto from '../../content/images/profile-photo-png.png';
import Preloader from "../../common/Preloader/Preloader";
import UserStatus from "./hookUserStatus";

const Description = React.memo((props) => {
    console.log('RENDER');
   const user = props.profile;
    if (!user) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={profile.description}>
                <div className={profile.avatar}>
                    <img src={user.photos.small === null ? profilePhoto : user.photos.small} />
                </div>
                <div>
                    <p>{user.fullName}</p>
                    <UserStatus status={props.userStatus} updateStatus={props.updateStatus}/>
                </div>
            </div>
        </div>
    );
});

export default Description;