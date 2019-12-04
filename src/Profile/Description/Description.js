import React from 'react';
import profile from '../Profile.module.css';

const Description = () => {
    return (
        <div>
            <div className={profile.fon}>
                <img src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80' />
            </div>
            <div className={profile.description}>
                <div className={profile.avatar}>
                    <img src='https://assets.jpegmini.com/user/images/slider_puffin_before_mobile.jpg' />
                </div>
                <div>
                    <p>Demo</p>
                    <p>5 jan (25 years)</p>
                    <p>New York</p>
                </div>
            </div>
        </div>
    );
};

export default Description;