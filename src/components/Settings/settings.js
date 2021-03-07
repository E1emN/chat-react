import React, { useEffect } from 'react';
import './settings.scss';
import { useStore } from 'effector-react';
import { $isDark } from '../../store/mode';
import { $user, editUser, changeUseravatar } from '../../store/user';
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

    const changeAvatar = (file) => {
        changeUseravatar(file);
    };

    return(
        <div className={isDark ? 'settings settings_dark' : 'settings'}>
            <div className="settings__container">
                <div className={isDark ? 'settings__avatar settings__avatar_dark' : 'settings__avatar'}>
                    <img alt="" src={user.avatar} />
                    <label htmlFor="avatar">Change avatar</label>
                    <input
                        id="avatar"
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => changeAvatar(e.target.files[0])}
                    />
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