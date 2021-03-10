import React, { useEffect } from 'react';
import { Header } from '../components/Header/header';
import { Chats } from '../components/Chats/chats';
import firebase from '../firebase';

const HomePage = () => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (localStorage.getItem('uid') === null) {
                    localStorage.clear();
                    window.location.replace('/sign-in');  
                }
            } else {
                localStorage.clear();
                window.location.replace('/sign-in');
            }
          });
    }, [])

    return(
        <>
            <Header />
            <Chats />
        </>
    )
};

export default HomePage;