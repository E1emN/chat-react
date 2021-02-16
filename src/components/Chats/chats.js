import React from 'react';
import './chats.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Chat } from '../Chat/chat';
import { Conversation } from '../Conversation/conversation';

export const Chats = () => {

    const isDark = useStore($isDark);

    return(
        <div className={isDark ? 'chats chats_dark' : 'chats'}>
            <div className="chats__container">
                <button className={isDark ? 'chats__create chats__create_dark' : 'chats__create'}>
                    New Chat
                </button>
                <div className="chats__wrapper">
                    <div className="chats__chats">
                        <Chat />
                        <Chat />
                    </div>
                    <Conversation />
                </div>
            </div>
        </div>
    )
};