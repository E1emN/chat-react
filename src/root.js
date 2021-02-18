import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assests/styles/main.scss';
const HomePage = lazy(() => import('./pages/home'));
const SignInPage = lazy(() => import('./pages/signin'));
const SignUpPage = lazy(() => import('./pages/signUp'));

export const App = () => {
    return(
        <Suspense fallback={<div>loading...</div>}>
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sign-in" exact component={SignInPage} />
                    <Route path="/sign-up" exact component={SignUpPage} />
                </Switch>
            </Router>
        </Suspense>
    )
}