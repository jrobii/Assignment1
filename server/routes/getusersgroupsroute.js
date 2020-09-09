const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/getusersgroups', function(req, res){
        fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)
            userGroups = groups.filter(group => group.users.indexOf(req.body.id) !== -1);
            res.send(userGroups);
        });
    });
}