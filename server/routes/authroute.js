const bodyParser = require("body-parser");
const cors = require('cors');
var fs = require('fs');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/auth', function(req, res){
        username = req.body.username
        password = req.body.password

        fs.readFile('./data/users.json', 'utf8', function(err, data) {
            if (err) throw err;
            accounts = JSON.parse(data)
        

            let a = accounts.find(use => ((use.username == username) && (use.password == password)));
            if (a) {
                a.ok = true
                a.password = "";
                res.send(a);
                console.log("I am found"+ a.email)
            } else {
                res.send({"ok": false});
            }
        });
    });
}