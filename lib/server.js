import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
  const baseURL = `http${req.socket.encryption ? 's' : ''}://${
    req.headers.host
  }`;
});

server.init = () => {
  console.log('bandau serverio procesa');
  const port = 3000;
  server.httpServer.listen(port, () => {
    console.log(`Tavo serveris sukasi and http://localhost:${port}`);
  });
};

export { server };
