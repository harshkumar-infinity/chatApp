const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: true
});

const db = mongoose.connection;

db.once('open', function (err) {

    if (err) {

        console.log("server is not running")

        return false;

    }

    console.log('db is connected');

})



module.exports = db;