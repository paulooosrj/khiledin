const controller = (name) => require(`../controllers/${name}Controller`);

const apisController = controller('api');
const appController = controller('app');
const botsController = controller('bots');

const actionIndex = (req, res) => {
    res.render('index', {'title': 'Meu Titulo'});
};

const mapRoutes = [
    {
        method: 'get',
        path: '/',
        action: actionIndex
    },
    {
        method: 'get',
        path: '/s/:sala',
        action: appController['redirectRoom']
    },
    {
        method: 'get',
        path: '/room/:sala?',
        action: appController['room']
    },
    {
        method: 'get',
        path: '/re-room',
        action: appController['reRoom']
    },
    {
        method: 'post',
        path: '/upload/:type',
        action: appController['upload']
    },
    {
        method: 'get',
        path: '/logout',
        action: appController['logout']
    },
    {
        method: 'get',
        path: '/bots',
        action: botsController['bots']
    },
    {
        method: 'get',
        path: '/bot/:id',
        action: botsController['botFind']
    },
    {
        method: 'get',
        path: '/code/:file',
        action: botsController['code']
    },
    {
        method: 'post',
        path: '/users/new',
        action: apisController['newUser']
    },
    {
        method: 'post',
        path: '/users/auth',
        action: apisController['auth']
    }
];

const routes = (app) => mapRoutes.map(route => {
  log.watch(`[${route.method}]: ${route.path}`);
  app[route.method](route.path, route.action);
});

module.exports = routes;
