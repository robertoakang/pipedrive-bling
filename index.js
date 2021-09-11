/**
*
* Apenas o arquivo de inicialização da aplicação. Responsável por importar as 
* bibliotecas mais importantes.
*
* @file          index.js
* @package       index
*/

require('module-alias/register');
require('dotenv').config();
require('@server/server')();
const { mongo } = require('@services/services');


(function () {
    try {
        mongo.connect();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();