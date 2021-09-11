/**
*
* Utilitário que proporciona os logs da aplicação.
*
* @file         log.js
* @package      utils
*/

const log = require('debug')('pipeline-bling');

exports.serverLog = log.extend('server');
exports.mongoLog = log.extend('mongo');
