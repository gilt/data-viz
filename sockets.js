import IO from 'koa-socket';
import ioClient from 'socket.io-client';
import { argv } from 'yargs';

const io = new IO();

export default function sockets (app) {
  io.attach(app);

  const bridgeUrl = 'wss://data-viz-bridge.tools.gilt.com',
    client = ioClient.connect(bridgeUrl);

  client.on('connect', () => {
    console.log('  ⁖'.grey, '⨀ '.green, bridgeUrl.grey);
  });

  client.on('connect_error', (err) => {
    console.log('  ⁖'.grey, '⨂ '.red, err.toString());
  });

  client.on('consume', (data) => {
    argv.verbose && console.log('  ←'.grey, '⨀ '.blue, 'consume', data);

    io.broadcast('data', data);

    argv.verbose && console.log('  →'.grey, '⨀ '.blue, 'data');
  });

  return io;
};
