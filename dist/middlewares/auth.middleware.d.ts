import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare const authMiddleware: (...areas: string[]) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
