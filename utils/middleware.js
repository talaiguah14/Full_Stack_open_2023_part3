const User = require('../models/userModel')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  try {
  const authorizationHeader   = request.header('Authorization')

  if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
    request.token = authorizationHeader.substring(7);
  } else {
    request.token = null;
  }
 
  next()
  } catch (error) { 
  }
}

const userExtractor = async (request, response, next)=>{
  const decodedToken =  jwt.verify(request.token,process.env.SECRET)

  if(decodedToken != undefined){
    try {
      const user = await User.findById(decodedToken.id)
      if(user){
        request.user = user
      } else {
        request.user = null
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }else {
    request.user = null
  }
  next();
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}