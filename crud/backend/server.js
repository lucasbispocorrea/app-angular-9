const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Modificar a função para garantir que o ID seja numérico
router.render = (req, res) => {
  if (Array.isArray(res.locals.data)) {
    res.locals.data.forEach(item => {
      if (item.id) {
        item.id = Number(item.id); // Força a conversão para número
      }
    });
  } else if (res.locals.data && res.locals.data.id) {
    res.locals.data.id = Number(res.locals.data.id); // Força a conversão para número
  }
  res.jsonp(res.locals.data);
};

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});
