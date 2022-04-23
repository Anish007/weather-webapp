const request = require('request')

const foreCast = (lal,lon,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7bc2ed99854074435a414de41b8ed856&query=' + lon + ',' + lal +''
    //request function is used to send HTTP Request. It takes two arguments - an object consists of
    //url and required data we about to send, a callback function to get the error/response data
    //json:true parse the json data from response to an object
    request({url,json: true},(error,response) => {

        if(error){
            const connError = 'Unable to connect Weather Service! Please try after sometime'
            callback(connError,undefined)
        }else if(response.body.error){
            const foreCastError = {
                desc: response.body.error.info,
                eurl: url
            }
            callback(foreCastError,undefined)
        }else{
            const forecastData = {
                temperature: response.body.current.temperature,
                feelsLikeTemperature: response.body.current.feelslike
            }
        
            callback(undefined,forecastData)
        }
    })
}

module.exports = foreCast