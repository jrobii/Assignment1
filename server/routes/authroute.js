const bodyParser = require("body-parser");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.post('/api/auth', function(req, res){
        console.log(req.body.username);
        console.log(req.body.password);
    });
}