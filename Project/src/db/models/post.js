const mongoose = require('mongoose')

// Defining schema for image
const imgSchema = new mongoose.Schema({
    imgURL: {
        type: "String",
        required: true,
    },

    altText: {
        type: "String",
        default: "Image here"
    }
})

// Defining the schema for Like
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },

    time: {
        type: Date,
        default: Date.now
    }
})

// Defining schema for reply
const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required must be true
        ref: 'User'
    },

    textContent: {
        type: String,
        required: true,
        trim: true
    },

    time: {
        type: Date,
        required: true,
        default: Date.now
    },

    likes: [likeSchema],
    images: [imgSchema]

})


// Defining schema for comment
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //required must be true
        ref: 'User'
    },

    textContent: {
        type: String,
        required: true,
        trim: true
    },

    time: {
        type: Date,
        required: true,
        default: Date.now
    },

    replies: [replySchema],
    likes: [likeSchema],
    images: [imgSchema]
})



// Defining the schema for the Post model
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    textContent: {
        type: String,
        trim: true,
        required: true
    },

    time: {
        type: Date,
        default: Date.now
    },

    // Instead of setting likesCount field in the model we can just simply use likes.lenght in our API endpoint
    likesCount: {
        type: Number,
        default: 0
    },

    // Insted of setting ommentsCount field in the model we can just simply use comments.length in our API endpoint
    commentsCount: {
        type: Number,
        default: 0
    },

    comments: [commentSchema],

    images: [imgSchema],

    likes: [likeSchema]
})


// Defining the Post model
const Post = mongoose.model('Post', postSchema)

// Exporting the Post model
module.exports = Post


// //creating an instance of the post model
// const post1 = new Post({
//     textContent: "Hello world, this is my first post",
// })

// post1.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// Pushing new comment into the post
// post1.comments.push({ textContent: "Nice post, thank you" })

// Pushing a new image into the post
// post1.comments.push({ imgURL: "www.lol.com/we.png" }) 


// Pushing a new reply into the comment
// post1.comments.filter((element) => element.id == comment.id)[0].replies.push({ textContent: "This is a reply to your comment." })