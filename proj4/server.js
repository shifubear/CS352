const http = require('http');
const express = require('express');
const fs = require('fs')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(express.static('./'));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

app.get('/', function (req, res) {
    try {  
        var data = fs.readFileSync('static/index.html', 'utf8');
        res.send(data.toString());
        console.log(data.toString());    
    } catch(e) {
        console.log('Error:', e.stack);
    }
});