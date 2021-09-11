/**
 *
 * Servidor HTTP responsável por receber todas as requisições que são feitas para a aplicação.
 *
 * @file          server.js
 * @package       server
 * @description	 Método padrão responsável por iniciar o servidor HTTP.
 */

const express = require("express");
const cors = require("cors");
const log = require("@utils/log").serverLog;
const router = require("@server/routes/router");

const server = express();
const { APP_HOST, APP_PORT } = process.env;

module.exports = () => {
  router(server);
  server.use(cors());
  server.use(express.json({ limit: "50mb" }));
  server.listen(APP_PORT, APP_HOST, (err) => {
    if (err) throw err;
    log(`Listening on ${APP_HOST}:${APP_PORT}`);
  });
};
