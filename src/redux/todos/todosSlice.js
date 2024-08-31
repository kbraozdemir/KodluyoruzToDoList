import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos` , data);
    return res.data;
});

const todosSlice = createSlice ({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodoLoading: false,
        addNewTodoError: null,
    },
    reducers: {  // Reducer, state'in nasıl güncelleneceğini tanımlar. Action type'larına göre yeni state'i oluşturur.
        toggle: (state, action) => {
            const {id} = action.payload; //Action, bir olayın veya işlemin temsilcisidir. Bir şeyi eklemek, silmek veya güncellemek istediğinizde bir action oluşturursunuz.

            const item = state.items.find(item => item.id === id);

            item.completed = !item.completed; 
        },
        destroy: (state, action) =>{
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id!== id);
            state.items =filtered;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },

        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.completed === false);
            state.items = filtered;
        }
    },
    extraReducers: (builder) => {  //builder kullanarak daha esnek bir şekilde yönetmek, asenkron işlemlerinin daha temiz bir şekilde ele alınmasını sağlar.
        builder
            // get Todo
            .addCase(getTodosAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //add Todo
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.addNewTodoLoading = false;
            })

            .addCase(addTodoAsync.pending, (state, action) => {
                state.addNewTodoLoading = true;
            })

            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodoLoading = false;
                state.addNewTodoError = action.error.message;
            })
    }
});

export const selectFilteredTodos = (state) => {
    if  (state.todos.activeFilter === 'all') {
        return state.todos.items;
    }

    return state.todos.items.filter((todo) => 
        state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true,
    );
};
export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { toggle, destroy,changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;