import { Router } from "express"
import express from 'express'
import {getArticle, postResult} from '../controllers/ArticleController'
const router : Router = express.Router() 

export default () => {
    router.get('/', (req,res) => res.send(`API running on port 8000`))
    router.route('/article')
        .get(getArticle)
        .post(postResult)

    return router
}

