import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SuspenseComponent } from './components/Suspense/suspense';
import './assests/styles/main.scss';
import firebase from './firebase';
const HomePage = lazy(() => import('./pages/home'));
const SignInPage = lazy(() => import('./pages/signin'));
const SignUpPage = lazy(() => import('./pages/signUp'));
const SettingsPage = lazy(() => import('./pages/settings'));
const Loading = lazy(() => import('./components/Loading/loading'));

export const App = () => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (localStorage.getItem('uid') === null) {
                    localStorage.removeItem('uid');
                    window.location.replace('/sign-in');  
                }
            } else {
                localStorage.removeItem('uid');
                window.location.replace('/sign-in');
            }
          });
    }, []);

    return(
        <Suspense fallback={<SuspenseComponent />}>
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sign-in" exact component={SignInPage} />
                    <Route path="/sign-up" exact component={SignUpPage} />
                    <Route path='/settings' exact component={SettingsPage} />
                </Switch>
                <Loading />
            </Router>
        </Suspense>
    )
}