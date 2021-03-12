import React, { useEffect, useState, useRef } from 'react';
import './conversation.scss';
import { useFormik } from 'formik';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Message } from '../Message/message';
import { $selectedChat, addMessage, setSelectedChat } from '../../store/chat';
import firebase from '../../firebase';

export const Conversation = () => {

    const isDark = useStore($isDark);
    const selectedChat = useStore($selectedChat);
    const uid = localStorage.getItem('uid');
    const ref = useRef();
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
            if (c.data()) {
               setChat(c.data()); 
            }
        })
    }, [selectedChat]);

    useEffect(() => {
        ref.current && ref.current.scrollIntoView();
    }, [chat]);

    return(
        selectedChat !== '0' &&
        <div className="conversation">
            {chat.conversation && 
            <form className={isDark ? 'conversation__send conversation__send_dark' : 'conversation__send'} onSubmit={formik.handleSubmit}>
                <input
                    placeholder="type message"
                    type="text"
                    name="message" 
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    autoComplete="off"
                    required={true}
                />
                <button type="submit">Send</button>
            </form>}
            {chat.conversation &&
                <div 
                    className={isDark ? 'conversation__back conversation__back_dark' : 'conversation__back'} 
                    onClick={() => setSelectedChat('0')}
                >
                    <img alt="" src="https://cdn2.iconfinder.com/data/icons/navigation-set-arrows-part-two/32/Arrow_Left-512.png" />
                </div>}
            <div className="conversation__messages">
                {chat.conversation && chat.conversation.map((m, i) => (
                    <Message
                        key={i}
                        message={m.message}
                        from={m.from}
                    />
                ))}
                <div ref={ref}/>
            </div>
        </div>
    )
};