const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.statics.findByCredentials = async(email, password) => {
    // check if a user for the given email exists
    const user = await User.findOne({ email })
    
    if(!user) {
        throw new Error('Email or password invalid')
    }

    // check if the password matches
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Email or password invalid')
    }

    // in case email and password are valid
    return user
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'dummy-signature')
    user.tokens.push({token})
    await user.save()
    return token
}

// password-hashing
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
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