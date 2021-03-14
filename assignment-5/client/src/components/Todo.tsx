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
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(todo.id)}>
        {todo.isCompleted ? (<div>Undo</div>) : (
            <div>Complete</div>
          )}</button>
        <button onClick={() => removeTodo(todo.id)}>x</button>
      </div>
    </div>
  );
}
