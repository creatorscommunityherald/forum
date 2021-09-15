const mongoose = require('mongoose')
const validator = require('validator')

// Defining the schema for User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email!")
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Passwords must not contain "password"')
            }
        }
    }
})

// Defining the User model
const User = mongoose.model('User', userSchema)


//Exporting the User model
module.exports = User


//Creating instances of the User model
// const user1 = new User({
//     name: "   Leo1   ",
//     email: "kko@gmail.com",
//     password: "   hellopass   "
// })

// Saving the instance
// user1.save()
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((error) => {
//         console.log(error)
//     })