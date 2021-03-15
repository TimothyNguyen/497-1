import React from 'react';

export default function Todo({ todo, index, completeTodo, removeTodo }: {
    todo: any, 
    index:any, 
    completeTodo: (i: any) => void, 
    removeTodo: (i: any) => void
}) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.completed === 1 ? "line-through" : ""}}>
      <li>{todo.todo}</li>
      <div>
        <button onClick={() => completeTodo(todo.id)}>
        {todo.completed === 1 ? (<div>Undo</div>) : (
            <div>Complete</div>
          )}</button>
        <button onClick={() => removeTodo(todo.id)}>x</button>
      </div>
    </div>
  );
}
