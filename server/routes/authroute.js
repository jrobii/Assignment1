module.exports = function (app, db) {
    app.post('/api/auth', function(req, res){
        username = req.body.username
        password = req.body.password

        const collection = db.collection('users');
        collection.find({username: username, password:password}).toArray((err, data) => {
            if (err) throw err;
            if (data.length) {
                res.send({ok: false})
            } else {
                res.send(data)
            }
        })
    });
}