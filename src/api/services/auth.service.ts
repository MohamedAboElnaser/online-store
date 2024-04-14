import bcrypt from "bcrypt";
import { DatabaseManager } from "../../../config";
import { OTPService, AppError, Email } from "../../util";

class AuthService {
    private constructor() {}
    public static async register(
        email: string,
        password: string,
        firstName: string,
        lastName?: string
    ): Promise<number> {
        try {
            //validate that user does not exist
            const user = await DatabaseManager.getInstance().user.findUnique({
                where: {
                    email,
                },
            });

            if (user) {
                if (!user.isVerified)
                    throw new AppError(
                        "the email already used,but not verified yet",
                        400
                    );
                else
                    throw new AppError(
                        "the email already used try another one",
                        400
                    );
            }

            //generate and hash otp
            const otp = OTPService.generate(6);
            const hashedOTP = OTPService.hash(String(otp));

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create user record
            const userRecord = await DatabaseManager.getInstance().user.create({
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
            const otpRecord = await DatabaseManager.getInstance().otps.create({
                data: {
                    otp: hashedOTP,
                    userId: userRecord.id,
                    validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), //2 days
                },
            });

            return otp;
        } catch (err) {
            //rollback the transaction
            await DatabaseManager.getInstance().user.delete({
                where: {
                    email,
                },
            });
            throw err;
        }
    }
}

export { AuthService };
export default AuthService;
