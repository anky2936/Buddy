const express = require('express');
const clarifai = require('clarifai');
const bodyParser = require('body-parser');
const http = require('http');
const hostname='localhost';
const port=3000;
const morgn=require('morgan');
const path = require('path');
const routerA=require('./routes/routerA');
let AbbyyClient=require('nodejs-ocr');

let client = new AbbyyClient('vision-hackeam', 'a7bGr2seQoblx1I9IK70zX4S', `http://${hostname}:${port}`);
function ocrComplete(err, results) {
    if( !err ) {
        console.log(results.toString()); // Raw results of completed Task (or a TaskId for submitImage calls)
    }
}

let apiParameters = {
    language: 'English',
    profile:  'textExtraction',
    textType: 'typewriter',
    exportFormat: 'xml'
    // etc...
};
client.processImage(apiParameters, './resources/text-for-ocr.png', ocrComplete);



const clarApp = new Clarifai.App({
 apiKey: 'c49ddad895fb4992a3c9e1a3b8b9c81c'
});

clarApp.models.predict(Clarifai.GENERAL_MODEL, "https://samples.clarifai.com/metro-north.jpg")
.then(
  function(response) {
    // do something with response
  }
).catch();

var app=express();
app.use(bodyParser.json());
app.use(morgn('dev'));

app.use('/',routerA);


const server =http.createServer(app);
server.listen(port,hostname,()=> {
  console.log(`Server is running at http://${hostname}:${port}`);
})
