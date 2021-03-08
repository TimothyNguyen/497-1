Developed a simple nodejs/expressjs server for typescript with a database in postgres

Libraries utilized:
    - https://github.com/kriasoft/node-sqlite
    - https://github.com/mapbox/node-sqlite3

To run the code:
Open terminal:
    > cd assignment-4
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
- title TEXT,
- text TEXT,
- last_updated TEXT,
- completed INTEGER

Below, I create a simple todo application that does the following:

1. Get a todo based off the id (in this case the first id)
GET: http://localhost:3000/todo/getTodo?id=1
2. Create a new todo
POST: http://localhost:3000/todo/createTodo
- Go to body, set raw and json on postman
{ 
    "title": "Stats 697V: Homework 5",
    "text": "Create plot for plotly with symbols"
}
3. Delete a todo item based on id
DELETE: http://localhost:3000/todo/deleteTodo
- Go to body, set raw and json on postman
{
    "id": 3
}
4. Update a todo item
PATCH: http://localhost:3000/todo/updateTodo
- Go to body, set raw and json on postman
{
    "id": 1,
    "title": "Scalable Web Systems: 497S - Hwk 5",
    "text": "Front-end",
    "completed": 1
}
5. Get all todos not completed
GET: http://localhost:3000/todo/getTodoList
6. Get all todos completed
GET: http://localhost:3000/todo/getCompletedTodoList


Note: src folder stores the typescript files while lib stores the outputted js files after the command `tsc`

File Directory:
assignment-4/
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