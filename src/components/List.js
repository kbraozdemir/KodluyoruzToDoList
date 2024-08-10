import React from 'react'
import { useSelector } from 'react-redux';

export default function List() {
    const items = useSelector (state => state.todos.items);
    
    

    return (
    <ul className='todo-list'>
            {/* <li className='completed'>
                <div className='view'>
                    <input className='toggle' type='checkbox' />
                    <label htmlFor='toggle-all'>Learn JavaScript</label>
                    <button className='destroy'></button>
                </div>
            </li> */}
            
            {
                items.map((item) => (
                    <li key={item.id} className={item.completed ? 'completed' : ''}>
                        <div className='view'>
                            <input className='toggle' type='checkbox' />
                            <label htmlFor='toggle-all'>{item.title}</label>
                            <button className='destroy'></button>
                        </div>
                    </li>
                ))}
        </ul>
  )
}
