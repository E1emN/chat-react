import { createEffect, createStore, createEvent } from 'effector'; 
import firebase from '../firebase';

export const getChats = createEffect(async () => {
    const db = firebase.firestore();
    const uid = localStorage.getItem('uid');
    const response = await db.collection('chats').where('users', 'array-contains', uid).get()
    .then(chats => {
        const c = [];
        chats.forEach(chat => {
            c.push(chat.data());
        });
        return c;
    })
    return response;
});
export const $chats = createStore([])
    .on(getChats.doneData, (_, chats) => chats);


export const setSelectedChat = createEvent();
export const $selectedChat = createStore('0')
    .on(setSelectedChat, (_, id) => id);


export const getChat = createEffect(async chatId => {
    const db = firebase.firestore();
    const response = await db.collection('chats').doc(chatId).get()
    .then(chat => {
        if (chat.exists) {
            return chat.data()
        }
    });
    return response
});
export const $chat = createStore({})
    .on(getChat.doneData, (_, chat) => chat);


export const addMessage = createEffect(async (handler) => {
    const db = firebase.firestore();
    db.collection('chats').doc(handler.chatId).update({
        conversation: handler.message
    })
});