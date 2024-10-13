import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveFilter, clearCompleted, selectTodos, selectActiveFilter } from '../redux/todos/todosSlice';

export default function ContentFooter() {
    const dispatch = useDispatch(); 
    const items = useSelector (selectTodos);
    const itemsLeft = items.filter(item => !item.completed).length;
    const activeFilter = useSelector(selectActiveFilter);

    useEffect(() => {
        localStorage.setItem('activeFilter', activeFilter);
    },[activeFilter] );
    
  return (
    <footer className='footer'>
        <span className='todo-count'>
            <strong>{itemsLeft} </strong>
            items left
        </span>

        <ul className='filters'>
            <li>
                <a className={activeFilter === 'all' ? 'selected' : ''} href='#' onClick={() => dispatch(changeActiveFilter('all'))}>All</a>
            </li>
            <li>
                <a className={activeFilter === 'active' ? 'selected' : ''} href='#' onClick={() => dispatch(changeActiveFilter('active'))}>Active</a>
            </li>
            <li>
                <a className={activeFilter === 'completed' ? 'selected' : ''} href='#' onClick={() => dispatch(changeActiveFilter('completed'))}>Complete</a>
            </li>
        </ul>

        <button className='clear-completed' onClick={() => dispatch(clearCompleted())}>
            Clear Completed
        </button>
    </footer>
  )
}
