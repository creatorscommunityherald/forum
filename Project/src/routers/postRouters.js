// Express setup
const express = require('express')
const router = new express.Router()

// Importing mongoose for ObjectId validation
const mongoose = require('mongoose')

//Importing the Post model
const Post = require('../db/models/post')

// API endpoint for "GET /posts"
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).send(posts)
    }
    catch {
        res.status(500).send()
    }
})


// API endpoint for "POST /posts"
router.post('/posts', async (req, res) => {
    const post = new Post(req.body)
    try{
        await post.save()
        res.status(201).send(post)
    } 
    // This handles the validation error and db connection error
    catch (error) {
        res.status(400).send(error)
    }
})


// API endpoint for "PATCH /posts/:id"
router.patch('/posts/:id', async(req, res) => {
    // array of fields that the client has specified to update
    const clientUpdates = Object.keys(req.body)
    // array of fields that are allowed to be updated
    const allowedUpdates = ['textContent', 'comments', 'likes']
    // check if all the client specified update fields are included in the allowed updates
    const isValidOperation = clientUpdates.every((clientUpdate) => allowedUpdates.includes(clientUpdate))

    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates")
    }

    // Check if the id provided by the client is valid or not
    const validObjectId = mongoose.isValidObjectId(req.params.id);
    if (!validObjectId) {
        return res.send({error: "Not a valid ID."})
    }

    // If the id is valid and the operation is valid as well, proceed to patching the instance
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true})
        // if the post for the specified id does not exist. (NOTE: it returns null)
        if(!post){
            return res.status(404).send("The post for the specified ID was not found")
        }
        res.send(post)
    } 
    // This handles the validation error and db connection error
    catch(error){
        res.status(400).send(error)
    }
})


// API endpoint for "DELETE /posts/:id"
router.delete('/posts/:id', async (req, res) => {
    // Check if the ID provided by the client is valid or not
    const validObjectId = mongoose.isValidObjectId(req.params.id);
    if (!validObjectId) {
        return res.send({error: "Not a valid ID."})
    }

    // If the ID is valid
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        // If the post for the client specified ID does not exist
        if (!post){
            return res.status(404).send()
        }
        res.send(post)
    } 
    // this handles the db connection error
    catch(error){
        res.status(500).send()
    }
})

module.exports = router