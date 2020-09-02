const bodyParser = require("body-parser");
const cors = require('cors');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/auth', function(req, res){
        username = req.body.username
        password = req.body.password

        accounts = [
            {"id": 1, "username": "super", "email": "admin@admin.com", "password": "admin", "role": "s-admin"}
        ]
        
        let i = accounts.find(use => ((use.username == username) && (use.password == password)));
        if (i) {
            i.ok = true
            i.password = "";
            res.send(i);
        } else {
            res.send({"ok": false});
        }
    });
}