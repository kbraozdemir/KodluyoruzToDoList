import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos/todosSlice';

export const store = configureStore ({
    reducer  : {
        todos: todosReducer,
    },
});

export default store;