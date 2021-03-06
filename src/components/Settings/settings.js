import React from 'react';
import './settings.scss';
import { useStore } from 'effector-react';
import { $isDark } from '../../store/mode';

export const Settings = () => {

    const isDark = useStore($isDark);

    return(
        <div className={isDark ? 'settings settings_dark' : 'settings'}>
            <div className="settings__container">
                <div className={isDark ? 'settings__avatar settings__avatar_dark' : 'settings__avatar'}>
                    <img alt="" src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/111554483/original/83d513acbc4b3716c9a474086bb633a5de3c2d74/create-social-media-avatars-in-minimalist-style.jpg" />
                    <span>Change avatar</span>
                    <span>Delete avatar</span>
                </div>
                <form className={isDark ? 'settings__username settings__username_dark' : 'settings__username'}>
                    <input defaultValue="CooLLeeT" />
                    <button>save</button>
                </form>
            </div>
        </div>
    )
};