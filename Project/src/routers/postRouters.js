const express = require('express')
const router = new express.Router()

//Importing the Post model
const Post = require('../db/models/post')

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).send(posts)
    }
    catch {
        res.status(500).send()
    }
})

router.post('/posts', async (req, res) => {
    const post = new Post(req.body)
    try{
        await post.save()
        res.status(201).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router