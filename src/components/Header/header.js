import React, { useEffect } from 'react';
import './header.scss';
import { useStore } from 'effector-react';
import { $isDark, changeMode } from '../../store/mode';
import { BurgerMenu } from '../BurgerMenu/burgerMenu';

export const Header = () => {

    const isDark = useStore($isDark);

    useEffect(() => {
        localStorage.setItem('isDark', isDark);
    }, [isDark])

    return(
        <header className={isDark ? 'header header_dark' : 'header'}>
            <div className="header__container">
                <BurgerMenu />
                <div className={isDark ? 'header__mode header__mode_dark' : 'header__mode'} onClick={changeMode}>
                    <div />
                </div>
            </div>
        </header>
    )
};