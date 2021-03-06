import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SuspenseComponent } from './components/Suspense/suspense';
import './assests/styles/main.scss';
const HomePage = lazy(() => import('./pages/home'));
const SignInPage = lazy(() => import('./pages/signin'));
const SignUpPage = lazy(() => import('./pages/signUp'));
const SettingsPage = lazy(() => import('./pages/settings'));

export const App = () => {
    return(
        <Suspense fallback={<SuspenseComponent />}>
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sign-in" exact component={SignInPage} />
                    <Route path="/sign-up" exact component={SignUpPage} />
                    <Route path='/settings' exact component={SettingsPage} />
                </Switch>
            </Router>
        </Suspense>
    )
}