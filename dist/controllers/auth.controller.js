"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _authService = _interopRequireDefault(require("//?/C:/Users/javid/OneDrive/Desktop/connect-api/src/services/auth.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthController = class AuthController {
    constructor(){
        this.authService = new _authService.default();
        this.signUp = async (req, res, next)=>{
            try {
                const userData = req.body;
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json({
                    data: signUpUserData,
                    message: 'signup'
                });
            } catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next)=>{
            try {
                const userData = req.body;
                const { token  } = await this.authService.login(userData);
                res.status(200).json({
                    data: token,
                    message: 'login'
                });
            } catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next)=>{
            try {
                const userData = req.user;
                const logOutUserData = await this.authService.logout(userData);
                res.setHeader('Set-Cookie', [
                    'Authorization=; Max-age=0'
                ]);
                res.status(200).json({
                    data: logOutUserData,
                    message: 'logout'
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = AuthController;

//# sourceMappingURL=auth.controller.js.map