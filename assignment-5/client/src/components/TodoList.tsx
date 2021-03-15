import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function TodoList({ addTodo }: {
    addTodo: (index: any) => void, 
}) {
    const [value, setValue] = React.useState("");
    const handleSubmit = async (event:any) => {
      event.preventDefault();
      if(!value) return;
      addTodo(value);
      setValue("");
    }
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Add Todo</Form.Label>
          <Form.Control 
            type="text"
            className="input"
            value={value}
            onChange={(event) => setValue(event.target.value)} 
            placeholder="New Todo"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }