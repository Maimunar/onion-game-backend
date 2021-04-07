require('dotenv').config()
import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

const cors = require('cors');
/*
  Main server file using express
  Uses mongoose for the database and body-parser for request formatting
  PORT and DB_URL are saved in the .env file
  .env is in the .gitignore, if there is an error, please check the readme file
*/
const PORT:Number = Number(process.env.PORT) || 8000
const DB_URL:string = process.env.DB_URL || 'mongodb://localhost:27017/the-onion-or-not'
const app = express()

/*
  Database Connection
  Mongoose is used to connect to mongodb
*/
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err)
    else console.log(`Succesfully connected mongodb on URL ${DB_URL}`)
  })

/*
    Middleware
*/
app.use(cors())
app.use(bodyParser.json())

/*
  Send the request to the router
*/
app.use('/api', routes())

app.listen(PORT,
  () => console.log(`Listening on port ${PORT}`))

module.exports = app;