import express from 'express'
import { getArticle, postResult } from '../controllers/ArticleController'
const router = express.Router()

module.exports = () => {
    router.route('/article')
        .get(getArticle)
        
    router.route('/result')
        .post(postResult)

    return router
}