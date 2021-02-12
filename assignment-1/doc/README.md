Developed a simple nodejs app for typescript:

- Utilized a random user api: https://randomuser.me/api to 
grab random users. Get random users from the api and it is saved to a list, which can be retrieved through list of api. We look to filter users that are 35 years old or under 

To install node_modules: 
> `npm install`

To run the code:
Open terminal:
    > `cd assignment-1`
    > `npm start`

To stop the code:
    > press ctrl-c

I found that DefinitelyTyped was pretty cool since it held the type
declaration files that would help keep types in check for a variety of javascript libraries. I utilized it for the nodejs libraries and it was really useful.

Note: src folder stores the typescript files while lib stores the outputted js files after the command `tsc`

File Directory:
assignment-1/
    package.json
    tsconfig.json
    src/
        index.js
    lib/
        index.js
    doc/README.md