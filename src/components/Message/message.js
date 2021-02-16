import React from 'react';
import './message.scss';
import { $isDark } from '../../store/mode';
import { useStore } from 'effector-react';

export const Message = (props) => {

    const { message, from } = props;
    const isDark = useStore($isDark);

    return(
        <div className={from === 1 ? 
            isDark ? 'message message_1 message_dark' : 'message message_1' : 
            isDark ? 'message message_dark' : 'message'}>
            {message}
        </div>
    )
}