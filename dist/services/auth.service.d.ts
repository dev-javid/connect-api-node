/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { LoginUserDto } from '../dtos/users.dto';
import { TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
declare class AuthService {
    users: import("mongoose").Model<User & import("mongoose").Document<any, any, any>, {}, {}, {}, any>;
    signup(userData: LoginUserDto): Promise<User>;
    login(userData: LoginUserDto): Promise<{
        token: TokenData;
    }>;
    logout(userData: User): Promise<User>;
    createToken(user: User): TokenData;
    createCookie(tokenData: TokenData): string;
}
export default AuthService;
