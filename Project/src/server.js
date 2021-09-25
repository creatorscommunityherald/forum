const path = require('path')
const hbs = require('hbs')

// Express setup
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//Path definition for the static files, hbs views and partials
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Importing the mongoose connection file
require('./db/mongodb')



// Importing routers
const userRouters = require('./routers/userRouters')
const postRouters = require('./routers/postRouters')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//express middleware to parse incoming JSON into objects
app.use(express.json())

// Using the userRouters and postRouters
app.use(userRouters)
app.use(postRouters)


// Home page
app.get('', (req, res) => {
    res.render('index', { title: "Home" })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', { title: "Help" })
})

// Handling 404
app.get('*', (req, res) => {
    res.status(404).render('404', { title: "404" })
})



app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`)
})


