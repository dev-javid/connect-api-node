import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import LicensesController from '../controllers/licenses.controller';
import { CreateLicenseDto, UpdateLicenseDto } from '../dtos/licenses.dto';

class LicensesRoute implements Routes {
  public path = '/licenses';
  public router = Router();
  public controller = new LicensesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware('admin'), this.controller.getLicenses);
    this.router.get(`${this.path}/:phone`, authMiddleware('admin', 'app'), this.controller.getLicenseByPhone);
    this.router.post(
      `${this.path}/trial`,
      authMiddleware('admin', 'app'),
      validationMiddleware(CreateLicenseDto, 'body'),
      this.controller.createTrailLicense,
    );
    this.router.put(`${this.path}/:id`, authMiddleware('admin'), validationMiddleware(UpdateLicenseDto, 'body'), this.controller.updateLicense);
    this.router.delete(`${this.path}/:id`, authMiddleware('admin'), this.controller.deleteLicense);
  }
}

export default LicensesRoute;
