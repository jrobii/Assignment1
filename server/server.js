const express = require('express');
const app = express();
var cors = require('cors');
const http = require('http').Server(app);
const server = require('./listen.js');
const bodyParser = require('body-parser');
const path = require('path');


const PORT=3000;

require('./routes/authroute.js')(app, path)

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../dist/assignment')));

server.listen(http, PORT);

