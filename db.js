const { MongoClient } = require('mongodb');

let dbConnection
let uri = 'mongodb+srv://21700003:mN15veI2rqpIPc43@cluster0.f1obykr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch((err) => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}