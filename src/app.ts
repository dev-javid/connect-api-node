import express from 'express';
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import hpp from 'hpp';
import compression from 'compression';
import { connect, set } from 'mongoose';
import { dbConnection } from './databases';
import { Routes } from './interfaces/routes.interface';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  constructor(routes: Routes[]) {
    this.port = parseInt(process.env.PORT as string, 10);
    this.app = express();
 
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    // this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use("/api/menu/items", itemsRouter);
  }

  private connectToDatabase() {
    // if (this.env !== 'production') {
    //   set('debug', true);
    // }

    connect(dbConnection.url);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
export default App;