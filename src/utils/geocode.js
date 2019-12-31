const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib25lYWx0b25lIiwiYSI6ImNrNHBwbzRxdzA4MTEzZXFxZDI2Ymw2eTcifQ.E5NSAZtJqmDF-Fgqc7aRXw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            return callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            return callback('Unable to find location. Try again', undefined)
        }else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode