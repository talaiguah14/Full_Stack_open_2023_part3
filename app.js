const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notesController')
const phonebookRouter = require('./controllers/phonebookController')
const blogsRouter = require('./controllers/blogsContoller')
const userRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
const {requestLogger,  unknownEndpoint,
  errorHandler,  tokenExtractor} = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/notes', notesRouter)
app.use('/api/persons', phonebookRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app