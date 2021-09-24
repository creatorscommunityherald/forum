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

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const duplicateUsername = await User.findOne({username: req.body.username})
    const duplicateEmail = await User.findOne({email: req.body.email})
    const duplicatePhone = await User.findOne({phone: req.body.phone})

    if (duplicateUsername){
        return res.status(409).json("Username is already taken.")
    }
    else if (duplicateEmail) {
        return res.status(409).json("That email is already in use.")
    }
    else if (duplicatePhone) {
        return res.status(409).json("That phone number is already in use.")
    }

    // In case the user given details are not duplicates
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router