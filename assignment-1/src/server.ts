import { Router, Request, Response } from 'express';
import axios from 'axios';

const usersRouter = Router();

const url = "https://randomuser.me/api";
const pageNum = "?page=";

interface User {
    gender: string,
    name: object,
    location: object,
    email: string,
    login: object
    dob: object,
    registered: object,
    phone: string,
    cell: string,
    picture: object
}

let usersList:Array<User> = [];

usersRouter.get('/', (request: Request, response: Response) => {
    return response.json("OK");
});

usersRouter.get('/newRandomUser', async (request: Request, response: Response) => {
    return await axios
        .get(`${url}${pageNum}${1}`)
        .then((res) => {
            const person = res.data.results[0] as User;
            // console.log(person.gender);
            // console.log(person.name);
            // console.log(person.location);
            // let newUser: User = [gender: ""]
            usersList.push(person);
            return response.json(person);
        }
    );
});

usersRouter.get('/countUsers', async (request: Request, response: Response) => {
    return response.json(usersList.length);
});


usersRouter.get('/countUsers', async (request: Request, response: Response) => {
    return response.json(usersList.length);
});





  
export default usersRouter;