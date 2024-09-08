const mongoose = require('mongoose');

mongoose.connect(process.env.DB);

const db = mongoose.connection;

db.once('open', function (err) {
    if (err) {
        console.log("server is not running")
        return false;
    }
    console.log('db is connected');
})

module.exports = db;