import React from 'react';
import './signUp.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

export const SignUp = () => {

    const isDark = useStore($isDark);
    const history = useHistory();

    const validation = Yup.object().shape({
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords does not match')
    }); 

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            console.log(values)
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
                    <button type="submit">Sign up</button>
                    <span onClick={() => history.push('/sign-in')}>Sign in</span>
                </form>
            </div>
        </div>
    )
};