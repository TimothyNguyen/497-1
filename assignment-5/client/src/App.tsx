import React from 'react';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import './App.css';
import axios from 'axios';

interface TodoInterface {
  completed: Number
  id: any
  last_updated: String
  todo: String
}

const App = () => {

  // const [todosCompleted, setTodosCompleted] = React.useState<Array<TodoInterface>>([])
  const [todos, setTodos] = React.useState<Array<TodoInterface>>([])

  React.useEffect(() => {
    const fetchDataAsync = async() => {
      return await axios
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


  const addTodo = async (value:String) => {
    // const [newTodo, setNewTodo] = React.useState('');
    let id:Number = -1;
    await axios.post("/todo/createTodo", { todo: value })
         .then((res) => id = res.data.id as Number)
         .catch((err) => {
           console.log(err.response);
         });
    await axios.get("/todo/getTodo", {params: {id: id}})
            .then((res) => {
              const newTodo = res.data[0] as TodoInterface;
              const newTodos = [...todos, newTodo]; 
              setTodos(newTodos);
            })
            .catch((err) => {
              console.log(err.response)
            });
  };
  
  const completeTodo = async(id: any) => {
    const newTodos = [...todos];
    for(let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === id) {
        newTodos[i].completed = (newTodos[i].completed === 0) ? 1 : 0;
        await axios.patch("/todo/updateTodo", 
            {
              id: newTodos[i].id,
              todo: newTodos[i].todo,
              completed: newTodos[i].completed,
            })
            .catch((err) => {
              console.log(err.response)
            });
      }
    }
    setTodos(newTodos);
  };
  const removeTodo = async(id: any) => {
    const newTodos = [...todos];
    for(let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === id) {
        await axios.post("/todo/deleteTodo", 
            {
              id: newTodos[i].id,
            })
            .then(() => newTodos.splice(i, 1))
            .catch((err) => {
              console.log(err.response)
            });
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
