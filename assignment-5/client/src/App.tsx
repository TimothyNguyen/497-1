import React from 'react';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import './App.css';
import axios from 'axios';

interface TodoInterface {
  completed: Number
  id: any
  last_updated: String
  text: String
  title: String
}

const App = () => {

  /*
  const [todos, setTodos] = React.useState([
    {text: "Learn about React",isCompleted: false},
    {text: "Meet friend for lunch",isCompleted: false},
    {text: "Build really cool todo app",isCompleted: false}
  ]);
  */
  // const [todosCompleted, setTodosCompleted] = React.useState<Array<TodoInterface>>([])
  const [todos, setTodos] = React.useState<Array<TodoInterface>>([])

  React.useEffect(() => {
    const fetchDataAsync = () => {
      return axios
              .get("/todo/getTodoList")
              .then((res) => {
                const tempArray:Array<TodoInterface> = []
                for(let i = 0; i < res.data.length; i++) {
                  const newTodo = res.data[i] as TodoInterface;
                  tempArray.push(newTodo);
                }
                setTodos([...tempArray]);
              })
              .catch((err) => {
                console.log(err.response)
              });
    }   
    fetchDataAsync(); 
  }, []);


  const addTodo = (todo:TodoInterface) => {
    const newTodos = [...todos, todo]; 
    setTodos(newTodos);
  };
  
  const completeTodo = (id: any) => {
    const newTodos = [...todos];
    for(let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === id) {
        newTodos[i].completed = (newTodos[i].completed === 0) ? 1 : 0;
      }
    }
    setTodos(newTodos);
  };
  const removeTodo = (id: any) => {
    const newTodos = [...todos];
    for(let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === id) {
        newTodos.splice(i, 1);
      }
    }
    setTodos(newTodos);
  };
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={todo.id} 
                index={todo.id} 
                todo={todo} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} />
        ))}
        <TodoList addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
