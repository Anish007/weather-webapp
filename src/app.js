const express = require('express')
const path = require('path')
const hbs = require('hbs')
const foreCast = require('./utils/foreCast')
const geoCode = require('./utils/geoCode')

// express contains a single function i.e an obejct and we need to call
//the function  to use express in project
//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')
//const publicDirectoryPathhelp = path.join(__dirname,'../public/help.html')
//const publicDirectoryPathAbout = path.join(__dirname,'../public/about.html')
//console.log(publicDirectoryPathhelp)
const app = express() // calling express function to generate the express application
const port = process.env.PORT || 3000

//use() used to customize the express server.Here we set up a path which provides a static page.
//the static page will be rendered in browser when root domain requested
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//set() used to setup a setting in express, first arg - setting name, second arg - value
//***handlebar - a template engine, is used for two things - it helps to render dynamic content/html in browser instead
// of a static page and it
//helps to create html content that can be reused in various pages. We can not directly use handlebar in express
//hbs package integrates handlebar in express
//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//get() function used to identify what should browser show if someone route to a specific domain
//takes two arguments - domain route and callback() with two arguments - request and response
//the callback function specifies the content which should be shown in a specific domain/route
//send() used to send back response to a request
//app.com
// app.get('/',(req,res)=>{
//     res.send('hello world')
// })
//app.com/help
// app.get('/help',(req,res)=>{
//     res.sendFile(publicDirectoryPathhelp)
// })
// //app.com/about
// app.get('/about',(req,res)=>{
//     res.sendFile(publicDirectoryPathAbout)
// })
//app.com/weather

app.get('',(req,res)=>{
    res.render('index',{
        title: "WEATHER",
        author: "Anish"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Me",
        author: "Anish"
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:"HELP",
        message:"Ask Any Thing!!!",
        author: "Anish"
    })
})

app.get('/weather',(req,res)=>{
    //req.query is an object that contains the values of query string passed to URL
    //URL must pass address value as a query string
    let address = req.query.address
   if(!address){
       return res.send({
           error: "You must provide an address"
       })
   }

   geoCode(address,(error,{coordinate_lal,coordinate_lon}={}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        foreCast(coordinate_lal,coordinate_lon,(error,{temperature,feelsLikeTemperature}={}) => {
            if(error){
                return res.send({
                    error: error})
            }
            res.send({
                Temperature: temperature,
                FeelsLikeTemperature: feelsLikeTemperature,
                Address: address
            })
        })
   })

})

app.get('/help/*',(req,res)=>{
    res.render('errorhandler',{
        title: "404",
        errormsg: "HELP CONTENT NOT FOUND",
        author: "Anish"
    })
})

app.get('*',(req,res)=>{
    res.render('errorhandler',{
        title: "404",
        errormsg: "PAGE NOT FOUND",
        author: "Anish"
    })
})

//listen() used to start the server.It takes two arguments -  port number and a callback function as starting a server is an
//asynchronous process.
//the server listen to the specified port number
app.listen(port,() => {
    console.log('server is running on : ' + port)
})