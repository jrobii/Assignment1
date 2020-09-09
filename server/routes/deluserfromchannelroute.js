const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deluserfromchannel', function(req, res){
        
        fs.readFile('./data/users.json', 'utf8', function(err, userData) {
            if (err) throw err;
            userlist = JSON.parse(userData);
            let user = userlist.find(use => ((use.username == req.body.username)));
            if (!user) {
                res.send({ok:false})
            } else {
                fs.readFile('./data/gcd.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    groups = JSON.parse(data)
                    let a = groups.find(group => ((group.name == req.body.group)));
                    if (!a) {
                        res.send({ok: false})
                    } else {
                        let channel = a.channels.find(channel => ((channel.name == req.body.channel)));
                        if (!channel) {
                            res.send({ok: false});
                        } else {
                            if (a.admins.includes(req.body.user.id) || a.assis.includes(req.body.user.id) || req.body.user.role == "s-admin") {
                                let index = channel.users.indexOf(user.id);
                                if (index == -1) {
                                    res.send({ok: false})
                                } else {
                                    channel.users.splice(index, 1);

                                    groupsJSON = JSON.stringify(groups);
                                    fs.writeFile('./data/gcd.json', groupsJSON, 'utf-8', function(err) {
                                        if (err) throw err;
                                    });
                                    user.ok = true;
                                    user.valid = true;
                                    res.send(user);
                                }
                            } else {
                                res.send({valid:false});
                            }
                        }   
                    }
                });
            }
        });
    });
}