import './App.css';
import {useEffect, useState} from "react";
import Form from "../Form/Form";

function App() {
    const [todos,setTodos] = useState([])
    const [allTodos,setAllTodos] = useState(0)
    const [allCompleted,setAllCompleted] = useState(0)
    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
            setAllTodos(storedTodos.length);


        }
    },[])
    useEffect(() => {
        setAllCompleted(todos.filter(todo=>todo.done === true).length)
    }, [todos]);
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);


    const putTodo = (value) =>{
        if (value){
            setTodos([...todos,{id:Date.now(),text:value,done:false}])
            setAllTodos(allTodos+1)
        }else{
            alert("Error")
        }
    }
    const toggleTodo = (id) =>{
        setTodos(todos.map(todo =>{
            if (todo.id !== id) return todo;
            return {
                ...todo,done:!todo.done

            }
        }))
    }

    const removeTodo = (id)=>{

        setTodos(todos.filter(todo => todo.id !== id))
        setAllTodos(allTodos-1)

    }
    const clearTodos = ()=>{
        setTodos([]);
        setAllTodos(0)
        setAllCompleted(0)
        localStorage.removeItem('todos');
    }
  return (
    <div className='wrapper'>
      <div className='container'>
        <h1 className='title'>TodoList React</h1>
          <Form
          putTodo={putTodo}
          />
        <ul className='todos'>
            {todos.map(todo=>{
                return (
                  <li className='todo' key={todo.id} >
                      <span className={todo.done ? "done" : ""}>{todo.text}</span>

                      <div>
                        <img
                          src='./accept.png'
                          className={todo.done ? "accept done" : "accept"}
                          onClick={() => toggleTodo(todo.id)}
                          alt="accept"
                         />
                        <img src='./bin.png' alt='delete' className="delete" onClick={(e) => {
                          e.stopPropagation()
                          removeTodo(todo.id)
                        }}/>
                      </div>
                  </li>
                );
            })}
            <div className="info">
                <span> All todos: {allTodos}</span>
                <span> Completed: {allCompleted}</span>
            </div>
            <button className='btnDeleteAll' onClick={clearTodos}> Clear all</button>
        </ul>
      </div>
    </div>
  );
}

export default App;
