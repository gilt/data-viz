import IO from 'koa-socket';
import ioClient from 'socket.io-client';

const io = new IO();

export default function sockets (app) {
  io.attach(app);

  let bridgeUrl = 'wss://data-viz-bridge.tools.gilt.com',
    client = ioClient.connect(bridgeUrl);

  client.on('connect', function () {
    console.log('  ⁖'.grey, '⨀ '.green, bridgeUrl.grey);
  });

  client.on('connect_error', function (err) {
    console.log('  ⁖'.grey, '⨂ '.red, err.toString());
  });

  client.on('consume', (data) => {
    console.log('  ←'.grey, '⨀ '.blue, 'consume');

    io.broadcast('data', data);
    console.log('  →'.grey, '⨀ '.blue, 'data');
  });

  return io;
};
