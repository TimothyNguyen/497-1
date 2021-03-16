import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * 
 * @param addTodo: function that is utilized to addTodos from the front-end.
 *        - Looking to update todos in the front-end and back-end.
 * @returns 
 */
export default function TodoList({ addTodo }: {
    addTodo: (index: string) => void, 
}) {
    const [value, setValue] = React.useState("");
    const handleSubmit = async (event:any) => {
      event.preventDefault();
      if(!value) return;
      addTodo(value);
      setValue("");
    }

    /**
     * Renders an input text form and submit button to add new todos to the list.
     */
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