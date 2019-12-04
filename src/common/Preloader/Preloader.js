import React from 'react';
import preloader from '../../content/images/loader.svg';
import p from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={p.preload}>
            <img src={preloader}/>
        </div>
    )
};

export default Preloader;