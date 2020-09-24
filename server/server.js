const express = require('express');
const app = express();
var cors = require('cors');
const http = require('http').Server(app);
const server = require('./listen.js');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const PORT=3000;
const mongoUrl = 'mongodb://localhost:27017';

app.use(cors());

app.use(bodyParser.json());

MongoClient.connect(mongoUrl, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    if (err) {return console.log(err)}
    const db = client.db('ass2')
    //USER ROUTES
    require('./routes/authroute.js')(app, db);
    require('./routes/newuserroute.js')(app, db);
    require('./routes/deleteuserroute.js')(app, db);
    require('./routes/getusersroute.js')(app, db);
    require('./routes/getusersgroupsroute.js')(app, db);

    //GROUP ROUTES
    require('./routes/newgrouproute.js')(app, db);
    require('./routes/deletegrouproute.js')(app, db);
    require('./routes/getgroupsroute.js')(app, db);
    require('./routes/addusertogrouproute.js')(app, db);
    require('./routes/deleteuserfromgrouproute.js')(app, db);
    require('./routes/addnewadminroute.js')(app, db);
    require('./routes/addnewassisroute.js')(app, db);
    require('./routes/deladminroute.js')(app, db);
    require('./routes/delassisroute.js')(app, db);

    //CHANNEL ROUTES
    require('./routes/newchannelroute.js')(app, db);
    require('./routes/deletechannelroute.js')(app, db);
    require('./routes/addusertochannelroute.js')(app, db);
    require('./routes/deluserfromchannelroute.js')(app, db);

    server.listen(http, PORT);

});


