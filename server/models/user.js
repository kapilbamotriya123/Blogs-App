const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    username: {
        type:String,
        minlength:5,
        unique:true,
        required:true
    },
    passwordHash:String,
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
})    

userSchema.set('toJSON', {
    transform:(document, returnedUser) => {
        returnedUser.id = returnedUser._id.toString()
        delete returnedUser._id
        delete returnedUser.__v
        delete returnedUser.passwordHash
    }
})

module.exports = mongoose.model('User',userSchema)