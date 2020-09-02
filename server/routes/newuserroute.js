const bodyParser = require("body-parser");
const cors = require('cors');
var authroute = require('./authroute');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/create', function(req, res){
        username = req.body.username
        password = req.body.password
        role = req.body.role

        
        /*let i = accounts.find(use => ((use.username == username) && (use.password == password)));
        if (i) {
            i.ok = true
            i.password = "";
            res.send(i);
        } else {
            res.send({"ok": false});
        }*/
    });
}