"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _jsonwebtoken = require("jsonwebtoken");
const _config = require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/config");
const _httpException = require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/exceptions/HttpException");
const _usersModel = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/models/users.model"));
const _roles = require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/config/roles");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authMiddleware = (...requiredRights)=>async (req, res, next)=>{
        try {
            const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
            if (Authorization) {
                const secretKey = _config.SECRET_KEY;
                const verificationResponse = await (0, _jsonwebtoken.verify)(Authorization, secretKey);
                const userId = verificationResponse._id;
                const findUser = await _usersModel.default.findById(userId);
                if (findUser) {
                    if (authorized(requiredRights, findUser, req)) {
                        req.user = findUser;
                        next();
                    } else {
                        next(new _httpException.HttpException(401, 'Unauthorized user'));
                    }
                } else {
                    next(new _httpException.HttpException(401, 'Wrong authentication token'));
                }
            } else {
                next(new _httpException.HttpException(404, 'Authentication token missing'));
            }
        } catch (error) {
            next(new _httpException.HttpException(401, 'Wrong authentication token'));
        }
    };
const _default = authMiddleware;
function authorized(requiredRights, findUser, req) {
    if (requiredRights.length) {
        const userRights = _roles.roleRights.get(findUser.role);
        if (!userRights) {
            return false;
        }
        const hasRequiredRights = requiredRights.every((requiredRight)=>userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params['userId'] !== findUser._id) {
            return false;
        }
    }
}

//# sourceMappingURL=auth.middleware.js.map