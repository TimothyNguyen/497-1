import { Router, Request, Response } from 'express';
  
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./todo.db', (err: any) => {
    if (err) console.error(err.message);
    console.log('Connected to the todo database.');
  });

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS task(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo TEXT,
      last_updated TEXT,
      completed INTEGER
    )`)
});

const todosRouter = Router();

/**
 * Basic router, just states hello world
 */
todosRouter.get("/", async(request: Request, response: Response): Promise<Response<any>>  => {
    return response.json("Hello world");
});

/**
 * Creates a new todo item. Automatically sets to not completed (0) and provides time updated.
 * Needs a 
 * 1. title (String)
 * 2. text (String)
 */
todosRouter.post("/createTodo", async(request: Request, response: Response) => {
    const {todo} = request.body;
    const time:String = Date.now().toString();
    await db.run(`INSERT INTO task VALUES(?, ?, ?, ?)`, 
        [null, todo, time, 0], function(this:any, err:any) {
        if(err) {
            console.error(response.status(400).json({ "error": err.message }));
            return response.status(400).json({ "error": err.message });
        }
        response.status(200).json({id: this.lastID});  
    });
});

/**
 * Deletes the todo based off the id.
 */
todosRouter.delete("/deleteTodo", async(request: Request, response: Response) => {
    const { id } = request.query;
    console.log(id);
    await db.run(`DELETE FROM task WHERE id=${id}`, function(this:any, err:any) {
        if (err) {
          response.status(400).json({"error":err.message});
          return;
        }
        response.status(200).json({success: true});  
    });
});

/**
 * Gets list of non-completed todos
 */
todosRouter.get("/getTodoList", async(request: Request, response: Response): Promise<Response<any>>  => {
    const ans = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM task where completed = 0",
               function(err:any, rows:any) {
          resolve(rows);
        });
    });
    return response.json(ans);
});

/**
 * Gets list of completed todos
 */
todosRouter.get("/getCompletedTodoList", async(request: Request, response: Response): Promise<Response<any>>  => {
    const ans = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM task where completed = 1",
               function(err:any, rows:any) {
          resolve(rows);
        });
    });
    return response.json(ans);
});

/**
 * Updates the todo
 * Passes in id, title, text, completed
 */
todosRouter.put("/updateTodo", async(request: Request, response: Response) => {
    const {id, todo, completed} = request.body;
    const updatedTime:String = Date.now().toString();
    const ans = await new Promise((resolve, reject) => {
        db.all(
            `UPDATE task SET todo = ?, 
            last_updated=?, completed=? where id=?`, 
            [todo, updatedTime, completed, id],
            function(this:any, err:any) {
                if(err) {
                    console.error(response.status(400).json({ "error": err.message }));
                    return response.status(400).json({ "error": err.message });
                }
                response.status(200).json({id: id}); 
            }
        );
    });
    return response.json(ans);
});

/**
 * Gets a todo based off the id
 */
todosRouter.get("/getTodo", async(request: Request, response: Response) => {
    const {id} = request.query;
    const ans = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM task where id = ${id}`,
               function(err:any, rows:any) {
          resolve(rows);
        });
    });
    return response.json(ans);
});

export default todosRouter;
