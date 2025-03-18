import './Form.css';
import React,{useState} from 'react';

const Form = (props) => {
    const [value, setValue] = useState('');

    return (
        <form className='form' onSubmit={e=>{
            e.preventDefault();
            props.putTodo(value);
            setValue('');
        }}>
            <input type='text' className="input" placeholder='Enter text...' value={value} onChange={e => setValue(e.target.value)}/>
        </form>
    );
};

export default Form;