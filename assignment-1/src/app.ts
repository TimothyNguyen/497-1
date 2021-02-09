import express from 'express';
import usersRouter from './server';
const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.listen(3000, () => {
  console.log('Server started');
});


/*
let message: string = "Hello World";
console.log(message);

function compute(a: number, b:number) {
    return a + b;
}

console.log(compute(2, 5));

interface User {
    name: string
    age: string
}

function getUsers(): Promise<User[]> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch('/users.json')
    // the JSON body is taken from the response
    .then(res => res.json())
    .then(res => {
            // The response has an `any` type, so we need to cast
            // it to the `User` type, and return it from the promise
            return res as User[]
    })
}

getUsers()
        .then(users => {
                console.log(users.map(u => u.name).toString())
        })
*/