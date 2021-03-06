/**
 *
 * Responsável efetuar as requisições para o Bling.
 *
 * @file          blingApi.js
 * @package       services
 */

const axios = require("axios");
const qs = require("query-string");

class Bling {
  constructor() {
    this.params = { apikey: process.env.BLING_KEY };
    this.bling_api = axios.create({
      baseURL: process.env.BLING_BASE_URL,
    });
  }

  async get(endpoint, params = null) {
    if (params) params = Object.assign(params, this.params);
    else params = this.params;
    return this.bling_api.get(endpoint, { params });
  }

  async post(endpoint, body, config) {
    if (body) body = Object.assign(body, this.params);
    else body = this.body;
    return this.bling_api.post(endpoint, qs.stringify(body), config);
  }
}

module.exports = new Bling();
