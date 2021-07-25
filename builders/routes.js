"use strict";
exports.__esModule = true;
exports.routeBuilder = void 0;
var path = require("path");
var fs = require("fs");
var getMiddlewares = function (middlewares) { return middlewares.reduce(function (acc, middlewareDetail) {
    if (typeof middlewareDetail === 'string') {
        var middleware = require(path.join('../src/middlewares/', middlewareDetail));
        return acc.concat(middleware);
    }
    if (typeof middlewareDetail === 'object') {
        var middlewaresWithParams = Object.keys(middlewareDetail).map(function (middlewarePath) {
            var middleware = require(path.join('../src/middlewares/', middlewarePath));
            return middleware.apply(void 0, middlewareDetail[middlewarePath]);
        });
        return acc.concat.apply(acc, middlewaresWithParams);
    }
    return acc;
}, []); };
var routeBuilder = function (app) {
    var routeDir = path.join(process.cwd(), 'src/routes');
    fs.readdirSync(routeDir).forEach(function (file) {
        require(path.join(routeDir, file)).forEach(function (route) {
            var params = [];
            params.push(route.path);
            if (route.middlewares) {
                var middlewares = getMiddlewares(route.middlewares);
                params.push.apply(params, middlewares);
            }
            params.push(route.handler);
            app[route.method].apply(app, params);
        });
    });
};
exports.routeBuilder = routeBuilder;
