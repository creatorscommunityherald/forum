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



module.exports = router