const request = require('request')
const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5pc2gtbWFwYm94IiwiYSI6ImNsMWkxcG05NzFpN3IzaWxuOTJ4NWg4c2EifQ.4CGBf-6L8RAolBOHDgYC8A&limit=1'
    request({url,json: true},(error,response)=>{
         if(error){
              const connError = 'Unable to connect Weather Service! Please try after sometime'
              callback(connError,undefined)
         }
         else if(response.body.features.length === 0){
             const dataError = 'Invalid Location! Try with a valid location'
             callback(dataError,undefined)
         }
         else{
              const data = {
                   placename : response.body.features[0].text,
                   coordinate_lal : response.body.features[0].center[0],
                   coordinate_lon : response.body.features[0].center[1]
              }
              callback(undefined,data)
         }
    })
}

module.exports = geoCode