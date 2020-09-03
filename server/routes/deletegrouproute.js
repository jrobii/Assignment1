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

            let a = groups.find(group => ((group.id == req.body.id)));
            let index = groups.findIndex(group => ((group.id == req.body.id)));
            groups.splice(index, 1)
            groupsJSON = JSON.stringify(groups)
            fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                if (err) throw err;
                
            });
            res.send(a);
        });
    });
}