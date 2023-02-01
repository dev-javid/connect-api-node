// /**
//  * Required External Modules
//  */
// import * as dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import { itemsRouter } from "./items/items.router";

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

import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import LicensesRoute from './routes/licenses.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new LicensesRoute()]);

app.listen();
