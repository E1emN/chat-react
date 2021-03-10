import { createEffect, createStore } from 'effector';
import firebase from '../firebase';
import { stopLoading } from './loading';

const uid = localStorage.getItem('uid') || 's';
const user = firebase.firestore().collection('users').doc(uid);
const storageRef = firebase.storage().ref().child(uid);

export const getUser = createEffect(async () => {
    const response = await user.get().then(doc => {
        if (doc.exists) {
            return doc.data();
        }
    }).catch(e => console.log(e));
    return response;
});
export const $user = createStore({})
    .on(getUser.doneData, (_, user) => user);

export const editUser = createEffect(async (username) => {
    user.update({
        username: username
    }).then(() => {
        stopLoading();
        getUser();
    }).catch(e => {
        console.log(e);
        stopLoading();
    });
});

export const changeUseravatar = createEffect(async (file) => {
    storageRef.put(file).then(async () => {
        const avatarUrl = await storageRef.getDownloadURL()
        user.update({
            avatar: avatarUrl
        }).then(() => {
            getUser();
            stopLoading();
        }).catch(e => {
            console.log(e);
            stopLoading();
        })
    }).catch(e => {
        console.log(e)
    });
});