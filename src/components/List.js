import { useEffect} from 'react' //Redux store, tüm uygulamanın global state'ini tutar. Bileşenler arasında veri paylaşımını sağlar.
import { useSelector, useDispatch } from 'react-redux'; //'useSelector state kullanılacağı durumda kullanılır.Bu görev listesini almak ve göstermek için useSelector ile store'daki ilgili state'e erişir. "useDispatch" Redux store'a action göndermek (dispatch etmek) için kullanılır. State'i güncellerken bu hook kullanılır.
import {  selectFilteredTodos, getTodosAsync, toggleTodoAsync, removeTodoAsync } from '../redux/todos/todosSlice';
import Loading from './Loading';


export default function List() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const isLoading = useSelector(state => state.todos.isLoading);

    useEffect (() => {
        dispatch(getTodosAsync());
    }, [dispatch])
    
    const handleDestroy = async (id) => {
        if(window.confirm('Are you sure?')){
            await dispatch(removeTodoAsync(id))
        }
    };

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({ id, data: {completed} }));
    }

    if (isLoading) {
        return <Loading />;
    }    

    return (
    <ul className='todo-list'>
        {
            filteredTodos.map((item) => (
            <li key={item.id} className={item.completed ? 'completed' : ''}>
                <div className='view'>
                    <input className='toggle' type='checkbox' onChange={() => handleToggle(item.id, !item.completed)} />
                    <label htmlFor='toggle-all'>{item.title}</label>
                    <button className='destroy' onClick={() => handleDestroy(item.id)}></button>
                </div>
            </li>
        ))}
    </ul>
  )
}
