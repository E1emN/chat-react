import React, { useEffect } from 'react';
import './header.scss';
import { useStore } from 'effector-react';
import { useLocation } from 'react-router-dom';
import { $isDark, changeMode } from '../../store/mode';
import { BurgerMenu } from '../BurgerMenu/burgerMenu';

export const Header = () => {

    const isDark = useStore($isDark);
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('isDark', isDark);
    }, [isDark])
    
    return(
        <header className={isDark ? 'header header_dark' : 'header'}>
            <div className="header__container">
                {location.pathname === '/sign-in' | location.pathname === '/sign-up' ? <div />
                :
                <BurgerMenu />}
                <div className={isDark ? 'header__mode header__mode_dark' : 'header__mode'} onClick={changeMode}>
                    <div />
                </div>
            </div>
        </header>
    )
};