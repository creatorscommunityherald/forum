// Express setup
const express = require('express')
const router = new express.Router()

// Importing mongoose for ObjectId validation
const mongoose = require('mongoose')

// Importing the User model
const User = require('../db/models/user')

// API endpoint for "GET /users"
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } 
    // This handles the db connection error
    catch (error) {
        res.status(500).send()
    }
})


// API endpoint for "POST /users"
router.post('/users', async (req, res) => {
    // Checking if the client details conflict already existing username, email or phone number
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

    // In case the client details are not duplicates
    const user = new User(req.body)
    try {
        // save the user instance
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        // This handles db errors and validation errors
        res.status(400).send(error)
    }
})


// API endpiont for "PATCH /users/:id"
router.patch('/users/:id', async(req, res) => {
    // array of fields that the client has specified to update
    const clientUpdates = Object.keys(req.body)
    // array of fields that are allowed to be updated
    const allowedUpdates = ['username', 'email', 'password', 'phone', 'img']
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
        // Grab the user document by their id
        const user = await User.findById(req.params.id)
        // if the user for the specified id does not exist. (NOTE: it returns null)
        if(!user){
            return res.status(404).send("The user for the specified ID was not found.")
        } 
        // Apply all the specified updates to the user document
        clientUpdates.forEach((clientUpdate) => {
            user[clientUpdate] = req.body[clientUpdate]
        })
        await user.save()
        res.send(user)
    } 
    // This handles the validation error and db connection error
    catch(error){
        res.status(400).send("Something went wrong")
    }
})


// API endpoint for "DELETE /users/:id"
router.delete('/users/:id', async (req, res) => {
    // Check if the ID provided by the client is valid or not
    const validObjectId = mongoose.isValidObjectId(req.params.id);
    if (!validObjectId) {
        return res.send({error: "Not a valid ID."})
    }
    
    // if the ID is valid
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        // If the user for the client specified ID does not exist
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } 
    // this handles the db connection error
    catch(error){
        res.status(500).send()
    }
})

module.exports = router