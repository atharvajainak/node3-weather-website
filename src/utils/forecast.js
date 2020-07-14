const request = require('request')


const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fc2c3eb2d4eac475ff0a1dc66f9a6f89/'+encodeURIComponent(lattitude)+','+encodeURIComponent(longitude)+'?units=si'

    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to the weather service', undefined)
        }else if(body.error){
            callback('Unable to find location.', undefined )
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is '+ body.daily.data[0].temperatureHigh+ ' with a low of '+ body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability + ' chance of rain.')
    
                // summary: response.body.daily.data[0].summary,
                // temperature: response.body.currently.temperature,
                // rainProbability: response.body.currently.precipProbability
        }
    })
}

module.exports = forecast

