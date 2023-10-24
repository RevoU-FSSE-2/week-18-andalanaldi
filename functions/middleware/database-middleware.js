const { MongoClient } = require('mongodb')

const DB_NAME = 'ipo-todow18';

const databaseMiddleware = async (req, res, next) => {
    const mongoClient = await new MongoClient('mongodb://127.0.0.1:27017').connect()
    db = mongoClient.db(DB_NAME)

    req.db = db

    next()
}

module.exports = databaseMiddleware