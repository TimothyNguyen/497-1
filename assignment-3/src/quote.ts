import { Router, Request, Response, response } from 'express';
const axios =  require('axios');

const quotesRouter = Router();

const url:string = "https://api.quotable.io";
const random:string = "/random";
const quoteList: string = "/quotes";

interface Quote {
    _id: String,
    tags: Array<String>,
    content: String,
    author: String,
    length: Number
}


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

quotesRouter.get('/getQuotesFromAuthor', async(request: Request, response: Response): Promise<Response<Array<Quote>>> => {
    interface Author {
        name: String
    }
    
    const author = request.body as Author;
    console.log(author.name);
    let result:Array<Quote> = quotesList.filter(quote => {
        return quote['author'].toLowerCase() === author.name.toLowerCase();
    });

    return response.json(result);
});


quotesRouter.get('/getQuotesFromTag', async(request: Request, response: Response): Promise<Response<Array<Quote>>> => {
    interface Tag {
        tag: String
    }
    
    const tag = request.body as Tag;

    let result:Array<Quote> = quotesList.filter(quote => {
        let tags:Array<String> = quote['tags'];
        return tags.filter(t => t.toLowerCase() === tag.tag.toLowerCase());
    });

    return response.json(result);
});

export default quotesRouter;