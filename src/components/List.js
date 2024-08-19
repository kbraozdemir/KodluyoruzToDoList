import React from 'react' //Redux store, tüm uygulamanın global state'ini tutar. Bileşenler arasında veri paylaşımını sağlar.
import { useSelector, useDispatch } from 'react-redux'; //'useSelector state kullanılacağı durumda kullanılır.Bu görev listesini almak ve göstermek için useSelector ile store'daki ilgili state'e erişir. "useDispatch" Redux store'a action göndermek (dispatch etmek) için kullanılır. State'i güncellerken bu hook kullanılır.
import { toggle, destroy, selectFilteredTodos } from '../redux/todos/todosSlice';


export default function List() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    
    const handleDestroy = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(destroy(id))
        }
    };

    

    return (
    <ul className='todo-list'>
        {
            filteredTodos.map((item) => (
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
