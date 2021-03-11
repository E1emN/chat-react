import React, { useEffect, useState } from 'react';
import './conversation.scss';
import { useFormik } from 'formik';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Message } from '../Message/message';
import { $selectedChat, addMessage } from '../../store/chat';
import firebase from '../../firebase';

export const Conversation = () => {

    const isDark = useStore($isDark);
    const selectedChat = useStore($selectedChat);
    const uid = localStorage.getItem('uid');
    const [chat, setChat] = useState({}); 

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: values => {
            addMessage({
                chatId: selectedChat,
                message: [...chat.conversation, {from: uid, message: values.message}]
            });
            formik.resetForm();
        }
    });

    useEffect(() => {
        const db = firebase.firestore();
        db.collection('chats').doc(selectedChat).onSnapshot((c) => {
            console.log('aee');
            if (c.data()) {
               setChat(c.data()); 
            }
        })
    }, [selectedChat]);

    return(
        <div className="conversation">
            <form className={isDark ? 'conversation__send conversation__send_dark' : 'conversation__send'} onSubmit={formik.handleSubmit}>
                <input
                    placeholder="type message"
                    type="text"
                    name="message" 
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    autoComplete="off"
                />
                <button type="submit">Send</button>
            </form>
            <div className="conversation__messages">
                {chat.conversation && chat.conversation.map((m, i) => (
                    <Message
                        key={i}
                        message={m.message}
                        from={m.from}
                    />
                ))}
            </div>
        </div>
    )
};