import fs from 'fs';
import Router from 'koa-router';

// const panda = fs.readFileSync('./data-panda.html', 'utf-8');
const index = fs.readFileSync('./src/index.html', 'utf-8');
const router = new Router();

function routes (socket) {
  router.get('/', async ctx => {
    // ctx.body = panda;
    //ctx.response.sendFile(__dirname + '/src/index.html');
    ctx.body = index;
  });

  return router;
}

export default routes;
