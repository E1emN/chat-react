import React, { useState } from 'react';
import './signIn.scss';
import { useFormik } from 'formik';
import { $isDark } from '../../store/mode';
import { startLoading, stopLoading } from '../../store/loading';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase';

export const SignIn = () => {

    const isDark = useStore($isDark);
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            setLoading(true);
            startLoading();
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((user) => {
                localStorage.setItem('uid', user.user.uid);
                stopLoading();
                window.location.replace('/');
            })
            .catch(e => {
                setLoading(false)
                stopLoading();
                alert(e.message);
            })
        } 
    });

    return(
        <div className={isDark ? 'sign-in sign-in_dark' : 'sign-in'}>
            <div className="sign-in__container">
                <form className={isDark ? 'sign-in__form sign-in__form_dark' : 'sign-in__form'} onSubmit={formik.handleSubmit}>
                    <h3>Sign In</h3>
                    <input
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required={true}
                        placeholder="email"
                    />
                    <input
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required={true}
                        placeholder="password"
                    />
                    <button>{isLoading ? 'loading...' : 'Sign In'}</button>
                    <span onClick={() => history.push('/sign-up')}>Sign Up</span>
                </form>
            </div>
        </div>
    )
};