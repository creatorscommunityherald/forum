// Import mongoose
const mongoose = require('mongoose')

// Import models
// No need to import models here, we are only importing them here for practice
// These models are actually imported in the router/endpoints
const Post = require('./models/post')
const User = require('./models/user')

// Connection to DB
mongoose.connect('mongodb://localhost:27017/forum-app')



