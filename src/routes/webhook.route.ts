import { Router } from 'express';
import WebhookController from '../controllers/webhook.controller';
import { Routes } from '../interfaces/routes.interface';

class WebhookRoute implements Routes {
  public path = '/webhook';
  public router = Router();
  public controller = new WebhookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:customerId`, this.controller.get);
    this.router.post(`${this.path}/:customerId`, this.controller.post);
  }
}

export default WebhookRoute;
