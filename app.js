'use strict';

import bodyParser from 'koa-bodyparser';
import colors from 'colors';
import Koa from 'koa';
import routes from './routes';
import serve from 'koa-static';
import sockets from './sockets';

import * as path from 'path';
import convert from 'koa-convert';

import Webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import config from './webpack.config.js';
const webpack = Webpack(config);

const app = new Koa(),
  socket = sockets(app),
  router = routes(socket),
  port = 3000;

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

  // .use(router.routes())
  // .use(router.allowedMethods())

  .listen(port, () => {
    console.log('Server Started ∹'.green, 'http://localhost:'.grey + port.toString().blue);
  });

export default app;
