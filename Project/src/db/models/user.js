const mongoose = require('mongoose')
const validator = require('validator')

// Defining the schema for User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
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
    },

    phone: {
        type: Number,
        unique: true,
        required: true,
    },

    img: {
        type: "String",
        required: false
    }
})

// Defining the User model
const User = mongoose.model('User', userSchema)


//Exporting the User model
module.exports = User


//Creating instances of the User model
// const user1 = new User({
//     username: "   Leo2   ",
//     email: "kko2@gmail.com",
//     password: "   hellopass   ",
//     phone: 9807078733
// })

// //Saving the instance
// user1.save()
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((error) => {
//         console.log(error)
//     })