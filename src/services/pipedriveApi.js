const axios = require('axios');

class Pipedrive {
    constructor() {
        this.params = {
            limit: 500,
            api_token: process.env.PIPEDRIVE_KEY
        };        
        this.pipeDrive_api = axios.create({
            baseURL: 'https://linkapitest.pipedrive.com/v1',
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
