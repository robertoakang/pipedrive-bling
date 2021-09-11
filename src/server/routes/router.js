/**
 *
 * Responsável por registrar as rotas e orientar as solicitações aos
 * seus controladores apropriados.
 *
 * @file          router.js
 * @package       routes
 */

const { version } = require("@root/package.json");
const OrderController = require("@controllers/OrderController");
const PipedriveController = require("@controllers/PipedriveController");
const AggregateController = require("@controllers/AggregateController");

module.exports = (http) => {
  // Default routes
  http.get(`/ping`, async (req, res) => res.status(200).send(`pong`));
  http.get(`/version`, async (req, res) => res.status(200).send({ version }));

  // Bling - Consult orders
  http.get(`/bling/orders`, OrderController.getOrder);

  // Pipedrive - List all business
  http.get(`/pipedrive`, PipedriveController.listAllBusiness);
  // Get all business with WON status and set new Bling order
  http.put(`/pipedrive/execute`, PipedriveController.execute);

  // Mongo - Aggreagate Bling
  http.put(`/aggregate`, AggregateController.aggregate);
  // Get collection data
  http.get(`/aggregate`, AggregateController.getAggregates);
  http.get(`/aggregate/:date`, AggregateController.getAggregateByDate);
};
