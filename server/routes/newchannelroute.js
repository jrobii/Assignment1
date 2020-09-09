const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createchannel', function(req, res){
        console.log(req.body)

        let newChannel = {
            "name": req.body.name,
            "users": [],
        }
        fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)

            let a = groups.find(group => ((group.name == req.body.group)));
            if (!a) {
                res.send({ok: false});
            } else {
                if (a.admins.includes(req.body.user.id) || a.assis.includes(req.body.user.id) || req.body.user.role == "s-admin") {
                    let exists = a.channels.find(channel => ((channel.name == req.body.name)));
                    if (exists) {
                        res.send({ok: false})
                    } else {
                        a.channels.push(newChannel);
                        groupsJSON = JSON.stringify(groups)
                        fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                            if (err) throw err;
                        });
                        newChannel.ok = true
                        newChannel.valid = true;
                        res.send(newChannel)
                    }
                } else {
                    res.send({valid: false});
                }
            }
        });
    });
}