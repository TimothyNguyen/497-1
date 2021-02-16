import { Router, Request, Response, response } from 'express';
const axios =  require('axios');

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

usersRouter.get('/newRandomUser', async (request: Request, response: Response): Promise<Response<User>> => {
    return await axios
        .get(`${url}${pageNum}${1}`)
        .then((res: any) => {
            const person = res.data.results[0];
            const newUser:User = <User>{
                "gender": person.gender,
                "name": person.name.first + " " + person.name.last,
                "email": person.email,
                "age": person.dob.age,
                phone: person.phone,
                cell: person.cell,
                picture: person.picture
            };
            usersList.push(newUser);
            let ans:Response<User> = response.json(newUser);
            return ans;
        }
    );
});

usersRouter.get('/countUsers', async (request: Request, response: Response): Promise<Response<Number>> => {
    return response.json(usersList.length);
});

usersRouter.get('/filterByAge', async(request: Request, response: Response): Promise<Response<Array<User>>> => {
    
    interface Age {
        lower: Number,
        upper: Number,
    }

    const age = request.body as Age;

    let users: Array<User> = usersList.filter(user => {
        return user.age >= age.lower && user.age <= age.upper;
    });

    return response.json(users);
});


usersRouter.get('/getNames', async (req: Request, res: Response): Promise<Response<Array<String>>> => {
    const names: Array<String> = [];
    usersList.map(user => {
        names.push(user.name);
    })
    return res.json(names);
});
  
export default usersRouter;