import mongoose, { ConnectionOptions } from 'mongoose';
var config = require('./config/config')

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

  // await mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, options);
  await mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_db_name}`, options);
};

export { connectToDatabase };
