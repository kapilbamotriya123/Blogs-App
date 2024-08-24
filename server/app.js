const express = require('express')
require('express-async-errors')
const path = require('path') 
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require(`./models/blog`)
const blogRouter = require(`./controllers/blogs`)
const config = require(`./utils/config`)
const logger = require('./utils/logger')
const User = require('./models/user')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const {errorHandler, tokenExtactor} = require('./utils/middleware')



//mongodb setup
mongoose.set('strictQuery',false)




logger.info('connecting to url')
mongoose.connect(config.MONGODB_URI)
    .then( result => {
        logger.info('connected to url')
    })
    .catch(error => {
        logger.info(`error connecting to url`, error.message)
    })  
    
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(tokenExtactor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });

app.use(errorHandler)

module.exports = app