import { createApi, createStore } from 'effector';

export const $isLoading = createStore(false);
export const { startLoading, stopLoading } = createApi($isLoading, {
    startLoading: () => true,
    stopLoading: () => false
});