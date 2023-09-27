import { connect } from 'mongoose'

export async function connectToMongo () {
  connect('mongodb://localhost:27017/stocksystem')
    .then((db) => console.log('MongoDB is connected to', db.connection.db.databaseName))
    .catch(err => console.log(err))
}
