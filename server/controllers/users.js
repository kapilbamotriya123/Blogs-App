const userRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async(request, response, next) => {
    const body = request.body
    if (body.password.length < 4) {
        return response.status(400).json({error:'password must be contain at least 3 chars'})
    }
    const saltRounds = 10
    const passwordHash =await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        name: body.name,
        username: body.username,
        passwordHash: passwordHash,
        
        
    })

    try{
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(error) {
        
        next(error)
    }
        
})

userRouter.get('/',async(request,response) => {
    const users = await User.find({}).populate('blogs',{author:1, title:1, url:1, likes:1})
    response.json(users)
})

userRouter.delete('/:id', async(request,response) => {
    const id = request.params.id
    await User.findByIdAndDelete(id)
    response.status(204).end()
})
module.exports = userRouter