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

**Summary**: 
Here we created a typescript program that will receive incoming requests from an HTTP client by entering these endpoints above. T
here's a 3rd party API that is utilized with `https://api.quotable.io` to grab a set of random quotes. The application will get random quotes and store it in some lists and hashsets in main memory.
We can then be able to retrieve quotes retrieved so far and filter by author name and category of the quote. 
We respond to the client in JSON format typically and we have 4 endpoints described below.

1. Get a new random quote
GET: http://localhost:3000/quote/randomQuote
2. Retrieve all authors so far
GET: http://localhost:3000/quote/getAllAuthors
3. Retrieve all tags from quotes so far
GET: http://localhost:3000/quote/getAllTags
4. Retrieve all quotes from random quotes retrieved so far.
    - Should be able to utilize query parameters
    - For example can filter by name
    - Can filter by tag as well
GET: http://localhost:3000/quote/getQuotes?name=Benjamin Franklin&tag=famous-quotes


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