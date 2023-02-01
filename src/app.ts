import express from 'express';
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';

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
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api/menu/items", itemsRouter);
  }
}

export default App;
