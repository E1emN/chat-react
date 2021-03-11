import { createEffect, createStore, createEvent } from 'effector';
import firebase from '../firebase';
import { nanoid } from 'nanoid';

const db = firebase.firestore();

export const setSelectedChat = createEvent();
export const $selectedChat = createStore('0')
    .on(setSelectedChat, (_, id) => id);


export const cheateNewChat = createEffect(async (users) => {
    const chatId = nanoid();
    await db.collection('chats').doc(chatId).set({
        id: chatId,
        users: users,
        conversation: [],
        modified: new Date().getTime()
    }).then(() => console.log('New chat created succcessfully')).catch(e => console.log(e));
    setSelectedChat(chatId);
});


export const addMessage = createEffect(async (handler) => {
    const db = firebase.firestore();
    db.collection('chats').doc(handler.chatId).update({
        conversation: handler.message,
        modified: new Date().getTime()
    })
});