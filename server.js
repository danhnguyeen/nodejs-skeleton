import http from 'http';
import config from 'config';

import app from './app';

const port = config.get('PORT');
const server = http.createServer(app);
server.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

module.exports = server;
