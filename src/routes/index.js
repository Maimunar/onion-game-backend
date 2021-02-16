import express from 'express'
import { getArticle, postResult } from '../controllers/ArticleController'
const router = express.Router()

module.exports = () => {
    router.route('/article')
        .get(getArticle)
        .post(postResult)

    return router
}