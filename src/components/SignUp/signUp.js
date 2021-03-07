import React, { useState } from 'react';
import './signUp.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import firebase from '../../firebase';

export const SignUp = () => {

    const isDark = useStore($isDark);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const db = firebase.firestore();

    const validation = Yup.object().shape({
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords does not match')
    }); 

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            setLoading(true);
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(user => {
                localStorage.setItem('uid', user.user.uid);
                db.collection('users').doc(user.user.uid).set({
                    username: formik.values.username,
                    email: formik.values.email,
                    uid: user.user.uid,
                    avatar: 'https://www.drupal.org/files/issues/default-avatar.png'
                }).then(() => {
                    window.location.replace('/')
                }).catch(e => {
                    localStorage.clear();
                    alert(e.message);
                    setLoading(false);
                })
            }).catch(e => {
                alert(e.message);
                setLoading(false);
            })
        },
        validationSchema: validation,
        validateOnChange: false
    });

    return(
        <div className={isDark ? 'sign-up sign-up_dark' : 'sign-up'}>
            <div className="sign-up__container">
                <form className={isDark ? 'sign-up__form_dark sign-up__form' : 'sign-up__form'} onSubmit={formik.handleSubmit}>
                    <h3>Sign Up</h3>
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required={true}
                    />
                    <input
                        placeholder="email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required={true}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required={true}
                    />
                    <input
                        placeholder="confirm password"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        required={true}
                    />
                    {formik.errors.confirmPassword && <small>{formik.errors.confirmPassword}</small>}
                    <button type="submit">{isLoading ? 'loading...' : 'Sign Up'}</button>
                    <span onClick={() => history.push('/sign-in')}>Sign in</span>
                </form>
            </div>
        </div>
    )
};