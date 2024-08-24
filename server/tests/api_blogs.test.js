const {test, after, beforeEach} = require('node:test')
const helper = require('./test_helper')
const assert = require('node:assert')
const app = require(`../app`)
const Blog = require(`../models/blog`)
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach( async () => {
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type',/application\/json/)
})

test('the id property has replace the _id in returned notes', async()=> {
    const blogs = await api.get('/api/blogs')
    // console.log('this is just body of the blogs',blogs.body[0])
    assert(blogs.body[0].id)
    assert(!blogs.body[0]._id)
})


test('the valid blogs get added', async () => {
    const blogsBefore = await api.get('/api/blogs')
    let newBlog = new Blog(
        {
        content: 'this is the test blog',
        author: 'Kapil Bamotriya',
        url: 'kapilbamotriya.com',
        likes: 342,
    })
    await newBlog.save()
    const blogsAfter = await api.get('/api/blogs')
    assert.strictEqual(blogsBefore.body.length + 1, blogsAfter.body.length)
})

test('the likes are set to 0 if not defined', async () => {
    const blogsBefore = await api.get('/api/blogs')
    let newBlog = new Blog(
        {
        title:'what the heck is the title',
        content: 'this is blog without likes',
        author: 'Kapil Bamotriya',
        url: 'kapilbamotriya.com',
    })
    savedBlog = await newBlog.save()
    const blogsAfter = await api.get('/api/blogs')
    assert.strictEqual(savedBlog.likes,0)
})

test('blog without title cannot be added', async ()=> {
    let newBlog = new Blog(
        {
        content: 'this is blog without likes',
        author: 'Kapil Bamotriya',
        url: 'kapilbamotriya.com',
    })
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    
})

after(async() => {
    mongoose.connection.close()
})