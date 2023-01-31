"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dbConnection", {
    enumerable: true,
    get: ()=>dbConnection
});
const _config = require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/config");
const dbConnection = {
    url: `mongodb://${_config.DB_HOST}:${_config.DB_PORT}/${_config.DB_DATABASE}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

//# sourceMappingURL=index.js.map