import React from 'react'

export default function ContentFooter() {
  return (
    <footer className='footer'>
        <span className='todo-count'>
            <strong>2</strong>
            items left
        </span>

        <ul className='filters'>
            <li>
                <a className='selected'>All</a>
            </li>
            <li>
                <a>Active</a>
            </li>
            <li>
                <a>Complete</a>
            </li>
        </ul>

        <button className='clear-completed'>
            Clear Completed
        </button>
    </footer>
  )
}
