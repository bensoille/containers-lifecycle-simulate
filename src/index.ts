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
  // console.log(req) ;
  res.status(202).json({ status: "Processing data.." });
  setTimeout( () => console.log('after 2s', config.listen_host, config.listen_port), 2000) ;
  // return res.json({ message: 'Hello World!' });
});

app.listen(config.listen_port, async () => {
  console.log(config.listen_host, config.listen_port) ;
  await connectToDatabase();

  console.log(`Application started on URL ${config.listen_host}:${config.listen_port} 🎉`);
});
