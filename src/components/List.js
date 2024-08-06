import React from 'react'

export default function List() {
  return (
    <ul className='todo-list'>
            <li className='completed'>
                <div className='view'>
                    <input className='toggle' type='checkbox' />
                    <label htmlFor='toggle-all'>Learn JavaScript</label>
                    <button className='destroy'></button>
                </div>
            </li>
            <li>
                <div className='view'>
                    <input className='toggle' type='checkbox' />
                    <label htmlFor='toggle-all'>Learn React</label>
                    <button className='destroy'></button>
                </div>
            </li>
            <li>
                <div className='view'>
                    <input className='toggle' type='checkbox' />
                    <label htmlFor='toggle-all'>Have a Life!</label>
                    <button className='destroy'></button>
                </div>
            </li>
        </ul>
  )
}
