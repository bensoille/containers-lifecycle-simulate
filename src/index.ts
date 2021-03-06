import express from 'express';

import { connectToDatabase } from './databaseConnection';
import { containerRoute } from './routes/container.route';


var config = require('./config/config')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/containers', containerRoute());
// app.use('/', userRoute());

app.get('/', (req, res) => {
  return res.status(404).json({ message: 'Nothing there' }); ;
});

app.listen(config.listen_port, async () => {
  console.log(config.listen_host, config.listen_port) ;
  if(!!config.mongo_host) {
    console.log(`Connecting to mongo host ${config.mongo_host}`);
    await connectToDatabase();
  }
  else {
    console.log(`NOT connecting to mongo host ${config.mongo_host}`);
  }

  console.log(`Application started on URL ${config.listen_host}:${config.listen_port} 🎉`);
});
