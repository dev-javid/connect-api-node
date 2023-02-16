import express from 'express';
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { NODE_ENV, PORT, DB_CONNECTION, ORIGIN, CREDENTIALS } from './config';
import hpp from 'hpp';
import compression from 'compression';
import { connect, set } from 'mongoose';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public start() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    // // // // As required by cyclic serverless we need to connect database for each request
    // // // // https://docs.cyclic.sh/how-to/using-mongo-db#connections-in-a-serverless-runtime
    // // // connect(DB_CONNECTION, {
    // // //   ssl: true,
    // // // },(error) => {
    // // //   if (error) {
    // // //     console.info(`=================================`);
    // // //     console.info(`Error starting server`);
    // // //     console.error(error);
    // // //     console.info(`=================================`);
    // // //     return false;
    // // //   }
    // // //   this.app.listen(this.port, () => {
    // // //     console.info(`=================================`);
    // // //     console.info(`======= ENV: ${this.env} =======`);
    // // //     console.info(`🚀 App listening on the port ${this.port}`);
    // // //     console.info(`=================================`);
    // // //   });
    // // // });

    
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
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

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

}
export default App;