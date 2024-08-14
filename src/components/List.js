import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../redux/todos/todosSlice';

export default function List() {
    const dispatch = useDispatch();
    
    const items = useSelector (state => state.todos.items);

    return (
    <ul className='todo-list'>
        {
            items.map((item) => (
            <li key={item.id} className={item.completed ? 'completed' : ''}>
                <div className='view'>
                    <input className='toggle' type='checkbox' onChange={() => dispatch(toggle({ id: item.id}))} />
                    <label htmlFor='toggle-all'>{item.title}</label>
                    <button className='destroy'></button>
                </div>
            </li>
        ))}
    </ul>
  )
}
