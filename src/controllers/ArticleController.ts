import { Request, request, Response } from "express";
import { Document } from "mongoose";

const fs = require('fs');
const csv = require('csv-parser')
const ResultModel = require('../models/ResultModel')

// Copy is 23984 Lines
// Unbiased is 18312

interface article {
    details: string,
    isTheOnion: Boolean
}
interface dataArticle {
    text: string,
    label: string
}

const getArticle = (req,res) => {
    const results:Array<dataArticle> = [];
    let lineNum = Math.floor(Math.random() * 18312) + 2;

    fs.createReadStream('./public/OnionOrNot.csv')
        .pipe(csv())
        .on('data', (data:dataArticle) => {results.push(data)} )
        .on('end', () => {
            let selectedLine:dataArticle = results[lineNum]
            let endResult:Array<string|Number> = Object.keys(selectedLine).map(key => selectedLine[key]);
            if (endResult[endResult.length - 1][0] == parseInt(endResult[endResult.length - 1][0])){
                let articleDetails = [];
                for (let i=0; i < endResult.length - 1; i++){
                    articleDetails.push(endResult[i])
                }
                let article:article = {
                    details: articleDetails.join(','),
                    isTheOnion: endResult[endResult.length - 1][0] == 1
                }
                res.send(article)
            }
            else res.send("Error while finding a header. Please try again!")
        }
    );
}

const postResult = async (req:Request,res:Response) => {
    try {
        var result:Document = new ResultModel(req.body)
        var savedResult:Document<article,{}> = await result.save()
        if (savedResult) {
          res.send(savedResult)
        }
      } catch (err) {
        res.status(500).send('Result Post unsuccesfull')
      }
}

export {getArticle, postResult}