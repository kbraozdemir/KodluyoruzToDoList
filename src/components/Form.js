import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todos/todosSlice';

export default function Form() {
  const [title, setTitle] = useState('');
  

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo ({title}));
    setTitle('');
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            className='new-todo'
            placeholder='what needs to be done?' 
            autoFocus 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} />
        </form>
    </div>
  )
};
