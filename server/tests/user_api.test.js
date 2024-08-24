const supertest = require('supertest');
const {test,after,beforeEach,describe} = require('node:test')
const app = require('../app'); // assuming your Express app is in app.js
const assert = require('assert');
const mongoose = require('mongoose'); 
const User = require('../models/user')// assuming you're using Mongoose

const api = supertest(app)

describe('User API', () => {
    beforeEach(async () => {
        // Clear the database
        await User.deleteMany({});

        

        // Add demo users
        await new User({username: "user1", password:" newpassword1"}).save()
        
    });
    
    test('should return 400 when adding an existing user', async () => {
        const response = await api
        .post('/api/users')
        .send({ username: 'user1', password: 'newpassword' });

    assert.equal(response.status, 400);
    assert.equal(response.body.error, 'Username is already taken');

    // Check if the user was not added
    const users = await mongoose.model('User').find();
    assert.equal(users.length, 2);
    });
});

after(async() => {
    mongoose.connection.close()
})