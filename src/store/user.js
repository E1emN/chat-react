import { createEffect, createStore } from 'effector';
import firebase from '../firebase';

const uid = localStorage.getItem('uid') || 's';
const user = firebase.firestore().collection('users').doc(uid);

export const getUser = createEffect(async () => {
    const response = await user.get().then(doc => {
        if (doc.exists) {
            return doc.data();
        }
    });
    return response;
});
export const $user = createStore({})
    .on(getUser.doneData, (_, user) => user);

export const editUser = createEffect(async (username) => {
    user.update({
        username: username
    }).then(() => {
        alert('saved!');
        getUser();
    }).catch(e => {
        console.log(e);
    })
})