import { server } from './lib/server.js';

const app = {};

app.init = () => {
  //logika...
  // pasiruosti pradinius folders

  // pasiruosti pradinius files

  // prisijungti prie DB

  // uzkurti pati serveri

  server.init();

  // reguliariu procesu paleidimas
  // - istrinti senus/nebereikalingus failus
  // - maziau naudojamu failu archyvavimas
  // - atsinaujinti informacija per/is API
};

app.init();

export { app };
