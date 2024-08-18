import React from 'react' //Redux store, tüm uygulamanın global state'ini tutar. Bileşenler arasında veri paylaşımını sağlar.
import { useSelector, useDispatch } from 'react-redux'; //'useSelector state kullanılacağı durumda kullanılır.Bu görev listesini almak ve göstermek için useSelector ile store'daki ilgili state'e erişir. "useDispatch" Redux store'a action göndermek (dispatch etmek) için kullanılır. State'i güncellerken bu hook kullanılır.
import { toggle, destroy } from '../redux/todos/todosSlice';

let filtered = [];
export default function List() {
    const dispatch = useDispatch();
    
    const items = useSelector (state => state.todos.items);
    const activeFilter = useSelector (state => state.todos.activeFilter);

    const handleDestroy = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(destroy(id))
        }
    };

    filtered = items;
    if(activeFilter !== 'all'){
        filtered = items.filter((todo) => activeFilter === 'active' ? todo.completed === false && todo : todo.completed === true && todo,)
    }

    return (
    <ul className='todo-list'>
        {
            filtered.map((item) => (
            <li key={item.id} className={item.completed ? 'completed' : ''}>
                <div className='view'>
                    <input className='toggle' type='checkbox' onChange={() => dispatch(toggle({ id: item.id}))} />
                    <label htmlFor='toggle-all'>{item.title}</label>
                    <button className='destroy' onClick={() => handleDestroy(item.id)}></button>
                </div>
            </li>
        ))}
    </ul>
  )
}
