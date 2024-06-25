"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../config");
const utils_1 = require("../../utils");
class AuthService {
    constructor() { }
    static register(email, password, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //validate that user does not exist
                const user = yield config_1.DatabaseManager.getInstance().user.findUnique({
                    where: {
                        email,
                    },
                });
                if (user) {
                    if (!user.isVerified)
                        throw new utils_1.AppError("the email already used,but not verified yet", 400);
                    else
                        throw new utils_1.AppError("the email already used try another one", 400);
                }
                //generate and hash otp
                const otp = utils_1.OTPService.generate(6);
                const hashedOTP = utils_1.OTPService.hash(String(otp));
                //hash password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                //create user record
                const userRecord = yield config_1.DatabaseManager.getInstance().user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName,
                    },
                });
                //send otp to user via email
                //TODO enhance the email body using a template
                // const message = `Thanks for registering to the online-store,
                //  use the opt to verify your account otp is ${otp}`;
                //    new Email(
                //     userRecord.email,
                //     "Registering to the Online-store",
                //     message
                // )
                //     .send()
                //     .then()
                //     .catch((err) => {
                //         console.error(err);
                //         throw new AppError("error while sending the email", 500);
                //     });
                //create opt record
                const otpRecord = yield config_1.DatabaseManager.getInstance().otps.create({
                    data: {
                        otp: hashedOTP,
                        userId: userRecord.id,
                        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), //2 days
                    },
                });
                return otp;
            }
            catch (err) {
                //rollback the transaction
                yield config_1.DatabaseManager.getInstance().user.delete({
                    where: {
                        email,
                    },
                });
                throw err;
            }
        });
    }
    static verify(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate the otp
            const otpRecord = yield config_1.DatabaseManager.getInstance().otps.findFirst({
                where: {
                    otp: utils_1.OTPService.hash(String(otp)),
                },
            });
            if (!otpRecord)
                throw new utils_1.AppError("invalid otp", 400);
            if (otpRecord && otpRecord.validTill < new Date())
                throw new utils_1.AppError("otp expired, generate another one", 400);
            yield config_1.DatabaseManager.getInstance().$transaction([
                //verify the user account and create his cart
                config_1.DatabaseManager.getInstance().user.update({
                    where: {
                        id: otpRecord.userId,
                    },
                    data: {
                        isVerified: true,
                        Cart: {
                            create: {},
                        },
                    },
                }),
                //delete the otp record
                config_1.DatabaseManager.getInstance().otps.delete({
                    where: {
                        id: otpRecord.id,
                    },
                }),
            ]);
        });
    }
    static regenerateOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate that email is exist and not verified
            const user = yield config_1.DatabaseManager.getInstance().user.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                throw new utils_1.AppError("email not found", 400);
            if (user && user.isVerified)
                throw new utils_1.AppError("the email already verified", 400);
            //generate and hash otp
            const otp = utils_1.OTPService.generate(6);
            const hashedOTP = utils_1.OTPService.hash(String(otp));
            //send otp to user via email
            //TODO enhance the email body using a template
            // new Email(email, "Regenerating the OTP", `your new otp is ${otp}`)
            //     .send()
            //     .then()
            //     .catch((err) => {
            //         throw err;
            //     });
            //delete the old otp record and create a new one
            yield config_1.DatabaseManager.getInstance().$transaction([
                config_1.DatabaseManager.getInstance().otps.deleteMany({
                    where: {
                        userId: user.id,
                    },
                }),
                config_1.DatabaseManager.getInstance().otps.create({
                    data: {
                        otp: hashedOTP,
                        userId: user.id,
                        validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), //2 days
                    },
                }),
            ]);
            return otp;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate that the user exists
            const user = yield config_1.DatabaseManager.getInstance().user.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                throw new utils_1.AppError("There is no user attaches to this email ❌❗", 404);
            if (!user.isVerified)
                throw new utils_1.AppError("Please verify your email first to login", 400);
            //validate the password
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                throw new utils_1.AppError("Wrong password, try again 🔐❌", 400);
            //issue jwt
            return utils_1.JWTUtil.issueJWT(user.id);
        });
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map