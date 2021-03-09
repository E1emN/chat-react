import React, { useEffect } from 'react';
import { Header } from '../components/Header/header';
import { Chats } from '../components/Chats/chats';
import firebase from '../firebase';

const HomePage = () => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
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