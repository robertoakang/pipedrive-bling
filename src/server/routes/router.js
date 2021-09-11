/**
*
* O Router é responsável por orientar as solicitações aos seus controladores apropriados.
*
* @file          router.js
* @package       server
* @description	 Responsável por registrar as rotas que serão utilizadas no server HTTP.
*/

const version = require('@root/package.json').version;
const OrderController = require('@controllers/OrderController'),
      PipedriveController = require('@controllers/PipedriveController');

module.exports = (http) => {
    // Default routes
    http.get(`/ping`, async (req, res) => res.status(200).send(`pong`));

    http.get(`/version`, async (req, res) => res.status(200).send({version}));

    // Bling - Consult orders
    http.get(`/bling/orders`, OrderController.getOrder);

    // Pipedrive
    http.get(`/pipedrive`, PipedriveController.listAllBusiness);
    // Get all business with WON status and set new Bling order
    http.get(`/pipedrive/execute`, PipedriveController.execute);

    
};