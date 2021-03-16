Developed a front-end to create simple todos in your application.

Libraries utilized:
    - React w/ Typescript
    - Axios to connect with the node.js/express.js backend
    - React Bootstrap/Bootstrap for styling & components

To run the code:
Open terminal:
    > cd assignment-5/client
    > npm install (if not install)
    > npm start

To install node_modules: 
> npm install

**Summary**: 
Here you are able to 

Below, I create a simple todo application that does the following:
1. The top helps you add a new todo list
- There's two sections:
- Todos
    - Completed ✓
    - Delete X
    - Edit
        - Save
        - Cancelled
- CompletedTodos
    - Undo ✓
    - Delete X
    - Edit
        - Save
        - Cancelled


Note: src folder stores the typescript files while lib stores the outputted js files after the command `tsc`

File Directory:
client/
    .gitignore
    package.json
    tsconfig.json
    package-lock.json
    doc/README.MD
    src/
        components/
            todo.css
            Todo.tsx
            TodoInterface.tsx
            TodoList.tsx
        App.css
        App.tsx
        App.test.tsx
        index.css
        index.tsx
        ...