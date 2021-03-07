import React, { useEffect } from 'react';
import './settings.scss';
import { useStore } from 'effector-react';
import { $isDark } from '../../store/mode';
import { $user, editUser } from '../../store/user';
import { useFormik } from 'formik';

export const Settings = () => {

    const isDark = useStore($isDark);
    const user = useStore($user);

    const formik = useFormik({
        initialValues: {
            username: ''
        },
        onSubmit: values => {
            editUser(values.username);
        },
        enableReinitialize: true
    });

    useEffect(() => {
        if (user.username) {
            formik.setValues({
                username: user.username
            })
        };
    }, [user]);

    return(
        <div className={isDark ? 'settings settings_dark' : 'settings'}>
            <div className="settings__container">
                <div className={isDark ? 'settings__avatar settings__avatar_dark' : 'settings__avatar'}>
                    <img alt="" src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/111554483/original/83d513acbc4b3716c9a474086bb633a5de3c2d74/create-social-media-avatars-in-minimalist-style.jpg" />
                    <span>Change avatar</span>
                    <span>Delete avatar</span>
                </div>
                <form className={isDark ? 'settings__username settings__username_dark' : 'settings__username'} onSubmit={formik.handleSubmit}>
                    <input
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required={true}
                    />
                    <button>save</button>
                </form>
            </div>
        </div>
    )
};