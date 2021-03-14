import React from 'react';

export default function TodoList({ addTodo }: {
    addTodo: (index: any) => void, 
}) {
    const [value, setValue] = React.useState("");
    const handleSubmit = (event:any) => {
      event.preventDefault();
      if(!value) return;
      addTodo(value);
      setValue("");
    }
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          className="input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    );
  }