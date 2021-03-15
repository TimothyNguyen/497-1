import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TodoInterface} from './TodoInterface';

export default function Todo({ todo, completeTodo, removeTodo, todos, setTodos }: {
    todo: any, 
    completeTodo: (list:any, 
      setList:(i: TodoInterface[]) => void, 
      id: any) => void, 
    removeTodo: (list:any, 
      setList:(i: TodoInterface[]) => void, 
      id: any) => void,
    todos:any,
    setTodos: (i: TodoInterface[]) => void
}) {
  const [edit, setEdit] = React.useState(false);
  const [todoTask, setTodoTask] = React.useState(todo.todo);
  const [editTask, setEditTask] = React.useState(todo.todo);

  const handleEdit = () => {
    setEdit(!edit);
  }

  const cancelTask = () => {
    setEditTask(todoTask);
    handleEdit();
  }

  const handleEditChange = async(e:any) => {
    setEditTask(e.target.value);
  };

  
  const handleEditSubmit = async(id:any) => {
      setTodoTask(editTask);
      axios.put("/todo/updateTodo", 
        {
          id: id,
          todo: editTask,
          completed: todo.completed,
        })
        .catch((err) => {
          console.log(err.response)
        });
    
    const newTodoList = todos.map((theTodo:TodoInterface) => {
      if (theTodo.id === id) {
        theTodo.todo = editTask;
      }
      return theTodo;
    });
    setTodos(newTodoList);
    handleEdit();
  }

  return (
    <div className="todo">
      {!edit ? (
          <h4 style={{textAlign: 'left'}}>{todoTask}</h4>
      ): (
          <>
            {" "}
          <Form.Control 
            type="text"
            className="input"
            value={editTask}
            onChange={handleEditChange}
            placeholder="Edit Todo"/>
          </>
      )}
      <Form>
        <Form.Group>      
          {!edit ? (  
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button className="pull-right" variant="outline-success" onClick={() => completeTodo(todos, setTodos, todo.id)}>
                {todo.completed === 1 ? (
                    <div>Undo</div>
                  ) : (
                    <div>✓</div>
                  )}</Button>{' '}
                <Button className="pull-right" variant="outline-danger" onClick={() => removeTodo(todos, setTodos, todo.id)}>✕</Button>{' '}
                <Button className="pull-right" variant="info" onClick={handleEdit}>Edit</Button>{' '}
              </div>
          ):(
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outline-danger" onClick={cancelTask}>Cancel</Button>{' '}
              <Button variant="success" type="submit" onClick={() => handleEditSubmit(todo.id)}>Save</Button>
            </div>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}
