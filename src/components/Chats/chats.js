import React, { useState, useEffect } from 'react';
import './chats.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Chat } from '../Chat/chat';
import { Conversation } from '../Conversation/conversation';
import { getChats, $chats } from '../../store/chat';
//import firebase from '../../firebase';

export const Chats = () => {

    const isDark = useStore($isDark);
    const chats = useStore($chats);
    const [isNew, setNew] = useState(false);

    // useEffect(() => {
    //     firebase.firestore().collection('users').onSnapshot((users) => {
    //         users.forEach(d => {
    //             console.log(d.data());
    //         })
    //     })
    // }, [])

    useEffect(() => {
        getChats();
    }, [])
    
    return(
        <div className={isDark ? 'chats chats_dark' : 'chats'}>
            <div className="chats__container">
                {
                    isNew ? 
                    <div className={isDark ? 'chats__search chats__search_dark' : 'chats__search'}>
                        <input />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/480px-OOjs_UI_icon_close.svg.png" alt="" onClick={() => setNew(false)} />
                    </div>
                    :
                    <button className={isDark ? 'chats__create chats__create_dark' : 'chats__create'} onClick={() => setNew(true)}>
                        New Chat
                    </button>
                }
                <div className="chats__wrapper">
                    <div className="chats__chats">
                        {chats.map(c => (
                            <Chat
                                key={c.id}
                                id={c.id}
                                users={c.users}
                                last={c.conversation.length ? c.conversation[-1].message : ''}
                            />
                        ))}
                    </div>
                    <Conversation />
                </div>
            </div>
        </div>
    )
};