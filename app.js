const express = require('express');
const ejs = require('ejs');
const request = require('request');
const PORT = process.env.PORT || 3000;



var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('home.ejs');
})

app.get('/results', function(req,res){

    var searchResult = req.query.Search;  // Grabs the input from the form and stores it to be appended to the url
    var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + searchResult;  //Appends the input to the url 

    request(url, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var data = JSON.parse(body)
        res.render('results', {data: data});  
});
    
   // res.render('results.ejs');
})


app.listen(PORT, function(){
    console.log('Server Started!');
});