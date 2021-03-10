import { createEffect, createStore, createEvent } from 'effector'; 
import firebase from '../firebase';

export const getChats = createEffect(async () => {
    const db = firebase.firestore();
    const uid = localStorage.getItem('uid');
    const response = db.collection('chats').where('users', 'array-contains', uid).get()
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
export const $selectedChat = createStore('')
    .on(setSelectedChat, (_, id) => id);