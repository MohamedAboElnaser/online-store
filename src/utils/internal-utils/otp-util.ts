import crypto from "crypto";

class OTPService {
    /**
     * Generate a random OTP of given length.
     */
    static generate(length: number = 6): number {
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
    static hash(otp: string): string {
        const hashedOTP = crypto
            .createHash("sha256")
            .update(String(otp))
            .digest("hex");

        return hashedOTP;
    }
    /**
     * Verify the OTP.
     */
    static verify(otp: string, hashedOTP: string): boolean {
        const isVerified = hashedOTP === OTPService.hash(otp);

        return isVerified;
    }
}

export default OTPService;
export { OTPService };
