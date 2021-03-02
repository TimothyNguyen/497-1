import { Router, Request, Response, response } from 'express';
const axios =  require('axios');

const quotesRouter = Router();

const url:string = "https://api.quotable.io";
const random:string = "/random";
const quoteList: string = "/quotes";

// Define the interface for a quote
interface Quote {
    _id: String,
    tags: Array<String>,
    content: String,
    author: String,
    length: Number
}

/*
Develop 
*/
let quotesList:Array<Quote> = [];
let authorList:Set<Quote['author']> = new Set();
let tagsSet:Set<String> = new Set();

quotesRouter.get('/randomQuote', async (request: Request, response: Response): Promise<Response<Quote>> => {
    return await axios
        .get(`${url}${random}`)
        .then((res: any) => {
            const newQuote = res.data as Quote;
            quotesList.push(newQuote);
            authorList.add(newQuote.author);
            for(let i = 0; i < newQuote['tags'].length; i++) tagsSet.add(newQuote['tags'][i]);
            let ans:Response<Quote> = response.json(newQuote);
            return ans;
        }
    );
});

quotesRouter.get('/getAllAuthors', async (request: Request, response: Response): Promise<Response<Array<Quote['author']>>> => {
    let res:Array<Quote['author']> = Array.from(authorList);
    let list:Response<Array<Quote['author']>> = response.json(res);
    return list;
});

quotesRouter.get('/getAllTags', async (request: Request, response: Response): Promise<Response<Array<String>>> => {
    let tagList:Array<String> = Array.from(tagsSet);
    let list:Response<Array<String>> = response.json(tagList);
    return list;
});

/**
 * Get quotes for specific users and can be able to filter by name
 * as well as the tag of the quote
 */
quotesRouter.get('/getQuotes', async(request: Request, response: Response): Promise<Response<Array<Quote>>> => {
    const { name } = request.query;
    const { tag }  = request.query;
    let result:Array<Quote> = quotesList;
    if(name !== undefined) {
        result = quotesList.filter(quote => {
            return quote['author'].toLowerCase() === `${name}`.toLowerCase();
        });
    }
    if(tag !== undefined) {
        result = result.filter(quote => {
            let tags:Array<String> = quote['tags'];
            return tags.includes(`${tag}`);
        });
    }
    return response.json(result);
});

export default quotesRouter;