import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import { erroMiddlaware } from './middlewares/error';
import routes from './routes';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(erroMiddlaware);
  return app.listen(process.env.PORT, () =>
    console.log(`Server running on PORT: ${process.env.PORT}`)
  );
});
