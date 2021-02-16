const axios = require('axios');
const http = require('http');

import { User } from "./User"; 
const url:string = "https://randomuser.me/api";
const pageNum:string = "?page=";


/**
 * Function that calls the api: https://randomuser.me/api. This is grabs
 * a random user and we make it asynchronous so we don't lose data.
 */
async function getNewUser(): Promise<any> {
    try {
        const response:User = await axios.get(`${url}${pageNum}${1}`)
            .then((res: any) => {
                const person = res.data.results[0];
                const newUser:User = <User>{
                    "name": person.name.first + " " + person.name.last,
                    "age": person.dob.age,
                    "gender": person.gender,
                }
                return newUser;
            });
        return response;
    } catch (error) {
        console.error(error)
    }
}

/**
 * Automatically generate 20 users
 * @param numUsers 
 */
async function generateUsers(numUsers: Number): Promise<User[]> {
    let usersList:Array<User> = [];
    for(let i = 0; i < numUsers; i++) {
        usersList.push(await getNewUser());
    }
    return usersList;
}

/**
 * Provides a function to filter by age
 * @param usersList 
 * @param lowerAge 
 * @param upperAge 
 */
function filterUsersByAge(usersList:Array<User>, lowerAge: Number, upperAge: Number): User[] {
    let users: Array<User> = usersList.filter(user => {
        return user.age >= lowerAge && user.age <= upperAge;
    });
    return users;
}

/**
 * Function to find people that are 35 years and younger
 */
async function main() {
    let ans: Array<User> = await generateUsers(20);
    let under35: User[] = filterUsersByAge(ans, 0, 35);
    console.log("People under 35 years old: ");
    under35.forEach(person => {
        console.log(person.name + " is " + 
                    person.age + " years old with a gender of " +
                    person.gender);
    });
}
main();