import { Routes } from '../interfaces/routes.interface';
import LicensesController from '../controllers/licenses.controller';
declare class LicensesRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    controller: LicensesController;
    constructor();
    private initializeRoutes;
}
export default LicensesRoute;
