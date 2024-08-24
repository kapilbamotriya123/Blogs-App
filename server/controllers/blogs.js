const blogRouter = require(`express`).Router()
const User = require('../models/user')
const Blog = require(`../models/blog`)
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request,response) => {
    const blogs = await Blog.find({});
    response.json(blogs)
})

//foir fetching a token from the request


blogRouter.post('/',async(request, response, next) => {
    const body = request.body
    console.log(body)
    console.log(request.token);
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({ error: 'title, author, and url are required' });
      }
    
    
    const user = await User.findById(decodedToken.userId)
    let newBlog = {
        title: body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        content:body.content,
        user:user.id
    }


    const blog = new Blog(newBlog)
    try{
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
    } catch (error) {
        if (error.name === 'ValidationError') {
          response.status(400).json({ error: 'title is required' });
        }
    }
})

blogRouter.delete('/:id', async(request,response,next) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    console.log('userid:', blog, 'decodedtokenid', decodedToken.userId)
    if (blog.user.toString() === decodedToken.userId) {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    }
    else {
        return response.status(403).json({error:'acced denied to user, correct login required'})
    } 
})

blogRouter.put('/:id', async(request,response) => {
    const id = request.params.id
    const body = request.body
    
    const result = await Blog.findByIdAndUpdate(id,body,{new: true})
    
    response.json(result)
})


module.exports = blogRouter