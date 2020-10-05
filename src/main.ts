import { AppFactory } from './app';

(async () => {
  const app = await AppFactory.create();
  await app.listen(8080);
})();
