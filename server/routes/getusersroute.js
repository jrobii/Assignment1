const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/getusers', function(req, res){
        fs.readFile('./data/users.json', 'utf8', function(err, data) {
            if (err) throw err;
            accounts = JSON.parse(data)
            res.send(accounts);
        });
    });
}