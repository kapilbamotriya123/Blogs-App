const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')


loginRouter.post('/', async(request, response) => {
    const {username, password} = request.body
    //console.log('this is what we are looking at',{username, password})

    const user = await User.findOne({username})
    //console.log(user);

    const passwordCorrect = user === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash)
    //console.log('log3',passwordCorrect);
    if (!(user && passwordCorrect)) {
        return response.status(401).json({error:'incorrect username or password'})
    }

    const usedForToken = {
        username: user.username,
        userId: user.id,
    }

    const generatedToken = jwt.sign(usedForToken, process.env.SECRET)
    //console.log('this is generated token', generatedToken)
    response.status(200).send({generatedToken, username: user.username, name: user.name})
})

module.exports = loginRouter