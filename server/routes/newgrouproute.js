const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/creategroup', function(req, res){
        let newGroup = {
            "id": "",
            "name": req.body.name,
            "users": [],
            "admins": [],
            "assis": [],
            "channels": [],
        }

        fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)

            let a = groups.find(use => ((use.name == newGroup.name)));
            if (a) {
                newGroup.ok = false
                console.log("Error: There is already a Group with this name.")
            } else {
                newGroup.id = groups[groups.length -1].id + 1;
                groups.push(newGroup)
                groupsJSON = JSON.stringify(groups);
                
                fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                    if (err) throw err;
                
                });
                newGroup.ok = true;
            }   
            res.send(newGroup);
        });
    });
}