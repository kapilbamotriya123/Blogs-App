const jwt = require("jsonwebtoken");

const tokenExtactor = async (request, response, next ) => {

    const authorization = request.get('authorization')
    let token = null
    if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.replace('Bearer ', '')
    }
   
    try {
    
    request.token = token
    } 
    catch(error) {
        next(error)
    }
    next()
}


const errorHandler = (error, request, response, next) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).send('Username is already taken');
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: "tokenInvalid"})
    } else if (error.name === 'CastError') {
        return response.status(400).json({error: 'invalid Id'})
    }
    ;
}

module.exports = {errorHandler, tokenExtactor}