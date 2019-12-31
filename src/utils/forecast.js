const request = require('request')


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/f27b6b2ec691fb21dfbf282b80070ae1/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find location. Try again', undefined)
        }else {
            callback(undefined, 'We are in timezone ' + body.timezone + '. ' + body.daily.data[0].summary + ' At the moment its ' + body.currently.temperature + 
            ' degrees and theres ' + body.currently.precipProbability + ' chance of rain')
        }
    })
}


module.exports = forecast 