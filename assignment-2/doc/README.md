Developed a simple nodejs/expressjs server for typescript:

- Utilized a random user api: https://randomuser.me/api to 
grab random users. Get random users from the api and it is saved to a list, which can be retrieved through list of api.

To run the code:
Open terminal:
    > cd assignment-1
    > tsc
    > node lib/app.js

To run the api, utilize a web browser or a postman api

To install node_modules: 
> npm install

1. Get a new random user from api
GET: http://localhost:3000/users/newRandomUser
2. Count number of users
GET: http://localhost:3000/users/countUsers
3. Retrieve names
GET: http://localhost:3000/users/getNames


Throughout the process, I wanted to create a server to run my queries
so I utilized Express.js to have routing. Additionally, I ran into
trouble with how much information the api gave me, which I needed to 
truncate.

I found that DefinitelyTyped was pretty cool since it held the type
declaration files that would help keep types in check for a variety of javascript libraries. I utilized it for the nodejs and expressjs
libraries and it was really useful.

Note: src folder stores the typescript files while lib stores the outputted js files after the command `tsc`

File Directory:
assignment-1/
    package.json
    tsconfig.json
    src/
        app.ts
        server.ts
    lib/
        app.js
        server.js
    doc/README.md