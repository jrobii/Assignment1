const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deletechannel', function(req, res){

        fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)

            let a = groups.find(group => ((group.name == req.body.group)));
            if (!a) {
                res.send({ok: false})
            } else {
                let index = a.channels.findIndex(channel => ((channel.name == req.body.name)));
                if (index == -1) {
                    res.send({ok: false})
                } else {
                    a.channels.splice(index, 1)
                    groupsJSON = JSON.stringify(groups)
                    fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                        if (err) throw err;
                    });
                    res.send({ok : true})
                }
            }
        });
    });
}