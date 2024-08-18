import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice ({
    name: 'todos',
    initialState: {
        items: [
            {
            id: 1,
            title: 'Learn React',
            completed: true,
        },
        {
            id: 2,
            title: 'Read a book',
            completed: false,
        },
    ],
    activeFilter: 'all',
    },
    reducers: {  // Reducer, state'in nasıl güncelleneceğini tanımlar. Action type'larına göre yeni state'i oluşturur.
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
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
});

export const { addTodo, toggle, destroy,changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;