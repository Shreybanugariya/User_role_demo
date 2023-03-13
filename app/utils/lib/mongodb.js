// const mongoose = require('mongoose')

// const mongodb = {}

// mongodb.initialize = async () => {
//     try{
//         await mongoose.connect(process.env.DB_URL)
//         log.yellow('DB connected!!')
//     }catch(error) {
//         throw new Error(error)
//     }
// }

// mongodb.mongify = id => mongoose.Schema.Types.ObjectId(id)

// module.exports = mongodb

const DB_URL = process.env.DB_URL;

const mongoose = require('mongoose')

function connection(DB_URL, maxPoolSize = 5, DB) {
  try {
    const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }
    const conn = mongoose.createConnection(DB_URL, dbConfig)
    conn.on('connected', () => console.log(`Connected to ${DB} database.`))
    conn.syncIndexes({ background: true })
    return conn
  } catch (error) {
    throw new Error(error)
  }
}

const mongodb = connection(DB_URL, 10, 'test')
module.exports = { mongodb }