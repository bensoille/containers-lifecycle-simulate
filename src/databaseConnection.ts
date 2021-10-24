import mongoose, { ConnectionOptions } from 'mongoose';
var config = require('./config/config')

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

  // await mongoose.connect(`mongodb://${config.mongo_user_name}:${config.mongo_user_pass}@${config.mongo_host}:${config.mongo_port}/${config.mongo_db_name}`, options);
  await mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_db_name}`, options);
};

export { connectToDatabase };
