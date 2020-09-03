const express = require('express');
const app = express();
var cors = require('cors');
const http = require('http').Server(app);
const server = require('./listen.js');
const bodyParser = require('body-parser');
const path = require('path');


const PORT=3000;

//USER ROUTES
require('./routes/authroute.js')(app, path);
require('./routes/newuserroute.js')(app, path);
require('./routes/deleteuserroute.js')(app, path);
require('./routes/getusersroute.js')(app, path);

//GROUP ROUTES
require('./routes/newgrouproute.js')(app, path);
require('./routes/deletegrouproute.js')(app, path);
require('./routes/getgroupsroute.js')(app, path);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../dist/assignment')));

server.listen(http, PORT);

