"use strict";
// /**
//  * Required External Modules
//  */
// import * as dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import { itemsRouter } from "./items/items.router";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// /**
//  * App Variables
//  */
// if (!process.env.PORT) {
//     console.log('Port not supplied')
//     process.exit(1);
// }
// const PORT: number = parseInt(process.env.PORT as string, 10);
// const app = express();
// /**
//  *  App Configuration
//  */
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use("/api/menu/items", itemsRouter);
// /**
//  * Server Activation
//  */
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
//   });
const app_1 = __importDefault(require("./app"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const licenses_route_1 = __importDefault(require("./routes/licenses.route"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
(0, validateEnv_1.default)();
const app = new app_1.default([new index_route_1.default(), new users_route_1.default(), new auth_route_1.default(), new licenses_route_1.default()]);
app.listen();
