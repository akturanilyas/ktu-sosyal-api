import path = require('path');
import * as fs from 'fs';

const getMiddlewares = (middlewares) => middlewares.reduce((acc, middlewareDetail) => {
  if (typeof middlewareDetail === 'string') {
    const middleware = require(path.join('../src/middlewares/', middlewareDetail));
    return acc.concat(middleware);
  } if (typeof middlewareDetail === 'object') {
    const middlewaresWithParams = Object.keys(middlewareDetail).map((middlewarePath) => {
      const middleware = require(path.join('../src/middlewares/', middlewarePath));
      return middleware(...middlewareDetail[middlewarePath]);
    });
    return acc.concat(...middlewaresWithParams);
  }
  return acc;
}, []);

export const routeBuilder = (app) => {
  const routeDir = path.join(process.cwd(), 'src/routes');
  fs.readdirSync(routeDir).forEach((file) => {
    require(path.join(routeDir, file)).forEach((route) => {
      const params = [];
      params.push(route.path);
      if (route.middlewares) {
        const middlewares = getMiddlewares(route.middlewares);
        params.push(...middlewares);
      }
      params.push(route.handler);
      app[route.method](...params);
    });
  });
};
