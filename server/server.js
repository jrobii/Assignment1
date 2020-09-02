const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const server = require('./listen.js');
const bodyParser = require('body-parser');
const path = require('path');

const PORT=3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../dist/assignment')));

server.listen(http, PORT);

