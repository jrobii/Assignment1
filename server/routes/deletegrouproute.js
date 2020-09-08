const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deletegroup', function(req, res){

        fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)
            console.log(req.body)

            let a = groups.find(group => ((group.name == req.body.name)));
            let index = groups.findIndex(group => ((group.name == req.body.name)));
            if (index == -1 ) {
                res.send({ok: false})
            } else {
                groups.splice(index, 1)
                groupsJSON = JSON.stringify(groups)
                fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                    if (err) throw err;  
                });
                a.ok = true;
                res.send(a);
            }
        });
    });
}