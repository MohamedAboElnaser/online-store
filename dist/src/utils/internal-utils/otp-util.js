"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPService = void 0;
const crypto_1 = __importDefault(require("crypto"));
class OTPService {
    /**
     * Generate a random OTP of given length.
     */
    static generate(length = 6) {
        if (length <= 0) {
            return 0;
        }
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Hash the OTP using SHA256.
     */
    static hash(otp) {
        const hashedOTP = crypto_1.default
            .createHash("sha256")
            .update(String(otp))
            .digest("hex");
        return hashedOTP;
    }
    /**
     * Verify the OTP.
     */
    static verify(otp, hashedOTP) {
        const isVerified = hashedOTP === OTPService.hash(otp);
        return isVerified;
    }
}
exports.OTPService = OTPService;
exports.default = OTPService;
//# sourceMappingURL=otp-util.js.map