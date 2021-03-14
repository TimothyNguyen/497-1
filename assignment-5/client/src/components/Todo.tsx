import React from 'react';

export default function Todo({ todo, index, completeTodo, removeTodo }: {
    todo: any, 
    index:any, 
    completeTodo: (index: any) => void, 
    removeTodo: (index: any) => void
}) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>
        {todo.isCompleted ? (<div>Undo</div>) : (
            <div>Complete</div>
          )}</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}
