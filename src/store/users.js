import { createEffect, createStore } from 'effector';
import firebase from '../firebase';

export const searchUsers = createEffect(async username => {
    const db = firebase.firestore();
    const response = await db.collection('users').where('username', '==', username).get()
    .then(users => {
        const u = []
        users.forEach(user => {
            u.push(user.data())
        });
        return u;
    })
    return response;
});
export const $users = createStore([])
    .on(searchUsers.doneData, (_, users) => users)