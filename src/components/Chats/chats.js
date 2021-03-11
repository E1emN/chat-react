import React, { useState, useEffect } from 'react';
import './chats.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Chat } from '../Chat/chat';
import { Conversation } from '../Conversation/conversation';
import { getChats, $chats } from '../../store/chat';
import { $users, searchUsers } from '../../store/users';
import { useFormik } from 'formik';
import { User } from '../User/user';

export const Chats = () => {

    const isDark = useStore($isDark);
    const chats = useStore($chats);
    const users = useStore($users);
    const [isNew, setNew] = useState(false);

    useEffect(() => {
        getChats();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: ''
        },
        onSubmit: values => {
            searchUsers(values.username);
        }
    })
    console.log(users);
    return(
        <div className={isDark ? 'chats chats_dark' : 'chats'}>
            <div className="chats__container">
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
                                <User
                                    key={u.uid}
                                    id={u.id}
                                    avatar={u.avatar}
                                    username={u.username}
                                />
                            ))
                            :
                            chats.map(c => (
                                <Chat
                                    key={c.id}
                                    id={c.id}
                                    users={c.users}
                                    last={c.conversation.length ? c.conversation[c.conversation.length - 1].message : ''}
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