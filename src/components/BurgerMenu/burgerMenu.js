import React, { useState, useEffect } from 'react';
import './burgerMenu.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase';
import { $user, getUser } from '../../store/user';

export const BurgerMenu = () => {

    const isDark = useStore($isDark);
    const user = useStore($user);
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
        localStorage.removeItem('uid');
        window.location.replace('/sign-in');
    };

    useEffect(() => {
        getUser();
    }, []);
    
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
                            <img alt="" src={user.avatar} />
                            <span>@{user.username}</span>
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