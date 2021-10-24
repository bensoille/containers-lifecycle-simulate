import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase } from './databaseConnection';
import { containerRoute } from './routes/container.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/containers', containerRoute());
// app.use('/', userRoute());

app.get('/', (req, res) => {
  // console.log(req) ;
  res.status(202).json({ status: "Processing data.." });
  setTimeout( () => console.log('after 2s', HOST, PORT), 2000) ;
  // return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  console.log(HOST, PORT) ;
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
