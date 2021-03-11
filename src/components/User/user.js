import React from 'react';
import '../Chat/chat.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';

export const User = (props) => {

    const { avatar, id, username } = props;
    const uid = localStorage.getItem('uid');
    const isDark = useStore($isDark);

    return(
        <div 
            className={isDark ? 'chat' : 'chat chat_dark'}
            //onClick={() => setSelectedChat(id)}
        >
            <img alt="" className="chat__avatar" src={avatar} />
            <div className={isDark ? 'chat__user chat__user_dark' : 'chat__user'}>
                <span>@{username}</span>
                <span></span>
            </div>
        </div>
    )
};