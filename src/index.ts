/* eslint-disable linebreak-style */
import app from './App';
import MongoDB from './components/mongoDB';
import config from './config';

const listen = (): void => {
  app.listen(config.port, () => {
    console.log(`[Node] - Server is listening on port ${config.port}`);
  });
};

MongoDB.connect()
  .then(() => {
    console.log('[MongoDB] - Connect to database successfully.');
    listen();
  })
  .catch((error: any) => console.log(error));
