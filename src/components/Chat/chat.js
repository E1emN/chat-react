import React from 'react';
import './chat.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';

export const Chat = () => {

    const isDark = useStore($isDark);

    return(
        <div className="chat">
            <img alt="" className="chat__avatar" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
            <div className={isDark ? 'chat__user chat__user_dark' : 'chat__user'}>
                <span>@username</span>
                <span>Lorem ipsum sit amet deus vowl amen</span>
            </div>
        </div>
    )
};