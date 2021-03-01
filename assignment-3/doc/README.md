Developed a simple nodejs/expressjs server for typescript:

- Utilized a random quote api: https://api.quotable.io to grab a set of random quotes.

To run the code:
Open terminal:
    > cd assignment-3
    > tsc
    > npm start

To run the api, utilize a web browser or a postman api

To install node_modules: 
> npm install

1. Get a new random quote
GET: http://localhost:3000/quote/randomQuote
2. Retrieve all authors so far
GET: http://localhost:3000/quote/getAllAuthors
3. Retrieve all tags from quotes so far
GET: http://localhost:3000/quote/getAllTags
4. Retrieve all quotes with the associated tag from random quotes retrieved so far
GET: http://localhost:3000/quote/getQuotesFromTag
    - When using postman, utilize the x-www-form-urlencoded under body and 
    have key `tag`.
5. Retrieve all quotes associated with the author from random quotes retrieved so far
GET: http://localhost:3000/quote/getQuotesFromAuthor
    - When using postman, utilize the x-www-form-urlencoded under body and 
    have keys `name` with a value of  `Nelson Mandela`.

Here we create 

Note: src folder stores the typescript files while lib stores the outputted js files after the command `tsc`

File Directory:
assignment-3/
    package.json
    tsconfig.json
    package-lock.json
    src/
        quote.ts
        index.ts
    lib/
        quote.js
        index.js
    doc/README.md