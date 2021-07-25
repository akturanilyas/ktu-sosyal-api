import * as express from 'express';
import { errorHandler, notFoundError } from './middlewares/erros.middleware';
import { routeBuilder } from '../builders/routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ hello: 'world' });
});

routeBuilder(app);

app.use(notFoundError);
app.use(errorHandler);

export const server = async () => {
  await app.listen(process.env.PORT);
  console.log('Server started port 3500');
};
