import { createEvent, createStore } from 'effector';

const isDark = localStorage.getItem('isDark') ? JSON.parse(localStorage.getItem('isDark')) : false;

export const changeMode = createEvent();
export const $isDark = createStore(isDark)
    .on(changeMode, (bool) => !bool);