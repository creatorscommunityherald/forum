const express = require('express')
const router = new express.Router()

// Importing the User model
const User = require('../db/models/user')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router