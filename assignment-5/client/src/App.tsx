import React from 'react';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import './App.css';
import axios from 'axios';
import { Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TodoInterface} from './components/TodoInterface';

const App = () => {

  /**
   * States that contains todos and completedTodo lists
   */
  const [todos, setTodos] = React.useState<Array<TodoInterface>>([])
  const [completedTodos, setCompletedTodos] =  React.useState<Array<TodoInterface>>([])

  /**
   * useEffect is a hook for encapsulating code that has ‘side effects,’ and is 
   * like a combination of componentDidMount, componentDidUpdate, and 
   * componentWillUnmount. Previously, functional components didn’t have access 
   * to the component life cycle, but with useEffect you can tap into it.
   * 
   * - Utilizes useEffect to load up the todo and completedTodos list
   * before rendering. It keeps rerendering the newly updated information.
   */
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

  /**
   * Add a todo - automatically adds to todo list.
   * - Once added to database, we make sure to grab
   * id from the backend and update todo list on the front-end
   * @param value: String (todo: text) 
   */
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
  
  /**
   * Update todos by either completing the todo or undoing a completed todo.
   * @param list: TodoInterface[]
   * @param setList: function(i: TodoInterface)
   * @param id
   */
  const completeTodo = async(list:TodoInterface[], 
                            setList:(i: TodoInterface[]) => void, 
                            id: Number) => {
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

  /**
   * Deletes the todo on the front-end and backend with the id of
   * the todo
   * @param list 
   * @param setList 
   * @param id 
   */
  const removeTodo = async(list:TodoInterface[], 
                          setList:(i: TodoInterface[]) => void, 
                          id: Number) => {
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

  /**
   * Renders the todos and done todos lists.
   */
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
