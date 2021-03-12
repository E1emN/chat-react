import React, { useState, useEffect } from 'react';
import './chats.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Chat } from '../Chat/chat';
import { Conversation } from '../Conversation/conversation';
import { $users, searchUsers } from '../../store/users';
import { $selectedChat } from '../../store/chat';
import { useFormik } from 'formik';
import { User } from '../User/user';
import firebase from '../../firebase';

export const Chats = () => {

    const isDark = useStore($isDark);
    const users = useStore($users);
    const selectedChat = useStore($selectedChat);
    const [isNew, setNew] = useState(false);
    const [chats, setChats] = useState([]);
    const uid = localStorage.getItem('uid');
    
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('chats').where('users', 'array-contains', uid).onSnapshot(c => {
            const chats = [];
            c.forEach(chat => {
                chats.push(chat.data())
            });
            setChats(chats);
        })
    }, []);

    const formik = useFormik({
        initialValues: {
            username: ''
        },
        onSubmit: values => {
            searchUsers(values.username);
        }
    });
   
    return(
        <div className={isDark ? 'chats chats_dark' : 'chats'}>
            <div className={selectedChat !== '0' ? 'chats__container chats__container_hide' : 'chats__container'}>
                {
                    isNew ? 
                    <form className={isDark ? 'chats__search chats__search_dark' : 'chats__search'} onSubmit={formik.handleSubmit}>
                        <input
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            required={true}
                            placeholder="username" 
                        />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/480px-OOjs_UI_icon_close.svg.png" alt="" onClick={() => setNew(false)} />
                    </form>
                    :
                    <button className={isDark ? 'chats__create chats__create_dark' : 'chats__create'} onClick={() => setNew(true)}>
                        New Chat
                    </button>
                }
                <div className="chats__wrapper">
                    <div className="chats__chats">
                        {
                            isNew ?
                            users.map(u => (
                                u.uid !== uid &&
                                chats.filter(el => (
                                    el.users.includes(u.uid)
                                )).length === 0 &&
                                <User
                                    key={u.uid}
                                    id={u.uid}
                                    avatar={u.avatar}
                                    username={u.username}
                                    close={setNew}
                                />
                            ))
                            :
                            chats.sort((a, b) => b.modified - a.modified)
                            .map(c => (
                                <Chat
                                    key={c.id}
                                    id={c.id}
                                    users={c.users}
                                    last={c.conversation.length ? c.conversation[c.conversation.length - 1].message : ''}
                                    conversation={c.conversation}
                                />
                            ))
                        }
                    </div>
                    <Conversation />
                </div>
            </div>
        </div>
    )
};