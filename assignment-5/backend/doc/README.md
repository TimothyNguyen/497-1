Developed a simple nodejs/expressjs server for typescript with a database in postgres

Libraries utilized:
    - https://github.com/kriasoft/node-sqlite
    - https://github.com/mapbox/node-sqlite3

To run the code:
Open terminal:
    > cd assignment-5/backend
    > npm install (if not install)
    > tsc
    > npm start

To run the api, utilize a web browser or a postman api

To install node_modules: 
> npm install

**Summary**: 
Here we created a typescript program that has 6 endpoints. 
It utilizes a typescript/express server and stores information 
in the database "todo.db". If the database isn't created, we
then create the "task" table to store all information. Our task
table has these entries:
- id INTEGER PRIMARY KEY AUTOINCREMENT,
- todo TEXT,
- last_updated TEXT,
- completed INTEGER

Below, I create a simple todo application that does the following:

1. Get a todo based off the id (in this case the first id)
GET: http://localhost:5000/todo/getTodo?id=1
2. Create a new todo
POST: http://localhost:5000/todo/createTodo
- Go to body, set raw and json on postman
{ 
    "todo": "Stats 697V: Homework 5",
}
3. Delete a todo item based on id
DELETE: http://localhost:5000/todo/deleteTodo?id=20
4. Update a todo item
PUT: http://localhost:5000/todo/updateTodo
- Go to body, set raw and json on postman
- Only works if the id exists
{
    "id": 5,
    "todo": "Scalable Web Systems: 497S - Hwk 5",
    "completed": 1
}
5. Get all todos not completed
GET: http://localhost:5000/todo/getTodoList
6. Get all todos completed
GET: http://localhost:5000/todo/getCompletedTodoList


Note: src folder stores the typescript files while lib stores the outputted js files after the command `tsc`

File Directory:
backend/
    package.json
    tsconfig.json
    package-lock.json
    src/
        todos.ts
        index.ts
    lib/
        todos.js
        index.js
    doc/README.md