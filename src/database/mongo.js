/**
*
* Utilitário que proporciona os logs da aplicação.
*
* @file         log.js
* @package      utils
*/

const mongoose = require('mongoose'),
      log = require('@utils/log').mongoLog;

class Mongo {
    constructor(host, user, password, schema, auth = false) {
        let mongoString = `mongodb+srv://${host}/${schema}?retryWrites=true&w=majority`;
        if(!!auth) {
            mongoString = `mongodb+srv://${user}:${password}@${host}/${schema}?retryWrites=true&w=majority`;
        }

        this.uri = mongoString;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connection.on('connected', () => log(`connected at ${host}`));
        mongoose.connection.on('error', () => log('error'));
        mongoose.connection.on('disconnected', () => log('disconnected'));
        mongoose.connection.on('reconnectFailed', () => log('failed'));
    }

    async connect() {
        await mongoose.connect(this.uri, this.options);
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

module.exports = Mongo;
