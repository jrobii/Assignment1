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

        let newUser = {
            "id": "",
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role,
        }

        fs.readFile('./data/users.json', 'utf8', function(err, data) {
            if (err) throw err;
            accounts = JSON.parse(data)
            newUser.id = accounts[accounts.length -1].id + 1;
            accounts.push(newUser)

            accountsJSON = JSON.stringify(accounts);

            fs.writeFile('./data/users.json', accountsJSON, 'utf-8', function(err) {
                if (err) throw err;
                
            });
            res.send(newUser);
        });
    });
}