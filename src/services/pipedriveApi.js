const axios = require('axios');

class Pipedrive {
    constructor() {
        this.params = {
            limit: 500,
            api_token: process.env.PIPEDRIVE_KEY
        };        
        this.pipeDrive_api = axios.create({
            baseURL: process.env.PIPEDRIVE_BASE_URL,
        });
    }

    async get(endpoint, params = null) {
        if(params) params = Object.assign(params, this.params);
        else params = this.params;
        return this.pipeDrive_api.get(endpoint, { params });
    }

    async post(endpoint, body, params = null) {
        if(params) params = Object.assign(params, this.params);
        else params = this.params;
        return this.pipeDrive_api.post(endpoint, body, { params });
    }
}

module.exports = new Pipedrive();
