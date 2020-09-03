const bodyParser = require("body-parser");
const cors = require('cors');
var authroute = require('./authroute');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deleteuser', function(req, res){
        

        fs.readFile('./data/users.json', 'utf8', function(err, data) {
            if (err) throw err;
            accounts = JSON.parse(data)

            let a = accounts.find(user => ((user.id == req.body.id)));
            let index = accounts.findIndex(user => ((user.id == req.body.id)));
            accounts.splice(index, 1)
            accountsJSON = JSON.stringify(accounts)
            fs.writeFile('./data/users.json', accountsJSON, 'utf-8', function(err) {
                if (err) throw err;
                
            });
            console.log(a);
            res.send(a);
        });
    });
}