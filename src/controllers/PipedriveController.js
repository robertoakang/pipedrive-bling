/**
 *
 * Responsável controlar as execuções relativas ao Pipedrive
 *
 * @file         PipedriveController.js
 * @package      controllers
 */

const PipeDriveApi = require("@services/pipedriveApi");
const OrderController = require("./OrderController");

class PipedriveController {
  // Lists all business
  async listAllBusiness(req, res) {
    try {
      const { data } = await PipeDriveApi.get("/deals");
      const business = [];

      if (data.data) {
        data.data.forEach((client) => {
          const {
            title,
            value,
            status,
            won_time: wonTime,
            person_id: { name },
          } = client;
          business.push({ title, value, status, wonTime, name });
        });
      }

      return res.status(200).json(business);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // Get all business with WON status and set new Bling order
  async execute(req, res) {
    try {
      const { data } = await PipeDriveApi.get("/deals", { status: "won" });

      if (data.data) {
        data.data.forEach(async (client) => {
          const {
            title,
            value,
            person_id: { name },
          } = client;

          const clientName = name;
          const sellId = Math.ceil(Math.random() * (1000 - 1) + 1);
          const productDesc = title;
          const priceProduct = value;
          const priceTranche = value;

          // Create a new order in Bling
          await OrderController.insertOrder(
            clientName,
            sellId,
            productDesc,
            priceProduct,
            priceTranche
          );
        });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new PipedriveController();
