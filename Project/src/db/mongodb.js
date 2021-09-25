// Import mongoose
const mongoose = require('mongoose')

// Import models
// No need to import models here, we are only importing them here for practice
// These models are actually imported in the router/endpoints
const Post = require('./models/post')
const User = require('./models/user')

// Connection to DB
mongoose.connect('mongodb+srv://leohang:Loveumom9841@cluster0.q6pro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/forum-app')



