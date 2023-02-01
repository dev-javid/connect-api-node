import { NextFunction, Request, Response } from 'express';
import licenseService from '../services/licenses.service';
declare class LicensesController {
    userService: licenseService;
    getLicenses: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getLicenseByPhone: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createTrailLicense: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateLicense: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteLicense: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default LicensesController;
