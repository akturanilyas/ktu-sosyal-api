import 'dotenv/config';
import { dbConnect } from './database';
import { server } from './server';

(async () => {
  await dbConnect();
  await server();
})();
