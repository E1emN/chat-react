import React from 'react';
import './signIn.scss';
import { useFormik } from 'formik';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

export const SignIn = () => {

    const isDark = useStore($isDark);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            console.log(values)
        } 
    })

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
                    <button>Sing In</button>
                    <span onClick={() => history.push('/sign-up')}>Sign Up</span>
                </form>
            </div>
        </div>
    )
};