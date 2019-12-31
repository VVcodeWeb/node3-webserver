const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

// Define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

//core page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Kitten'
    })

})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Kotenok'
    })
})

//help page
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Its a help page, we gonna help you',
        Q_A: 'Below is Q/A section',
        name: 'the Kot'
    })
})

//weather page
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({   
            error: 'You must provide a search address'
        })
    }
    geocode(req.query.address, (error, {latitude , longitude, location} = {}) =>{
        if (error){
            return res.send({ error })
        }
        forecast (latitude, longitude, (error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location
            })
        })

    })
})



app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res) => {
   res.render('404', {
       name: 'Vlad',
       errorMessage: 'Cant find such a help page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vlad',
        errorMessage: 'Cant find'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})


