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

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

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
    res.render('404', { title: "404" })
})



app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`)
})


