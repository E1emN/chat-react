import React from 'react';
import '../Chat/chat.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { cheateNewChat } from '../../store/chat';

export const User = (props) => {

    const { avatar, id, username, close } = props;
    const uid = localStorage.getItem('uid');
    const isDark = useStore($isDark);

    const newChat = () => {
        cheateNewChat([uid, id]);
        close();
    };

    return(
        <div 
            className={isDark ? 'chat' : 'chat chat_dark'}
            onClick={newChat}
        >
            <img alt="" className="chat__avatar" src={avatar} />
            <div className={isDark ? 'chat__user chat__user_dark' : 'chat__user'}>
                <span>@{username}</span>
                <span></span>
            </div>
        </div>
    )
};