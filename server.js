import http from 'http';

import app from './app';

const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

module.exports = server;
