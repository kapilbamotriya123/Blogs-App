const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require(`../utils/list_helper`)
const helper = require('./test_helper')

describe('Total Likes', () => {
   
    test('when list has one blog, total likes equals to likes in that blog', () => {
        
        const result = listHelper.totalLikes(helper.initialBlogs)
        assert.strictEqual(result, 36)
    })    
})

describe('Favorite Blog', () => {
    test('which is the favorite blog') , () => {
        const result = listHelper.favoriteBlog(helper.initialBlogs)
        assert.deepEqual(result, {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    }
})