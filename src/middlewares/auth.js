const jwt = require('jsonwebtoken')
const User = require('../db/models/user')


const auth = async (req, res, next) => {
    try{
        // if the token does not exist, .replace() will throw an error which will be handled by the catch phrase
        // .replace() to remove the "Bearer " portion of the string
        const token = req.header('Authorization').replace('Bearer ', '')
        // jwt.verify returns the decoded version of payload, i.e. user._id in this case
        const decoded = jwt.verify(token, 'dummy-signature')

        // find the user with the id and also check if that user.tokens array still has the given token or not
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
    
        if (!user){
            throw new Error()
        }

        // pass this user in the req object so that it can be used by other route handlers
        req.user = user
        next()
    } catch (e){
        res.status(401).send({
            error: 'Authentication required!'
        })
    }
}


module.exports = auth