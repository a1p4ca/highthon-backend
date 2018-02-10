'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaChalkLogger = require('koa-chalk-logger');

var _koaChalkLogger2 = _interopRequireDefault(_koaChalkLogger);

var _koaConditionalGet = require('koa-conditional-get');

var _koaConditionalGet2 = _interopRequireDefault(_koaConditionalGet);

var _koaEtag = require('koa-etag');

var _koaEtag2 = _interopRequireDefault(_koaEtag);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _routes = require('./src/routes');

var _routes2 = _interopRequireDefault(_routes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var port = process.env.NODE_ENV === 'production' ? 80 : 3000;

app.use((0, _koaChalkLogger2.default)()).use((0, _koaConditionalGet2.default)()).use((0, _koaEtag2.default)()).use((0, _koaBodyparser2.default)()).use(_routes2.default.routes()).use(_routes2.default.allowedMethods()).use((0, _koaStatic2.default)(_path2.default.join(__dirname, 'public'), { maxage: 1000 * 60 * 30 })).listen(port);

console.log('Server starts!');