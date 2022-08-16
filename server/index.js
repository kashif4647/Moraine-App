import Server from './config/server';
import './config/env';
import db from './core/db/config/index';
import routes from './router';

const main = async () => {
  db();
  const server = new Server().router(routes);
  server.listen(process.env.PORT);
};

main();
