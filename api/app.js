import express from 'express';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import getRoutes from './routes';

const app = express();
const port = process.env.PORT || 3000;

const adaptor = new FileSync('./db.json');

// Create instance of lowdb database and start server

low(adaptor)
  .then((db) => {
    app.use('/api', getRoutes(db));
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
