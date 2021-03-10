import React, { useEffect, useState } from 'react';
import './chat.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import firebase from '../../firebase';
import { setSelectedChat, $selectedChat } from '../../store/chat';

export const Chat = (props) => {

    const { users, last, id } = props;
    const uid = localStorage.getItem('uid');
    const isDark = useStore($isDark);
    const selectedChat = useStore($selectedChat);

    const userId = users.filter(el => ( el !== uid ))[0];
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        firebase.firestore().collection('users').doc(userId).get()
        .then(user => {
            setUserData(user.data());
        })
    }, []);

    return(
        <div 
            className={isDark ? selectedChat === id ? 'chat chat_selected_dark' : 'chat' : selectedChat === id ? 'chat chat_selected' : 'chat'}
            onClick={() => setSelectedChat(id)}
        >
            <img alt="" className="chat__avatar" src={userData.avatar} />
            <div className={isDark ? 'chat__user chat__user_dark' : 'chat__user'}>
                <span>@{userData.username}</span>
                <span>{last}</span>
            </div>
        </div>
    )
};