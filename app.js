'use strict';

import 'colors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import Webpack from 'webpack';

import sockets from './sockets';
import config from './webpack.config.js';

const app = new Koa(),
  webpack = Webpack(config),
  port = 3000;

sockets(app);

app
  .use(bodyParser())
  .use(serve(`${__dirname}/public`))
  .use(serve(`${__dirname}/dist`))

  .use(devMiddleware(webpack, {
    publicPath: config.output.publicPath,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    stats: { colors: true },
    quiet: false,
    noInfo: true
  }))

  .use(hotMiddleware(webpack, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))

  .listen(port, () => {
    console.log('Server Started ∹'.green, 'http://localhost:'.grey + port.toString().blue);
  });

export default app;
