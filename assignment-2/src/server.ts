import { Router, Request, Response, response } from 'express';
import axios from 'axios';

const usersRouter = Router();

const url:string = "https://randomuser.me/api";
const pageNum:string = "?page=";

interface User {
    gender: string,
    name: string,
    email: string,
    age: Number,
    phone: string,
    cell: string,
    picture: object
}


let usersList:Array<User> = [];

usersRouter.get('/', (request: Request, response: Response) => {
    return response.json("OK");
});

usersRouter.get('/newRandomUser', async (request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
    return await axios
        .get(`${url}${pageNum}${1}`)
        .then((res) => {
            const person = res.data.results[0];
            const newUser:User = <User><unknown>{
                "gender": person.gender,
                "name": person.name.first + " " + person.name.last,
                "email": person.email,
                "age": person.dob.age,
                phone: person.phone,
                cell: person.cell,
                picture: person.picture
            };
            usersList.push(newUser);
            console.log(newUser);
            return response.json(newUser);
        }
    );
});

usersRouter.get('/countUsers', async (request: Request, response: Response) => {
    return response.json(usersList.length);
});


usersRouter.get('/getNames', async (req: Request, res: Response) => {
    const names: Array<String> = [];
    usersList.map(user => {
        names.push(user.name);
        console.log(user.name);
    })
    return res.json(names);
});
  
export default usersRouter;