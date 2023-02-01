import { NextFunction, Request, Response } from 'express';
import { License } from '../interfaces/licenses.interface';
import licenseService from '../services/licenses.service';
import { CreateLicenseDto, UpdateLicenseDto } from '..//dtos/licenses.dto';

class LicensesController {
  public userService = new licenseService();

  public getLicenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLicensesData: License[] = await this.userService.findAllLicense();

      res.status(200).json({ data: findAllLicensesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLicenseByPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const phone: string = req.params.phone;
      const findOneLicenseData: License = await this.userService.findLicenseByPhone(phone);

      res.status(200).json({ data: findOneLicenseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTrailLicense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateLicenseDto = req.body;
      const createLicenseData: License = await this.userService.createTrailLicense(userData);

      res.status(201).json({ data: createLicenseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLicense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const userData: UpdateLicenseDto = req.body;
      const updateLicenseData: License = await this.userService.updateLicense(id, userData);

      res.status(200).json({ data: updateLicenseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLicense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deleteLicenseData: License = await this.userService.deleteLicense(id);

      res.status(200).json({ data: deleteLicenseData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LicensesController;
