const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/addusertochannel', function(req, res){
        
        fs.readFile('./data/users.json', 'utf8', function(err, userData) {
            if (err) throw err;
            userlist = JSON.parse(userData);
            let user = userlist.find(use => ((use.username == req.body.user)));
            fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
                if (err) throw err;
                groups = JSON.parse(data)

                let a = groups.find(group => ((group.name == req.body.group)));
                let channel = a.channels.find(channel => ((channel.name == req.body.channel)));

                let exists = channel.users.includes(user.id);
                if (exists) {
                    res.send({ok: false});
                } else {
                    channel.users.push(user.id);

                    groupsJSON = JSON.stringify(groups)
                    fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                        if (err) throw err;
                    });
                    user.ok = true
                    res.send(user)
                }
            });
        });
    });
}