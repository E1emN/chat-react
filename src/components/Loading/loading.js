import React from 'react';
import './loading.scss';
import { $isDark } from '../../store/mode';
import { $isLoading } from '../../store/loading';
import { useStore } from 'effector-react';

const Loading = () => {

    const isDark = useStore($isDark);
    const isLoading = useStore($isLoading);

    return(
        isLoading &&
        <div className={isDark ? 'loading loading_dark' : 'loading'}>
            <div />
        </div>
    )
};

export default Loading;