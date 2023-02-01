import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { itemsRouter } from 'items/items.router';
import morgan from 'morgan';
import { LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import { stream } from './utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.port = parseInt(process.env.PORT as string, 10);
    this.app = express();
 
    //this.connectToDatabase();
    this.initializeMiddlewares();
    //this.initializeRoutes(routes);
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
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api/menu/items", itemsRouter);
  }
}

export default App;
