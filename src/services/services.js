const Mongo = require('@source/database/mongo'),
      { MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_SCHEMA,
        MONGO_AUTH } = process.env;

exports.mongo = new Mongo(
        MONGO_HOST,
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_SCHEMA,
        MONGO_AUTH
    );
