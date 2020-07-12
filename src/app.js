const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))


//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Atharva Jainak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Atharva Jainak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some useful text',
        title: 'Help',
        name: 'Atharva Jainak'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provid ean address'
        })
    }
    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(lattitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Atharva Jainak',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Atharva Jainak',
        errorMsg: 'Page not found'
    })
})


//starting the server
app.listen(3000, () => {
    console.log('server is up port 3000')
})