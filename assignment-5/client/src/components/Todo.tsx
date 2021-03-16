import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TodoInterface} from './TodoInterface';

/**
 * A todo functional component
 * @param todo: TodoInterface
 * @param completeTodo: function to either finish todo or uncomplete the todo
 * @param removeTodo: function to remove todo, which removes from database and front-end
 * @param todos: TodoInterface[] list of either completed or uncompleted todos (depends what's passed in)
 * @param setTodos: function to set todos list. 
 * @returns 
 */
export default function Todo({ todo, completeTodo, removeTodo, todos, setTodos }: {
    todo: TodoInterface, 
    completeTodo: (list:TodoInterface[], 
      setList:(i: TodoInterface[]) => void, 
      id: Number) => void, 
    removeTodo: (list:TodoInterface[], 
      setList:(i: TodoInterface[]) => void, 
      id: Number) => void,
    todos:TodoInterface[],
    setTodos: (i: TodoInterface[]) => void
}) {

  /**
   * edit - boolean to indicate if you're editing a todo or not
   * todoTask - todo information
   * editTask - information to capture todo information when editing essentially
   */
  const [edit, setEdit] = React.useState<boolean>(false);
  const [todoTask, setTodoTask] = React.useState<string>(todo.todo);
  const [editTask, setEditTask] = React.useState<string>(todo.todo);

  /**
   * Turns on/off editing mode for a todo.
   */
  const handleEdit = ():void => {
    setEdit(!edit);
  }

  /**
   * Cancels the todo editing. Reverts back to todo info previously
   */
  const cancelTask = ():void => {
    setEditTask(todoTask);
    handleEdit();
  }

  /**
   * 
   * @param e 
   * Data to handle editing the task in editing mode. Only changes on front-end,
   * but not on backend.
   */
  const handleEditChange = async(e:any):Promise<void> => {
    setEditTask(e.target.value);
  };

  /**
   * 
   * @param id 
   * Updates todo and makes new changes to that todo item
   */
  const handleEditSubmit = (id:any):void => {
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
    
    /**
     * Making sure that it renders correctly on the front-end
     */
    const newTodoList = todos.map((theTodo:TodoInterface) => {
      if (theTodo.id === id) theTodo.todo = editTask;
      return theTodo;
    });

    setTodos(newTodoList);
    handleEdit();
  }

  /**
   * React render of the todo component
   */
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
