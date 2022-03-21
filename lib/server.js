import { read } from 'fs';
import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
  const baseURL = `http${req.socket.encryption ? 's' : ''}://${
    req.headers.host
  }`;
  const parsedURL = new URL(req.url, baseURL);
  const httpMethod = req.method.toLowerCase();
  const parsedPathName = parsedURL.pathname;
  const trimmedPath = parsedPathName.replaceAll(/^\/+|\/+$/g, '');
  const header = req.headers;

  console.log('Bandom atidaryti:', trimmedPath);

  req.on('data', () => {
    console.log('Klientas atsiunte duomenu...');
  });

  req.on('end', () => {
    console.log('Uzklausa gauta, ziurim ko nori klientas...');

    const HTML = `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
              </head>
              <body>
                  <header>
                   <img src="#" alt="Logo">
                   <nav>
                    <a href="register">Register</a>
                    <a href="login">Login</a>
                   </nav>
                  </header>
                  <main>
                  {{KONKRETAUS PSL HTML: ateina is server.routes}}
                  </main>
                  <footer>
                    Copyright &copy; 2022
                  </footer>
              </body>
              </html>`;

    res.end(HTML);
  });
});

server.routes = {
  '': 'home HTML',
  404: '404 HTML',
  register: 'register HTML',
  login: 'login HTML',
  blog: 'blog HTML',
};

server.init = () => {
  console.log('bandau serverio procesa');
  const port = 3000;
  server.httpServer.listen(port, () => {
    console.log(`Tavo serveris sukasi and http://localhost:${port}`);
  });
};

export { server };
