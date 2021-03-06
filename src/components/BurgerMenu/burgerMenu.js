import React, { useState } from 'react';
import './burgerMenu.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase';

export const BurgerMenu = () => {

    const isDark = useStore($isDark);
    const history = useHistory();

    const [isBurgerOpen, setBurgerOpen] = useState(false);
    const [isClosed, setClosed] = useState(false);

    const close = () => {
        setClosed(true);
        setTimeout(() => setBurgerOpen(false), 500);
        setTimeout(() => setClosed(false), 500);
    };

    const logOut = () => {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.replace('/sign-in');
    };

    return(
        <div className="burger">
            <div className={isDark ? 'burger__buttons' : 'burger__buttons burger__buttons_dark'} onClick={() => setBurgerOpen(true)}>
                <div />
                <div />
                <div />
            </div>
            {
                isBurgerOpen &&
                <>
                    <div className="burger__overlay" onClick={close}>
                    </div>
                    <div 
                    className={isClosed ? 
                    isDark ? 'burger__block burger__block_closed burger__block_dark' : 'burger__block burger__block_closed' 
                    : isDark ? 'burger__block burger__block_dark' : 'burger__block'}>
                        <div className={isDark ? 'burger__close' : 'burger__close burger__close_dark'} onClick={close}>
                            <div/>
                            <div/>
                        </div>
                        <div className="burger__user">
                            <img alt="" src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/111554483/original/83d513acbc4b3716c9a474086bb633a5de3c2d74/create-social-media-avatars-in-minimalist-style.jpg" />
                            <span>@CooLLeeT</span>
                        </div>
                        <ul className="burger__menu">
                            <li onClick={() => history.push('/')}>Chats</li>
                            <li onClick={() => history.push('/settings')}>Settings</li>
                        </ul>
                        <span className="burger__logout" onClick={logOut}>Log out</span>
                    </div>
                </>
            }
        </div>
    )
};