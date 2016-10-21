'use strict';

import 'colors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import devWare from 'koa-webpack';

import sockets from './sockets';
import config from './webpack.config.js';

const app = new Koa(),
  port = 3000;

sockets(app);

app
  .use(bodyParser())
  .use(serve(`${__dirname}/public`))
  .use(serve(`${__dirname}/dist`))

  .use(devWare({
    dev: {
      publicPath: config.output.publicPath,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      stats: { colors: true },
      quiet: false,
      noInfo: true
    },
    hot: {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }
  }))

  .listen(port, () => {
    console.log('Server Started ∹'.green, 'http://localhost:'.grey + port.toString().blue);
  });

export default app;
