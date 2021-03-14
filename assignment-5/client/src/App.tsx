import React from 'react';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([
    {text: "Learn about React",isCompleted: false},
    {text: "Meet friend for lunch",isCompleted: false},
    {text: "Build really cool todo app",isCompleted: false}
  ]);

  const addTodo = (text:string) => {
    const newTodos = [...todos, {text, isCompleted: false}]; 
    setTodos(newTodos);
  };
  const completeTodo = (index: any) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };
  const removeTodo = (index: any) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} 
                index={index} 
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
