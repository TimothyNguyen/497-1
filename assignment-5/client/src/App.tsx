import React from 'react';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import './App.css';
import axios from 'axios';
import { Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TodoInterface} from './components/TodoInterface';

const App = () => {

  const [todos, setTodos] = React.useState<Array<TodoInterface>>([])
  const [completedTodos, setCompletedTodos] =  React.useState<Array<TodoInterface>>([])

  React.useEffect(() => {
    const fetchDataAsync = async() => {
        await axios
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
        
        await axios
              .get("/todo/getCompletedTodoList")
              .then((res) => {
                const tempArray:Array<TodoInterface> = []
                for(let i = 0; i < res.data.length; i++) {
                  const newTodo = res.data[i] as TodoInterface;
                  tempArray.push(newTodo);
                }
                setCompletedTodos([...tempArray]);
              })
              .catch((err) => {
                console.log(err.response)
              });
    }   
    fetchDataAsync(); 
  }, [todos, completedTodos]);


  const addTodo = async (value:String) => {
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
  
  const completeTodo = async(list:any, 
                            setList:(i: TodoInterface[]) => void, 
                            id: any) => {
    const newTodos = [...list];
    for(let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === id) {
        if(newTodos[i].completed === 0) newTodos[i].completed = 1;
        else newTodos[i].completed = 0;
        await axios.put("/todo/updateTodo", {
              id: newTodos[i].id,
              todo: newTodos[i].todo,
              completed: newTodos[i].completed,
            })
            .catch((err) => {
              console.log(err.response)
            });
      }
    }
    setList(newTodos);
  };

  const removeTodo = async(list:any, 
                          setList:(i: TodoInterface[]) => void, 
                          id: any) => {
    const newTodos = [...list];
    for(let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === id) {
        await axios.delete("/todo/deleteTodo", {params: {id: newTodos[i].id}})
            .then(() => newTodos.splice(i, 1))
            .catch((err) => {
              console.log(err.response)
            });
      }
    }
    setList(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h4 className="text-center mb-4">Todo List</h4>
        <TodoList addTodo={addTodo} />
          <h4 className="text-center">Current Todos</h4>
          <Card>
            <Card.Body>
              {todos.map(todo => (
                <Todo key={todo.id} 
                      todo={todo} 
                      completeTodo={completeTodo} 
                      removeTodo={removeTodo}
                      todos={todos}
                      setTodos={setTodos} />
              ))}
            </Card.Body>
          </Card>
        <br />
        <h4 className="text-center">Completed Todos</h4>
        <Card>
          <Card.Body>
            {completedTodos.map(todo => (
              <Todo key={todo.id} 
                    todo={todo} 
                    completeTodo={completeTodo} 
                    removeTodo={removeTodo}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}  />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
