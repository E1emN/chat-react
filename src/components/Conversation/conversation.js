import React from 'react';
import './conversation.scss';
import { useFormik } from 'formik';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';
import { Message } from '../Message/message';

export const Conversation = () => {

    const isDark = useStore($isDark);

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: values => {
            console.log(values)
        }
    });

    const messages = [
        {
            from: 1,
            message: 'Lorem ipsum sit amen aa oooo lll sss wsdad sdas'
        },
        {
            from: 2,
            message: 'Lorem ipsum sit amen aa oooo lll sss wsdad sdas'
        },
        {
            from: 1,
            message: 'Lorem ipsum sit amen aa oooo lll sss wsdad sdas'
        },
        {
            from: 2,
            message: 'Lorem ipsum sit amen aa oooo lll sss wsdad sdas'
        },
        {
            from: 1,
            message: 'Lorem ipsum sit amen aa oooo lll sss wsdad sdas'
        }
    ]

    return(
        <div className="conversation">
            <form className={isDark ? 'conversation__send conversation__send_dark' : 'conversation__send'} onSubmit={formik.handleSubmit}>
                <input
                    placeholder="type message"
                    type="text"
                    name="message" 
                    value={formik.values.message}
                    onChange={formik.handleChange}
                />
                <button type="submit">Send</button>
            </form>
            <div className="conversation__messages">
                {messages.map((m, i) => (
                    <Message
                    key={i}
                     message={m.message}
                     from={m.from}
                    />
                ))}
            </div>
        </div>
    )
};