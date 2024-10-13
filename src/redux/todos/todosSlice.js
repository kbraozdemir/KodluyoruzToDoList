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

export const toggleTodoAsync = createAsyncThunk ('todos/toggleTodoAsync', async ({id, data}) => {
    await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return id;
})

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return res.data;
})

const todosSlice = createSlice ({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem(),
        addNewTodo: {
            isLoading: false,
            error: false,
        }
    },
    reducers: {  // Reducer, state'in nasıl güncelleneceğini tanımlar. Action type'larına göre yeni state'i oluşturur.
        
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
            // getTodo
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

            // addTodo
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.addNewTodo.isLoading = false;
            })

            .addCase(addTodoAsync.pending, (state, action) => {
                state.addNewTodo.isLoading = true;
            })

            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodo.isLoading = false;
                state.addNewTodo.error = action.error.message;
            })

            // toggleTodo
            .addCase(toggleTodoAsync.fulfilled, (state, action) =>{
                const { id, completed } = action.payload;
                const index = state.items.findIndex( item => item.id === id);
                state.items[index].completed = completed;
            })

            // removeTodo
            .addCase(removeTodoAsync.fulfilled, (state, action => {
                const id = action.payload;
                const index = state.items.findIndex((item) => item.id === id);
                state.items.splice(index, 1) ;
            }))
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

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;